/**
 * Gets a deep value from an object using a dot/bracket-notation path string.
 *
 * Supports:
 * - Dot notation: "a.b.c"
 * - Bracket notation: "a.0.b.c"
 *
 * @template T
 * @param {T} obj - The object to query.
 * @param {string} path - The path string to retrieve (e.g. "a.b.c" or "a[0].b").
 * @returns {*} The value at the given path, or `undefined` if not found.
 *
 * @example
 * const data = {
 *   user: {
 *     profile: { name: "Alice", skills: ["js", "ts"] }
 *   }
 * };
 *
 * getDeepValue(data, "user.profile.name");   // → "Alice"
 * getDeepValue(data, "user.profile.skills.1"); // → "ts"
 * getDeepValue(data, "user.profile.age");    // → undefined
 */
export function getDeepValue<T extends Record<string, any>, P extends string>(
  obj: T,
  path: P,
): any {
  if (!path) return obj;

  const keys = path.replace(/^\./, "").split(".");

  let result: any = obj;

  for (const key of keys) {
    if (result == null) return undefined;
    result = result[key];
  }

  return result;
}

/**
 * Sets a deep value inside an object using a dot/bracket-notation path string.
 *
 * Supports:
 * - Dot notation: "a.b.c"
 * - Bracket notation: "a.0.b.c"
 *
 * Automatically creates nested objects/arrays as needed.
 *
 * @param {T} obj - The target object to modify.
 * @param {string} path - Path string such as "a.b.c" or "a.0.b".
 * @param {*} value - The value to set at the specified path.
 *
 * @example
 * const config = {};
 * setDeepValue(config, "server.host", "localhost");
 * // config = { server: { host: "localhost" } }
 *
 */
export function setDeepValue<T extends Record<string, any>>(
  obj: T,
  path: string,
  value: string,
): T {
  const keys = path.replace(/^\./, "").split(".");

  let target = obj;

  keys.forEach((key, idx) => {
    const isLast = idx === keys.length - 1;

    if (isLast) {
      // @ts-ignore
      target[key] = value;
    } else {
      // If next key doesn't exist, create object/array based on pattern
      if (target[key] == null) {
        const nextKey = keys[idx + 1];
        // If next key is an integer, create an array, otherwise an object
        // @ts-ignore
        target[key] = /^\d+$/.test(nextKey) ? [] : {};
      }
      target = target[key];
    }
  });

  return obj;
}
