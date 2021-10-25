import axios from "axios";

export const fetchData = async (path) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${path}`, {
        headers: {
            token: token,
        }
    });
    return response?.data;
};