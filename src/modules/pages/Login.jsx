
import { useNavigate } from "react-router-dom";
import { useMemo, useState} from "react";
import { useSecurity } from "../auth/UseSecurity";
import { useAuth } from "../auth/useAuth";
import { MaskedInput } from 'antd-mask-input';

const Login = () => {
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [step, setStep] = useState(0);
    const navigate = useNavigate();
  
    const { sendCode, verifyCode, isLoading } = useAuth({
      onAuthenticated(_, creds) {
        setCode('');
        if (!creds) {
          setStep(0);
        }
        navigate('/');
      },
      onSignIn: () => {
        setStep((step) => step + 1);
        setCode('');
      },
    });

    const usMask = '+0 (000) 000-0000';
    const brMask = '+00 (00) 0 0000-0000';
    const anyMask = '+000000000[0][0][0][0]';
  
    // always memoize dynamic masks
    const mask = useMemo(
      () => [
        {
          mask: usMask,
          lazy: false,
        },
        {
          mask: brMask,
          lazy: false,
        },
        {
          mask: anyMask,
          lazy: false,
        },
      ],
      [],
    );

    const handleChange = (event) => {
        setPhone(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendCode(`+${phone.replace(/\D/g, '')}`);
    }

    return(
        <div className="p-2">
            <h1>
                Login Screen Here
            </h1>
            <form className="input-group-prepend w-50 p-2" onSubmit={handleSubmit}>
                <MaskedInput
                    type="tel"
                    mask={mask}
                    className="form-control mb-2"
                    id="phoneInput"
                    placeholder="Phone Number:"
                    value={phone} 
                    onChange={handleChange} 
                />
                <button type="submit" className="btn btn-outline-primary">
                    Log In
                </button>
            </form>

            
        </div>
    );
};

export default Login;