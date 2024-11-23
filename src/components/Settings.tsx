import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonIcon, IonToast } from '@ionic/react';
import { cogSharp, notificationsOffOutline, build, searchOutline, alertCircleOutline, squareOutline, ellipseOutline, chevronDownOutline } from 'ionicons/icons';
import logo from '../assets/logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/Home.css';

interface SettingsProps {
    onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onLogout }) => {
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 576);
    const [currentPage, setCurrentPage] = useState('settings');
    const [showToast, setShowToast] = useState(false);
    const history = useHistory();

    const handlePageChange = (page: string) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 576);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSaveChanges = (e: React.FormEvent) => {
        e.preventDefault();
        setShowToast(true);
    };

    return (
        <IonPage>
            {/* Fixed Header */}
            <IonHeader className="custom-toolbar">
                <IonToolbar className="bg-dark d-flex custom-toolbar justify-content-between align-items-center" color='bg-dark'>
                    {/* Right Icons */}
                    <IonButtons slot="end">
                        <IonIcon icon={squareOutline} size="small" className="text-white me-3 custom-icon custom-toolbar" />
                        <IonIcon icon={ellipseOutline} size="small" className="text-white me-3 custom-icon custom-toolbar" />
                        <IonIcon icon={chevronDownOutline} size="small" className="text-white custom-icon custom-toolbar" />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>


            {/* Logo and Notification Icons */}
            <header >
                <div className="d-flex justify-content-between align-items-center dashboard-toolbar px-3">
                    <div className="d-flex align-items-center">
                        <img src={logo} alt="Real Estate Care Logo" className="logo-style" />
                    </div>
                    <IonButtons slot="end">
                        <IonIcon icon={notificationsOffOutline} size="large" style={{ marginRight: '5px' }} className="icon-style text-white" />
                        <IonIcon icon={cogSharp} size="large" className="icon-style text-white" />
                    </IonButtons>
                </div>
            </header>

            {/* Main Content */}
            <IonContent className="ion-no-padding" scrollY={true} style={{ marginTop: '112px', paddingBottom: '56px' }}>
                <main className="container-fluid text-dark d-flex flex-column align-items-center" style={{ width: isMobileView ? '90%' : '96%', maxWidth: '800px', marginTop: '20px' }}>
                    <form onSubmit={handleSaveChanges} style={{ width: '100%' }}>
                        <h2>Profile Settings</h2>
                        <div className="mb-3">
                            <label htmlFor="firstname" className="form-label">Firstname</label>
                            <input type="text" id="firstname" className="form-control" placeholder="Enter your first name" defaultValue="John" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastname" className="form-label">Lastname</label>
                            <input type="text" id="lastname" className="form-control" placeholder="Enter your last name" defaultValue="Doe" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">New Password</label>
                            <input type="password" id="newPassword" className="form-control" placeholder="Enter your new password" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                            <input type="password" id="confirmPassword" className="form-control" placeholder="Confirm your new password" />
                        </div>
                        <button type="submit" className="btn btn-primary w-30 mb-4" style={{ backgroundColor: '#00AAA2', border: 'none' }}>Change Account</button>
                    </form>

                    {/* Application Settings */}
                    <div style={{width: '100%'}}>
                        <h3>Application Settings</h3>
                        <div className="form-check form-switch mb-3">
                            <input className="form-check-input" type="checkbox" role="switch" id="darkModeSwitch" aria-label="Dark mode switch" />
                            <label className="form-check-label" htmlFor="darkModeSwitch">Dark modus</label>
                        </div>
                        <div className="form-check form-switch mb-3">
                            <input className="form-check-input" type="checkbox" role="switch" id="notificationsSwitch" aria-label="Notifications switch" />
                            <label className="form-check-label" htmlFor="notificationsSwitch">Notifications</label>
                        </div>
                        <div className="form-check form-switch mb-3">
                            <input className="form-check-input" type="checkbox" role="switch" id="soundSwitch" aria-label="Sound switch" defaultChecked />
                            <label className="form-check-label" htmlFor="soundSwitch">Sounds</label>
                        </div>
                        <div>
                            <button type="button" onClick={handleSaveChanges} className="btn btn-primary w-30 mt-3" style={{backgroundColor: '#00AAA2', border: 'none'}} aria-label="Save changes">Save Changes</button>
                        </div>
                        <button type="button" onClick={onLogout} className="btn w-30 btn-danger mt-2" aria-label="Logout">Logout</button>
                    </div>
                </main>

                {/* Spacer to push content up */}
                <div style={{ height: '200px' }}></div>

                {/* Success Toast Notification at the Top */}
                <IonToast isOpen={showToast} onDidDismiss={() => setShowToast(false)} message="Changes saved successfully!" duration={3000} color="success" position="top" />
            </IonContent>

            {/* Fixed Footer */}
            <footer className="container-fluid text-white fixed-bottom" style={{backgroundColor: '#00AAA2', zIndex: 1000}} role="navigation" aria-label="footer navigation">
                <div className="row p-2">
                    <div className="col d-flex flex-column justify-content-center text-center">
                        <a href="/" onClick={() => handlePageChange('home')} className="d-flex flex-column align-items-center justify-content-center no-underline-footer">
                            <IonIcon icon={build} className={`fs-1 m-auto ${currentPage === 'home' ? 'active-icon' : 'footer-icon-grey'}`} />
                            <span className={`${currentPage === 'home' ? 'active-icon' : 'footer-text-grey'}`}>Active Task</span>
                        </a>
                    </div>
                    <div className="col d-flex flex-column justify-content-center text-center">
                        <a href="/search" onClick={() => handlePageChange('search')} className="d-flex flex-column align-items-center justify-content-center no-underline-footer">
                            <IonIcon icon={searchOutline} className={`fs-1 m-auto ${currentPage === 'search' ? 'active-icon' : 'footer-icon-grey'}`} />
                            <span className={`${currentPage === 'search' ? 'active-icon' : 'footer-text-grey'}`}>Search</span>
                        </a>
                    </div>
                    <div className="col d-flex flex-column justify-content-center text-center">
                        <a href="/help" onClick={() => handlePageChange('help')} className="d-flex flex-column align-items-center justify-content-center no-underline-footer">
                            <IonIcon icon={alertCircleOutline} className={`fs-1 m-auto ${currentPage === 'help' ? 'active-icon' : 'footer-icon-grey'}`} />
                            <span className={`${currentPage === 'help' ? 'active-icon' : 'footer-text-grey'}`}>Help</span>
                        </a>
                    </div>
                </div>
            </footer>
        </IonPage>
    );
};

export default Settings;