-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create todos table
CREATE TABLE IF NOT EXISTS public.todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE NOT NULL,
    priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium' NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create posts table
CREATE TABLE IF NOT EXISTS public.posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    published BOOLEAN DEFAULT FALSE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_profiles
CREATE POLICY "Users can view their own profile" ON public.user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for todos
CREATE POLICY "Users can view their own todos" ON public.todos
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own todos" ON public.todos
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own todos" ON public.todos
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own todos" ON public.todos
    FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for posts
CREATE POLICY "Users can view published posts" ON public.posts
    FOR SELECT USING (published = true OR auth.uid() = user_id);

CREATE POLICY "Users can insert their own posts" ON public.posts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts" ON public.posts
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts" ON public.posts
    FOR DELETE USING (auth.uid() = user_id);

-- Create function to handle updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER handle_updated_at_user_profiles
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_updated_at_todos
    BEFORE UPDATE ON public.todos
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_updated_at_posts
    BEFORE UPDATE ON public.posts
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_todos_user_id ON public.todos(user_id);
CREATE INDEX IF NOT EXISTS idx_todos_completed ON public.todos(completed);
CREATE INDEX IF NOT EXISTS idx_todos_priority ON public.todos(priority);
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON public.posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_published ON public.posts(published);