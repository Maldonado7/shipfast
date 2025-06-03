import { pgTable, serial, text, timestamp, boolean, varchar, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// User profiles table to extend Supabase auth.users
export const userProfiles = pgTable('user_profiles', {
  id: uuid('id').primaryKey(), // References auth.users.id
  email: varchar('email', { length: 255 }).notNull(),
  fullName: text('full_name'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  completed: boolean('completed').default(false).notNull(),
  priority: text('priority', { enum: ['low', 'medium', 'high'] }).default('medium').notNull(),
  dueDate: timestamp('due_date'),
  userId: uuid('user_id').references(() => userProfiles.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content'),
  published: boolean('published').default(false),
  userId: uuid('user_id').references(() => userProfiles.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const userProfilesRelations = relations(userProfiles, ({ many }) => ({
  todos: many(todos),
  posts: many(posts),
}))

export const todosRelations = relations(todos, ({ one }) => ({
  user: one(userProfiles, {
    fields: [todos.userId],
    references: [userProfiles.id],
  }),
}))

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(userProfiles, {
    fields: [posts.userId],
    references: [userProfiles.id],
  }),
}))

// Export types for use in the application
export type UserProfile = typeof userProfiles.$inferSelect
export type NewUserProfile = typeof userProfiles.$inferInsert
export type Todo = typeof todos.$inferSelect
export type NewTodo = typeof todos.$inferInsert
export type Post = typeof posts.$inferSelect
export type NewPost = typeof posts.$inferInsert