import { Home } from "../pages/Home/Home";
import { Order } from "../pages/Order/Order";
import { Products } from "../pages/Products/Products";
import { NotFound } from "../pages/NotFound";

export const routes = [
    {
        path: "/",
        page: Home,
        showHeader: true,
    },
    {
        path: "/order",
        page: Order,
        showHeader: true,
    },
    {
        path: "/products",
        page: Products,
        showHeader: true,
    },
    {
        path: "*",
        page: NotFound,
    },
];
