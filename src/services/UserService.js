import axios from "axios";
export const axiosJwt = axios.create()

export const signInUser = async (data) => {
    const res = await axios.post(`http://localhost:3000/user/log-in`, data);
    return res.data;
};

export const signUpUser = async (data) => {
    const res = await axios.post(`http://localhost:3000/user/log-up`, data);
    return res.data;
};
export const getUserDetails = async (id, access_token) => {
    const res = await axiosJwt.get(
        `http://localhost:3000/user/get-user-details/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};
export const refreshToken = async () => {
    const res = await axios.post(`http://localhost:3000/user/refresh-token`, {
        withCredentials: true,
    });
    return res.data;
};

export const logOutUser = async () => {
    const res = await axios.post(`http://localhost:3000/user/logout`);
    return res.data;
};

export const updateUser = async (id, data) => {
    const res = await axios.put(`http://localhost:3000/user/update-user/${id}`);
    return res.data;
};