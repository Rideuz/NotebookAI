import "./registration.css"
import { useNavigate } from 'react-router-dom';

function Registration() {

    const navigate = useNavigate();

    const handleRedirectToMain = () => {
        navigate('/main');
    }

    return (
        <div className="registration">
            <div className="registration-form">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="registration-form-inputs">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username"/>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email"/>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password"/>
                        <label htmlFor="password">Repeat Password</label>
                        <input type="password" name="password"/>
                    </div>
                    <div className="registr-buttons">
                        <input type="submit" value="Create account" onClick={handleRedirectToMain} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Registration;