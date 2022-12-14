export function getRequiredServerEnvVar(key) {
  const value = process.env[key]
  if (!value) {
    throw new Error(`${key} env variable must be set`)
  }
  return value
}
