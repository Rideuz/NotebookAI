import "./registration.css"
import { useNavigate } from 'react-router-dom';
import {useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {supabase} from "../../lib/auth.js";

function Registration() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [username, setUsername] = useState('');

    const navigate = useNavigate();

    async function handleRedirectToMain(){

        if(!username || !email || !password || !repeatPassword){
            toast.error('Please fill in all fields');
            return null;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!emailRegex.test(email)){
            toast.error('Please enter a valid email address');
            return null;
        }

        if(password.length < 6){
            toast.error('Too short password must be at least 6 characters long');
            return null;
        }

        if(password !== repeatPassword){
            toast.error('Passwords will differ');
            return null;
        }

        try {
            let { data: user, error: errConnect } = await supabase.auth.signUp({
                username: username,
                email: email,
                password: password
            })

            if(errConnect){
                toast.error(`${errConnect}`);
                console.log(errConnect);
                return null;
            }

            const { data: _user, error } = await supabase
                .from('users')
                .insert({username: username, email: email, password: password})

            if(error){
                toast.error(`${error}`);
                console.log(user);
                return null;
            }

            toast.success(`Successfully registered user ${_user}`);

            navigate('/');
        }
        catch (err){
            console.log(err)
        }
    }

    const handleRedirectToLogin = () => {
        navigate('/');
    }

    return (
        <div className="registration">
            <div className="registration-form">
                <div className="title-web">NotebookAI</div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="registration-form-inputs">
                        <input type="text" id="login-username" name="username" placeholder="Username"
                               onChange={(e) => setUsername(e.target.value)} required/>
                        <input type="email" id="login-email" name="email" placeholder="Email"
                               onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" id="login-password" name="password" placeholder="Password"
                               onChange={(e) => setPassword(e.target.value)}/>
                        <input type="password" id="login-password" name="password" placeholder="Repeat Pasword"
                               onChange={(e) => setRepeatPassword(e.target.value)}/>
                    </div>
                    <div className="login-button">
                        <input className="sign-in-button" type="submit" value="Create account" onClick={handleRedirectToMain}/>
                    </div>
                </form>
                <div className="registr-button">
                    <a className="sign-up-button" onClick={handleRedirectToLogin}>Already have an account?</a>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default Registration;