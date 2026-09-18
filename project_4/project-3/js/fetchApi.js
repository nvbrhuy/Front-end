export const fetchApi = async (apiUrl) => {
    try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Lỗi:", error);
    }
}