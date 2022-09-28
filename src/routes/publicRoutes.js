// import { lazy } from "react";

import SignIn from "../pages/auth/SignIn";

const publicRoutes = [
    {
        path: "/portal/sign-in",
        component: <SignIn/>,
        exact: true,
    },
    {
        path: "/mfa-setup",
        component: ,
        exact: true,
    },
];
export default publicRoutes;