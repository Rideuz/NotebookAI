import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Login Page</h2>
      <form>
        <input type="text" placeholder="Логин" /><br />
        <input type="tel" placeholder="Телефон" /><br />
        <input type="password" placeholder="Пароль" /><br />
        <button type="button" onClick={() => navigate('/main')}>Sign In</button>
        <button type="button" onClick={() => navigate('/register')}>Registration</button>
      </form>
    </div>
  );
}

export default LoginPage;