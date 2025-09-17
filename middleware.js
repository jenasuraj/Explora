// middleware.js
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/operation","/plans"], // 👈 protect this route
};
