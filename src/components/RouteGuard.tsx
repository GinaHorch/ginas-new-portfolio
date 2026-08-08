"use client";

import { usePathname } from "next/navigation";
import { routes } from "@/app/resources";
import { Flex, Spinner } from "@/once-ui/components";

interface RouteGuardProps {
  children: React.ReactNode;
}

const dynamicRoutes = ["/work", "/skills"] as const;

function isRouteEnabled(pathname: string | null): boolean {
  if (!pathname) return false;

  if (pathname in routes) {
    return routes[pathname as keyof typeof routes];
  }

  return dynamicRoutes.some((route) => pathname.startsWith(route) && routes[route]);
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();

  // Resolved during render so enabled pages are present in the pre-rendered HTML
  // rather than appearing only after a client-side effect.
  if (!isRouteEnabled(pathname)) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <Spinner />
      </Flex>
    );
  }

  return <>{children}</>;
};

export { RouteGuard };
