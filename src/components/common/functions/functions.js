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