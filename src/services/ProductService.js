import axios from "axios";

export const getAllProduct = async () => {
    const res = await axios.get(
        `http://localhost:3001/product/get-all-product`
    );
    return res.data;
};
export const addProduct = async (data) => {
    const res = await axios.post(`http://localhost:3001/product/create`, data);
    return res.data;
};
