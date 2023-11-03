import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import Button from 'react-bootstrap/Button';

const Login = () => {
    const { isAuthenticated, login, logout } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        login(username, password); // This will use the simulated login function from AuthContext.
    }

    if (isAuthenticated) {
        return (
            <div>
                <Button variant="danger" onClick={logout}>Logout</Button>
            </div>
        );
    } else {
        return (
            <div>
                <form onSubmit={handleLogin}>
                    <label>
                        Username:
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </label>
                    <br />
                    <Button variant="primary" type="submit">Login</Button>
                </form>
            </div>
        );
    }
};

export default Login;
