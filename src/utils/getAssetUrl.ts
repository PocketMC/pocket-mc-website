export const getAssetUrl = (path: string) => {
  if (!path) return "";
  if (
    path.startsWith("http") ||
    path.startsWith("https") ||
    path.startsWith("data:")
  )
    return path;
  const baseUrl = import.meta.env.BASE_URL || "/";
  const separator = baseUrl.endsWith("/") ? "" : "/";
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${baseUrl}${separator}${cleanPath}`;
};
