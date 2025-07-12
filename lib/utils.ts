import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function buildUrlWithParams(baseUrl: string, params: Record<string, any>): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            if (typeof value === 'object') {
                // Handle nested objects like location.latitude
                Object.entries(value).forEach(([nestedKey, nestedValue]) => {
                    searchParams.append(`${key}.${nestedKey}`, String(nestedValue));
                });
            } else {
                searchParams.append(key, String(value));
            }
        }
    });

    return `${baseUrl}?${searchParams.toString()}`;
}