import './login.css'
import { useNavigate } from 'react-router-dom';

function Login(){

    const navigate = useNavigate();

    const handleRedirectToMain = () => {
        navigate('/main');
    }

    const handleRedirectToRegister = () => {
        navigate('/register');
    }

    return (
        <div className="login">
            <div className="login-form">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="login-form-inputs">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username"/>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email"/>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password"/>
                    </div>
                    <div className="login-buttons">
                        <input type="submit" value="Sign In" onClick={handleRedirectToMain}/>
                        <input type="submit" value="Sign Up" onClick={handleRedirectToRegister}/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;