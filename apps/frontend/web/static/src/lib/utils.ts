import clsx from "clsx";

/**
 * Utility function to conditionally join class names.
 *
 * @param classes - A list of class names or conditional class objects.
 * @returns A single string of class names.
 */
export function cn(...classes: (string | undefined | null | false)[]) {
  return clsx(...classes);
}
