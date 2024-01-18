import axios from "axios";

export const signInUser = async (data) => {
    const res = await axios.post(`http://localhost:3001/user/log-in`, data);
    return res.data;
};

export const signUpUser = async (data) => {
    const res = await axios.post(`http://localhost:3001/user/log-up`, data);
    return res.data;
};
