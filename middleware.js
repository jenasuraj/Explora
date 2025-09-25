import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    /*
      Protect everything except:
      - Next.js internals (_next)
      - static files
      - /operation route
    */
    '/((?!_next|operation|.*\\.(?:css|js|png|jpg|jpeg|webp|gif|svg|ico|json|txt|woff|woff2|eot|ttf|map|html)).*)',
  ],
};
