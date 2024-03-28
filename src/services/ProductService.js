import axios from "axios";
export const axiosJwt = axios.create();

export const getAllProduct = async (search, page, limit) => {
    let res = {};
    if (search.length > 0) {
        res = await axios.get(
            `http://localhost:3000/product/get-all-product?filter=name&filter=${search}`,
            page,
            limit
        );
    } else {
        res = await axios.get(
            `http://localhost:3000/product/get-all-product`,
            page,
            limit
        );
    }
    return res.data;
};
export const addProduct = async (data) => {
    const res = await axios.post(`http://localhost:3000/product/create`, data);
    return res.data;
};

export const getProductDetails = async (id) => {
    const res = await axios.get(
        `http://localhost:3000/product/get-product-details/${id}`
    );
    return res.data;
};

export const updateProduct = async (id, access_token, data) => {
    const res = await axiosJwt.put(
        `http://localhost:3000/product/update-product/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const deleteProduct = async (id, access_token) => {
    const res = await axiosJwt.delete(
        `http://localhost:3000/product/delete-product/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const deleteManyProducts = async (data, access_token) => {
    const res = await axiosJwt.post(
        `http://localhost:3000/product/delete-many-product`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};
