import React from 'react';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Registration Page</h2>
      <form>
        <input type="text" placeholder="Логин" /><br />
        <input type="tel" placeholder="Телефон" /><br />
        <input type="password" placeholder="Пароль" /><br />
        <input type="password" placeholder="Повторите пароль" /><br />
        <button type="button" onClick={() => navigate('/')}>Register</button>
      </form>
    </div>
  );
}

export default RegistrationPage;