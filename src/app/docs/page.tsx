export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">API Documentation</h1>
      <p className="text-gray-600 mb-8">
        Welcome to the ShipFast API documentation. Below you'll find information about available endpoints.
      </p>
      
      <div className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Authentication Endpoints</h2>
          <div className="space-y-3">
            <div>
              <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">POST /api/auth/login</code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Authenticate user with email and password</p>
            </div>
            <div>
              <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">POST /api/auth/register</code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Create a new user account</p>
            </div>
            <div>
              <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">POST /api/auth/logout</code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Sign out the current user</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Todo Endpoints</h2>
          <div className="space-y-3">
            <div>
              <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">GET /api/todos</code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Get all todos for the authenticated user</p>
            </div>
            <div>
              <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">POST /api/todos</code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Create a new todo</p>
            </div>
            <div>
              <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">PUT /api/todos/:id</code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Update an existing todo</p>
            </div>
            <div>
              <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">DELETE /api/todos/:id</code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Delete a todo</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">System Endpoints</h2>
          <div className="space-y-3">
            <div>
              <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">GET /api/health</code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Health check endpoint</p>
            </div>
            <div>
              <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">GET /api/structure</code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Get project structure information</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mt-8">
          <h3 className="text-lg font-semibold mb-2">Adding Swagger Documentation</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            To add interactive Swagger documentation to your project:
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded text-sm overflow-x-auto">
{`npm install swagger-ui-react swagger-jsdoc @types/swagger-ui-react

# Then replace this page with the Swagger UI component`}
          </pre>
        </div>
      </div>
    </div>
  )
}