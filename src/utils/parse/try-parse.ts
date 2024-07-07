export function tryParse(value: string) {
  try {
    const result = JSON.parse(value)

    if (Array.isArray(result)) {
      return result.map((t) => tryParse(t))
    }

    return result
  } catch {
    return value
  }
}
