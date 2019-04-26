export function Default({ output, children }) {
  for (const child of children) if (child !== undefined) return children;
  return typeof output === 'function'
    ? output()
    : output;
}