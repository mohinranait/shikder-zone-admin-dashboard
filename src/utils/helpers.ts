'use client';
/**
 * Generates a slug from a given string.
 * @param text - The input string to generate a slug from.
 * @returns A URL-friendly slug string.
 */
export const generateSlug = (text: string) => {
  return text && text?.split(" ").join("-").toLowerCase();
};


// Define currency
export const currency:string = '৳'


// File size format helper ( B, KB, MB, GB )
export const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  else if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  else if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  else return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};
