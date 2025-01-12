export const today = new Date().toLocaleDateString('en-US',
    {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });