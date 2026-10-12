export { cn } from "cn"

export function safeDestination(value: string | undefined | null) {
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\")
  ) {
    return "/dashboard";
  }

  try {
    const url = new URL(value, "https://local.invalid");

    if (
      url.origin !== "https://local.invalid" ||
      value.includes("\r") ||
      value.includes("\n")
    ) {
      return "/dashboard";
    }

    return value;
  } catch {
    return "/dashboard";
  }
}
