export function getToken() {
    return localStorage.getItem('token');
}

export function setToken(token) {
    localStorage.setItem('token', token);
}

export function removeToken() {
    localStorage.removeItem('token');
};

export function checkLoginStatus() {
    const token = getToken();
    return !!token;
}

export function setUsername(username) {
    localStorage.setItem('username', username);
};

export function getUsername() {
    return localStorage.getItem('username');
}

export function clearAll() {
    removeToken();
    localStorage.removeItem('username');
};

