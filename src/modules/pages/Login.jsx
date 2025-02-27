import { useSecurity } from "../auth/UseSecurity";
import { useAuth } from "../auth/useAuth";

const Login = () => {
    const security = useSecurity();

    function printUser() {
        let user = security.user;
        console.log(user);
    }

    return(
        <div>
            <h1>
                Login Screen Here
            </h1>
            <button onClick={printUser}>
                useSecurity
            </button>
        </div>
    );
};

export default Login;