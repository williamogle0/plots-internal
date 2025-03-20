
import { useNavigate } from "react-router-dom";
import { useMemo, useState} from "react";
import { useSecurity } from "../auth/UseSecurity";
import { useAuth } from "../auth/useAuth";
import { MaskedInput } from 'antd-mask-input';
import { message } from "antd";

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

    const handlePhoneSubmit = (event) => {
      event.preventDefault();
      if (phone != ""){
        sendCode(`+${phone.replace(/\D/g, '')}`);
      } else{
        message.error("You must enter a phone number.");
      }
    };

    const handleCodeSubmit = (event) => {
      event.preventDefault();
      if (code != ""){
        console.log(code);
        verifyCode(code.replace(/\D/g, ''));
      } else{
        message.error("You must enter a code.");
      }
    }

    return(
        <div className="p-2">
            <h1>
                Login:
            </h1>
            { step === 0 && (
            <form className="input-group-prepend w-50 p-2" onSubmit={handlePhoneSubmit}>
                <h5>Enter Phone Number:</h5>
                <MaskedInput
                    type="tel"
                    mask={mask}
                    className="form-control mb-2"
                    id="phoneInput"
                    placeholder="Phone Number:"
                    value={phone} 
                    onChange={(v) => setPhone(v.target.value)} 
                />
                <button type="submit" className="btn btn-outline-primary">
                    Log In
                </button>
            </form>
            )}
            { step === 1 && (
            <form className="input-group-prepend w-50 p-2" onSubmit={handleCodeSubmit}>
                <h5>Enter OTP:</h5>
                <MaskedInput
                    type="phone"
                    mask={'0 0 0 0 0 0'}
                    className="form-control mb-2"
                    id="otpInput"
                    placeholder="Enter OTP Code:"
                    value={code} 
                    onChange={(v) => setCode(v.target.value)} 
                />
                <button type="submit" className="btn btn-outline-primary">
                    Submit Code
                </button>
            </form>
            )}

            
        </div>
    );
};

export default Login;