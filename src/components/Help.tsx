import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import {
    notificationsOffOutline,
    settings,
    build,
    searchOutline,
    alertCircleOutline,
    ellipseOutline,
    squareOutline,
    chevronDownOutline
} from 'ionicons/icons';
import '../pages/Home.css';
import logo from '../assets/logo.svg';

const Help: React.FC = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const history = useHistory();

    const handlePageChange = (page: string) => {
        setCurrentPage(page);
        if (page === 'settings') {
            history.push('/settings');
        } else if (page === 'scheduled') {
            history.push('/scheduled');
        } else if (page === 'home') {
            history.push('/');
        } else if (page === 'search') {
            history.push('/search');
        } else if (page === 'help') {
            history.push('/help');
        }
    };

    return (
        <IonPage>
            <IonHeader className="custom-toolbar">
                <IonToolbar className="bg-dark d-flex custom-toolbar justify-content-between align-items-center" color='bg-dark'>
                    <IonButtons slot="end">
                        <IonIcon icon={squareOutline} size="small" className="text-white me-3 custom-icon custom-toolbar" />
                        <IonIcon icon={ellipseOutline} size="small" className="text-white me-3 custom-icon custom-toolbar" />
                        <IonIcon icon={chevronDownOutline} size="small" className="text-white custom-icon custom-toolbar" />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <header>
                <div className="d-flex justify-content-between align-items-center dashboard-toolbar">
                    <div className="d-flex align-items-center">
                        <img src={logo} alt="Real Estate Care Logo" className="logo-style" />
                    </div>
                    <IonButtons slot="end">
                        <IonIcon icon={notificationsOffOutline} size="large" style={{ marginRight: '5px' }} className="icon-style text-white" />
                        <IonIcon icon={settings} size="large" className="icon-style text-white" onClick={() => handlePageChange('settings')} />
                    </IonButtons>
                </div>
            </header>

            <IonContent className="ion-no-padding" scrollY={true}>
                <main className="container-fluid text-dark p-4" style={{ width: '90%', margin: '0 auto', marginBottom: '80px' }}>
                    <h4>Getting Started</h4>
                    <div className="border rounded p-3 mb-3">
                        <p>Log in with your provided email and password.</p>

                    </div>

                    <h4>Scheduled Inspections</h4>
                    <div className="border rounded p-3 mb-3">
                        <p>Click on an address to view the list of inspections assigned to that address.</p>
                    </div>

                    <h4>Completed Inspections</h4>
                    <div className="border rounded p-3 mb-3">
                        <p>Click on an inspection to view it, make edits, or add additional information.</p>
                    </div>

                    <h4>Knowledge Base</h4>
                    <div className="border rounded p-3 mb-3">
                        <p>Here you can find information on how to use the app, best practices for completing inspections, and other useful information.</p>
                    </div>

                    <h4>Settings</h4>
                    <div className="border rounded p-3 mb-3">
                        <p>From the main dashboard, click on "Settings" to access your profile information, change your password, and customize your notification preferences.</p>
                    </div>

                </main>

                <footer className="container-fluid text-white fixed-bottom" style={{ backgroundColor: '#00AAA2' }}
                        role="navigation" aria-label="footer navigation">
                    <div className="row p-2">
                        <div className="col d-flex flex-column justify-content-center text-center">
                            <div
                                onClick={() => handlePageChange('home')}
                                className="d-flex flex-column align-items-center justify-content-center no-underline-footer"
                                style={{ cursor: 'pointer' }}
                            >
                                <IonIcon icon={build} className={`fs-1 m-auto ${currentPage === 'home' ? 'active-icon' : 'footer-icon-grey'}`} />
                                <span className={`${currentPage === 'home' ? 'active-icon' : 'footer-text-grey'}`}>Active Task</span>
                            </div>
                        </div>
                        <div className="col d-flex flex-column justify-content-center text-center">
                            <div
                                onClick={() => handlePageChange('search')}
                                className="d-flex flex-column align-items-center justify-content-center no-underline-footer"
                                style={{ cursor: 'pointer' }}
                            >
                                <IonIcon icon={searchOutline} className={`fs-1 m-auto ${currentPage === 'search' ? 'active-icon' : 'footer-icon-grey'}`} />
                                <span className={`${currentPage === 'search' ? 'active-icon' : 'footer-text-grey'}`}>Search</span>
                            </div>
                        </div>
                        <div className="col d-flex flex-column justify-content-center text-center">
                            <div
                                onClick={() => handlePageChange('help')}
                                className="d-flex flex-column align-items-center justify-content-center no-underline-footer"
                                style={{ cursor: 'pointer' }}
                            >
                                <IonIcon icon={alertCircleOutline} className={`fs-1 m-auto ${currentPage === 'help' ? 'active-icon' : 'footer-icon-grey'}`} />
                                <span className={`${currentPage === 'help' ? 'active-icon' : 'footer-text-grey'}`}>Information</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </IonContent>
        </IonPage>
    );
};

export default Help;
