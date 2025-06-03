import { NextRequest, NextResponse } from 'next/server';

type RouteHandler = (
  request: NextRequest,
  context?: any
) => Promise<NextResponse> | NextResponse;

export function withDevTools(handler: RouteHandler): RouteHandler {
  return async (request: NextRequest, context?: any) => {
    const start = Date.now();
    const { method, url } = request;

    try {
      const response = await handler(request, context);
      const duration = Date.now() - start;

      // Add performance header
      const headers = new Headers(response.headers);
      headers.set('X-Response-Time', `${duration}ms`);

      // Log in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[API] ${method} ${url} - ${response.status} (${duration}ms)`);
      }

      return new NextResponse(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    } catch (error) {
      const duration = Date.now() - start;
      
      console.error(`[API] ${method} ${url} - Error (${duration}ms):`, error);
      
      return NextResponse.json(
        { 
          error: 'Internal Server Error',
          message: error instanceof Error ? error.message : 'Unknown error',
        },
        { 
          status: 500,
          headers: {
            'X-Response-Time': `${duration}ms`,
          },
        }
      );
    }
  };
}