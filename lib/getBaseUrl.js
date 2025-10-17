export function getBaseUrl() {
    if (process.env.VERCEL_URL) {
        // Running on Vercel
        return `https://${process.env.VERCEL_URL}`;
    }
    // Localhost fallback
    return 'http://localhost:3000';
}
