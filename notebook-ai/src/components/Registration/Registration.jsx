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

    return (
        <div className="registration">
            <div className="registration-form">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="registration-form-inputs">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} required />
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="password">Repeat Password</label>
                        <input type="password" name="password" onChange={(e) => setRepeatPassword(e.target.value)}/>
                    </div>
                    <div className="registr-buttons">
                        <input type="submit" value="Create account" onClick={handleRedirectToMain} />
                    </div>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default Registration;