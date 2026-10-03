export const MAX_ZIP_BYTES = 50 * 1024 * 1024;

// This is UX validation only. Real uploads require server-side archive validation.
export function validateSubmission(
  file: Pick<File, "name" | "size"> | null,
): string | null {
  if (!file) return "Choose a ZIP file to continue.";
  if (!file.name.toLowerCase().endsWith(".zip"))
    return "Choose a file with a .zip extension.";
  if (file.size === 0)
    return "The ZIP file is empty. Choose a nonempty project archive.";
  if (file.size > MAX_ZIP_BYTES)
    return "The ZIP file must be no larger than 50 MB.";
  return null;
}
