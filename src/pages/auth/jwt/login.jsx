import {Helmet} from "react-helmet-async";

import Login from "@sections/auth/jwt/login";

function LoginPage({ sx }) {

    return (
        <>
            <Helmet>
                <title> Jwt:   Login</title>
            </Helmet>

            <Login/>
        </>
    )
}

export default LoginPage;
