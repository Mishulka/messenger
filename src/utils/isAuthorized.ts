export default function isAuthorized(): boolean {
    return document.cookie.includes('authCookie');
}