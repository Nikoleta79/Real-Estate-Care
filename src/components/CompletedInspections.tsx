import React, { useState } from 'react';
import axios from 'axios';
import { IonContent, IonIcon, IonHeader, IonFooter, IonToast } from '@ionic/react';
import {home, searchOutline, alertCircleOutline, settingsOutline, build} from 'ionicons/icons';
import logo from '../assets/logo.svg';

interface LoginFormProps {
    onLoginSuccess: () => void;  
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showErrorToast, setShowErrorToast] = useState<boolean>(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Make API request
            const response = await axios.post('http://localhost:5000/users', { email, password });

            // Assume the token is returned in response.data.token
            const token = response.data.token;

            // Store token in localStorage
            localStorage.setItem('authToken', token);

            // Notify the parent component that login is successful
            onLoginSuccess();

        } catch (error) {
            console.error("Login failed:", error);
            setShowErrorToast(true);
        }
    };

    return (
        <div className="d-flex flex-column" style={{ height: '100vh' }}>
            {/* Knowledgebase */}
            <IonHeader className="ion-no-border">
                <div className="d-flex justify-content-between align-items-center p-3" style={{ backgroundColor: '#343a40' }}>
                    <img src={logo} alt="Real Estate Care Logo" className="logo-style" />
                    <div className="d-flex align-items-center">
                        {/* Empty container for spacing */}
                    </div>
                </div>
            </IonHeader>

            {/* Login Form */}
            <IonContent className="ion-no-padding flex-grow-1" scrollY={false}>
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
                    <form onSubmit={handleLogin} style={{ width: '300px' }}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#00AAA2', border: 'none' }}>Login</button>
                    </form>
                </div>

                {/* Error Toast */}
                <IonToast
                    isOpen={showErrorToast}
                    onDidDismiss={() => setShowErrorToast(false)}
                    message="Login failed. Please check your credentials and try again."
                    duration={3000}
                    color="danger"
                />
            </IonContent>

            {/* KnowledgeBase */}
            <footer className="container-fluid text-white fixed-bottom" style={{backgroundColor: '#00AAA2'}}
                    role="navigation" aria-label="footer navigation">
                <div className="row p-2">
                    <div className="col d-flex flex-column justify-content-center text-center">
                        <div className="row p-2">
                            <div className="col d-flex flex-column justify-content-center text-center">

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row p-2">
                    <div className="col d-flex flex-column justify-content-center text-center">

                    </div>
                </div>
                <div className="row p-2">
                    <div className="col d-flex flex-column justify-content-center text-center">

                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LoginForm;
