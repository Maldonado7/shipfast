import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    name: 'ShipFast API',
    version: '1.0.0',
    description: 'API documentation for ShipFast template',
    endpoints: {
      auth: {
        login: 'POST /api/auth/login',
        register: 'POST /api/auth/register',
        logout: 'POST /api/auth/logout'
      },
      todos: {
        list: 'GET /api/todos',
        create: 'POST /api/todos',
        update: 'PUT /api/todos/:id',
        delete: 'DELETE /api/todos/:id'
      },
      system: {
        health: 'GET /api/health',
        structure: 'GET /api/structure'
      }
    }
  })
}