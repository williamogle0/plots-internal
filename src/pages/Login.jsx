import { useSecurity } from "../modules/auth/UseSecurity";

const Login = () => {
    return(
        <div>
            <h1>
                Login Screen Here
            </h1>
            <button onClick={useSecurity}>
                useSecurity
            </button>
        </div>
    );
};

export default Login;