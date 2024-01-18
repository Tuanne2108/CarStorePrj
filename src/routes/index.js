import { Home } from "../pages/Home/Home";
import { Order } from "../pages/Order/Order";
import { Products } from "../pages/Products/Products";
import { NotFound } from "../pages/NotFound";
import { ProductTypePage } from "../pages/Products/ProductTypePage";
import { ProductDetail } from "../pages/Products/ProductDetail";
import SignInForm from "../pages/User/SignIn";
import SignUpForm from "../pages/User/SignUp";

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
        page: SignInForm,
        showHeader: false,
    },
    {
        path: "/sign-up",
        page: SignUpForm,
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
