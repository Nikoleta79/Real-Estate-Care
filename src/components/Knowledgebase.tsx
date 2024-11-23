import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import {
    notificationsOffOutline,
    settings,
    bookmarkOutline,
    checkmarkCircle,
    grid,
    build,
    searchOutline,
    alertCircleOutline,
    ellipseOutline,
    squareOutline,
    chevronDownOutline
} from 'ionicons/icons';
import '../pages/Home.css';
import logo from '../assets/logo.svg';

interface HomeProps {
    onLoginSuccess: () => void;
}

const Knowledgebase: React.FC<HomeProps> = ({ onLoginSuccess }) => {
    const [currentPage, setCurrentPage] = useState('home');
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 576);
    const history = useHistory();

    const handlePageChange = (page: string) => {
        setCurrentPage(page);
        if (page === 'settings') {
            history.push('/settings');
        } else if (page === 'scheduled') {
            history.push('/scheduled');
        }else if(page === 'home'){
            history.push('/');
        }else if(page == 'search'){
            history.push('/search');
        }else if(page == 'help'){
            history.push('/help');
        }
    };

    return (
        <IonPage>
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

            <IonContent className="ion-padding" scrollY={true}>
                <main className="container card-content">
                    <div className="row">
                        {/* First Group of Documents */}
                        <div className="col-md-5 mt-2">
                            <div className="border rounded card-content p-1">
                                <h5>Example document 1</h5>
                                <a download className="btn custom-toolbar"
                                   aria-label="Download example document 1">Download</a>
                            </div>
                        </div>
                        <div className="col-md-5 mt-2 offset-md-1">
                            <div className="border card-content rounded p-2">
                                <h5>Example document 2</h5>
                                <a download className="btn custom-toolbar p-3"
                                   aria-label="Download example document p-4">Download</a>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        {/* Second Group of Documents */}
                        <div className="col-md-5 mt-3">
                            <div className="border card-content rounded p-2">
                                <h5>Example document 3</h5>
                                <a download className="btn custom-toolbar"
                                   aria-label="Download example document p-3">Download</a>
                            </div>
                        </div>
                        <div className="col-md-5 mt-3card-content offset-md-1">
                            <div className="border rounded p-2">
                                <h5>Example document 4</h5>
                                <a download className="btn custom-toolbar"
                                   aria-label="Download card-content example document 4">Download</a>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="container-fluid text-white fixed-bottom" style={{backgroundColor: '#00AAA2'}}
                        role="navigation" aria-label="footer navigation">
                    <div className="row p-2">
                        <div className="col d-flex flex-column justify-content-center text-center">
                            <div
                                onClick={() => handlePageChange('home')}
                                className="d-flex flex-column align-items-center justify-content-center no-underline-footer"
                                style={{cursor: 'pointer'}}
                            >
                                <IonIcon icon={build}
                                         className={`fs-1 m-auto ${currentPage === 'home' ? 'active-icon' : 'footer-icon-grey'}`}/>
                                <span className={`${currentPage === 'home' ? 'active-icon' : 'footer-text-grey'}`}>Active Task</span>
                            </div>
                        </div>
                        <div className="col d-flex flex-column justify-content-center text-center">
                            <div
                                onClick={() => handlePageChange('search')}
                                className="d-flex flex-column align-items-center justify-content-center no-underline-footer"
                                style={{cursor: 'pointer'}}
                            >
                                <IonIcon icon={searchOutline}
                                         className={`fs-1 m-auto ${currentPage === 'search' ? 'active-icon' : 'footer-icon-grey'}`}/>
                                <span
                                    className={`${currentPage === 'search' ? 'active-icon' : 'footer-text-grey'}`}>Search</span>
                            </div>
                        </div>
                        <div className="col d-flex flex-column justify-content-center text-center">
                            <div
                                onClick={() => handlePageChange('help')}
                                className="d-flex flex-column align-items-center justify-content-center no-underline-footer"
                                style={{cursor: 'pointer'}}
                            >
                                <IonIcon icon={alertCircleOutline}
                                         className={`fs-1 m-auto ${currentPage === 'help' ? 'active-icon' : 'footer-icon-grey'}`}/>
                                <span
                                    className={`${currentPage === 'help' ? 'active-icon' : 'footer-text-grey'}`}>Information</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </IonContent>
        </IonPage>
    );
};

export default Knowledgebase;
