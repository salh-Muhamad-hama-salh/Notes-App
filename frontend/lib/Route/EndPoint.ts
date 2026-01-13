export const API_ENDPOINT = process.env.API_URL || "http://localhost:5000/api/notes/";


export const EndpointApi = {
    GETALLNOTES: `${API_ENDPOINT}/`,
    CREATE_NOTES: `${API_ENDPOINT}/`,
    UPDATE_NOTES: (id: string) => `${API_ENDPOINT}/${id}`,
    DELETE_NOTES: (id: string) => `${API_ENDPOINT}/${id}`,
}