import { jwtDecode } from 'jwt-decode';

// export const decodeJWT = (token) => {
//     try {
//         const base64Url = token.split('.')[1];
//         const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//         const jsonPayload = decodeURIComponent(
//             atob(base64)
//                 .split('')
//                 .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//                 .join('')
//         );
//         return JSON.parse(jsonPayload);
//     } catch (e) {
//         return null;
//     }
// };

export const getToken = () => {
    return localStorage.getItem('token');
};

export const getUserIdFromToken = () => {
    const token = getToken();
    if (!token) return null;

    const decoded = jwtDecode(token);
    // const decoded = decodeJWT(token);
    return decoded?.userId;
};

export const getUserRoleFromToken = () => {
    const token = getToken();
    if (!token) return null;

    const decoded = jwtDecode(token);
    // const decoded = decodeJWT(token);
    return decoded?.role;
};