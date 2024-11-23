import React, { useState } from 'react';
import axios from 'axios';
import { IonContent, IonHeader, IonFooter, IonToast } from '@ionic/react';
import logo from '../assets/logo.svg';

interface LoginFormProps {
    onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showErrorToast, setShowErrorToast] = useState<boolean>(false);
    const [is2FAEnabled, setIs2FAEnabled] = useState<boolean>(false);
    const [entered2FACode, setEntered2FACode] = useState<string>('');
    const [show2FAErrorToast, setShow2FAErrorToast] = useState<boolean>(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Make API request to JSON server with email and password as query parameters
            const response = await axios.get(`http://localhost:5000/users?email=${email}&password=${password}`);

            // Check if user exists in the response data
            if (response.data.length > 0) {
                // Display the 2FA step to the user
                setIs2FAEnabled(true);
            } else {
                // Show error if credentials do not match
                setShowErrorToast(true);
            }
        } catch (error) {
            console.error("Login failed:", error);
            setShowErrorToast(true);
        }
    };

    const handle2FAValidation = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Simulate successful 2FA validation
        // Generate a simple token for demonstration
        const token = Math.random().toString(36).substring(2);

        // Store token in localStorage
        localStorage.setItem('authToken', token);

        // Notify the parent component that login is successful
        onLoginSuccess();
    };

    return (
        <div className="d-flex flex-column" style={{ height: '100vh' }}>
            {/* Header */}
            <IonHeader className="ion-no-border">
                <div className="d-flex justify-content-between align-items-center p-3" style={{ backgroundColor: '#343a40' }}>
                    <img src={logo} alt="Real Estate Care Logo" className="logo-style" />
                </div>
            </IonHeader>

            {/* Login Form */}
            <IonContent className="ion-no-padding flex-grow-1" scrollY={false}>
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
                    {!is2FAEnabled ? (
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
                    ) : (
                        <form onSubmit={handle2FAValidation} style={{ width: '300px' }}>
                            <div className="mb-3">
                                <label htmlFor="2fa-code" className="form-label">Enter 2FA Code</label>
                                <input
                                    type="text"
                                    id="2fa-code"
                                    className="form-control"
                                    value={entered2FACode}
                                    onChange={(e) => setEntered2FACode(e.target.value)}
                                    placeholder="Enter any 6-digit code"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#00AAA2', border: 'none' }}>Verify Code</button>
                        </form>
                    )}
                </div>

                {/* Error Toasts */}
                <IonToast
                    isOpen={showErrorToast}
                    onDidDismiss={() => setShowErrorToast(false)}
                    message="Login failed. Please check your credentials and try again."
                    duration={3000}
                    color="danger"
                />
                <IonToast
                    isOpen={show2FAErrorToast}
                    onDidDismiss={() => setShow2FAErrorToast(false)}
                    message="Invalid 2FA code. Please try again."
                    duration={3000}
                    color="danger"
                />
            </IonContent>

            {/* Footer */}
            <IonFooter className="container-fluid text-white fixed-bottom" style={{ backgroundColor: '#00AAA2' }} role="navigation" aria-label="footer navigation">
                <div className="row p-2">
                    <div className="col d-flex flex-column justify-content-center text-center">
                        <div className="row p-2">
                            <div className="col d-flex flex-column justify-content-center text-center">
                                {/* Footer content */}
                            </div>
                        </div>
                    </div>
                </div>
            </IonFooter>
        </div>
    );
};

export default LoginForm;