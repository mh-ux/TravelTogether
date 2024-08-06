export const decodeToken = (token) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload;
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};

export const isTokenExpired = (token) => {
    const payload = decodeToken(token);
    if (!payload) return true;

    // Check if token is expired
    return payload.exp * 1000 < Date.now();
};
