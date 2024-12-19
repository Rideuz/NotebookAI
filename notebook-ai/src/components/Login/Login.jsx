import './login.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useState} from "react";
import {supabase} from "../../lib/auth.js";
import {getUser, getUserNotes, getUserData} from "../../lib/userStorage.js";

function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const navigate = useNavigate();

    async function  handleLogin(){
        if(!email || !password){
            toast.error('Please fill in all fields');
            return null;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!emailRegex.test(email)){
            toast.error('Please enter a valid email address');
            return null;
        }

        try {
            let { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })

            console.log(error)

            if(error){
                if (error.message === "Email not confirmed"){
                    toast.error('Please confirmed email');
                }
                else{
                    toast.error('Wrong email or password');
                }
                return null;
            }

            console.log(data)
            await getUser(email);
            toast.success(`Welcome back in NotebookAI`);
            navigate('/main');

        } catch (err){
            toast.error(`${err}`);
        }

    }

    const handleRedirectToRegister = () => {
        navigate('/register');
    }

    return (
        <div className="login">
            <div className="login-form">
                <div className="title-web">NotebookAI</div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="login-form-inputs">
                        <input id="login-email" placeholder="Email" type="email" name="email" onChange={(e) => setEmail(e.target.value)}
                               required/>
                        <input id="login-password" placeholder="Password" type="password" name="password"
                               onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <div className="login-button">
                        <input type="submit" value="Sign In" className="sign-in-button"
                               onClick={handleLogin}/>
                    </div>
                </form>
                <div className="registr-button">
                    <a className="sign-up-button" onClick={handleRedirectToRegister}>Sign up with email</a>
                </div>
            </div>
        </div>
    );
}

export default Login;