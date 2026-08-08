import { getPosts } from "@/app/utils/utils";
import { baseURL, routes as routesConfig } from "@/app/resources";

export default async function sitemap() {
  const works = getPosts(["src", "app", "work", "projects"]).map((project) => ({
    url: `https://${baseURL}/work/${project.slug}`,
    lastModified: project.metadata.publishedAt,
  }));

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],);

  const routes = activeRoutes.map((route) => ({
    url: `https://${baseURL}${route !== "/" ? route : ""}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...works];
}
