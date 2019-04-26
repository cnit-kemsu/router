export function TryRoutes({ defaultOutput, children }) {
  if (children !== undefined) {
    if (!Array.isArray(children)) return children;
    for (const child of children) if (child !== undefined) return children;
  }
  return typeof defaultOutput === 'function'
    ? defaultOutput()
    : defaultOutput;
}