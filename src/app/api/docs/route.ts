import { NextResponse } from 'next/server'
import { swaggerSpec } from '@/lib/swagger'

/**
 * @swagger
 * /api/docs:
 *   get:
 *     summary: Get API documentation
 *     description: Returns the OpenAPI specification for this API
 *     tags:
 *       - Documentation
 *     responses:
 *       200:
 *         description: OpenAPI specification
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
export async function GET() {
  return NextResponse.json(swaggerSpec)
}