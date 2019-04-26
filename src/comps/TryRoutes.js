export function TryRoutes({ defaultOutput, children }) {
  for (const child of children) if (child !== undefined) return children;
  return typeof defaultOutput === 'function'
    ? defaultOutput()
    : defaultOutput;
}