import SignIn from "../pages/auth/SignIn";
import MultiFactorAuthentication from "../pages/auth/MultiFactorAuthentication"

const publicRoutes = [
    {
        path: "/portal/sign-in",
        component: <SignIn/>,
        exact: true,
    },
    {
        path: "/mfa-setup",
        // component:  ,
        exact: true,
    },
    {
        path: "/mfa",
        component: <MultiFactorAuthentication/>,
        exact: true,
      },
];
export default publicRoutes;