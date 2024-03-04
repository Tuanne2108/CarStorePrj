import axios from "axios";
export const axiosJwt = axios.create()

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

export const getProductDetails = async (id) => {
    const res = await axios.get(`http://localhost:3001/product/get-product-details/${id}`);
    return res.data;
};

export const updateProduct = async (id, access_token, data) => {
    const res = await axiosJwt.put(`http://localhost:3001/product/update-product/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};