/**
 * Tiny classnames helper — joins truthy class values with a space.
 * Avoids pulling in a dependency for something this small.
 */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}
