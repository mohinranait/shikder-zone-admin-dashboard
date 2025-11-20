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
