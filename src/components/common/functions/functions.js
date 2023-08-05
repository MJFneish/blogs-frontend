import { useEffect, useState } from "react";

export const getDate = (date) => {
    const dateTime = new Date(date);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month (0-11)
    const day = String(dateTime.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function generateSlug(text) {
    // Replace spaces with dashes and convert to lowercase
    return text.trim().toLowerCase().replace(/\s+/g, '-');
}

export function useLocalStorageUser() {
    const [user, setUser] = useState(() => {
        const userData = localStorage.getItem('blog-user');
        return userData ? JSON.parse(userData) : null;
    });

    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'blog-user') {
                setUser(e.newValue ? JSON.parse(e.newValue) : null);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return user;

    return user;
}