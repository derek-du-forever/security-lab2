import React, { useState } from 'react';
import LoginForm from './LoginForm';
import ChuckNorris from './ChuckNorris';
import './App.css';

function App() {
  const [token, setToken] = useState(sessionStorage.getItem('token'));

  React.useEffect(() => {
    if (token) {
      sessionStorage.setItem('token', token);
    } else {
      sessionStorage.removeItem('token');
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    sessionStorage.removeItem('token');
  };

  return (
    <div className="App">
      <h1>Secure Fact Portal</h1>
      {!token ? (
        <LoginForm setToken={setToken} />
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <ChuckNorris token={token} />
        </>
      )}
    </div>
  );
}

export default App;