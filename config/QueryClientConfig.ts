import {QueryClient} from '@tanstack/react-query'

export const config = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3, // Number of retry attempts for failed queries
            retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
            staleTime: 5 * 60 * 1000, // 5 minutes
        }
    }
});
