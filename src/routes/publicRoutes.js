// import { lazy } from "react";

import SignIn from "../pages/auth/SignIn";

const publicRoutes = [
    {
        path: "/portal/sign-in",
        component: SignIn,
        exact: true,
    },
];
export default publicRoutes;