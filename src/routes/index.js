import { Home } from "../pages/Home/Home";
import { Order } from "../pages/Order/Order";
import { Products } from "../pages/Products/Products";
import { NotFound } from "../pages/NotFound";
import { ProductTypePage } from "../pages/Products/ProductTypePage";
import { SignIn } from "../pages/User/SignIn";
import { ProductDetail } from "../pages/Products/ProductDetail";

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
        path: "/product-type",
        page: ProductTypePage,
        showHeader: true,
    },
    {
        path: "/sign-in",
        page: SignIn,
        showHeader: false,
    },
    {
        path: "/product-detail",
        page: ProductDetail,
        showHeader: true,
    },
    {
        path: "*",
        page: NotFound,
    },
];
