import axios from "axios";
export const axiosJwt = axios.create();

export const signInUser = async (data) => {
    const res = await axios.post(`http://localhost:3000/user/log-in`, data);
    return res.data;
};

export const signUpUser = async (data) => {
    const res = await axios.post(`http://localhost:3000/user/log-up`, data);
    return res.data;
};
export const getAllUser = async (access_token) => {
    const res = await axiosJwt.get(`http://localhost:3000/user/get-all-user`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
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

export const updateUser = async (id, data, access_token) => {
    const res = await axiosJwt.put(
        `http://localhost:3000/user/update-user/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const deleteUser = async (id, access_token) => {
    const res = await axiosJwt.delete(
        `http://localhost:3000/user/delete-user/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const deleteManyUser = async (data, access_token) => {
    const res = await axiosJwt.post(
        `http://localhost:3000/user/delete-many-user`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};
