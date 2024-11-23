import './ExploreContainer.css';
import React, { useState, useEffect } from 'react';
import { IonIcon, IonButtons, IonContent } from '@ionic/react';
import {
    notificationsOffOutline,
    searchOutline,
    alertCircleOutline,
    bookmarkOutline,
    checkmarkCircle,
    settings,
    grid,
    build
} from 'ionicons/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/Home.css';
import { useHistory } from 'react-router-dom';
import logo from '../assets/logo.svg';

const ExploreContainer: React.FC<ContainerProps> = () => {
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 576);
    const [currentPage, setCurrentPage] = useState('home');
    const history = useHistory();

    const handlePageChange = (page: string) => {
        setCurrentPage(page);
        history.push(`/${page}`);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 576);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {/* Knowledgebase */}
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

            {/* Body Section with Additional Icons */}
            <IonContent className="ion-no-padding" scrollY={false}>
                <main
                    id="dashboard"
                    className={`container-fluid text-dark d-flex align-items-center justify-content-center flex-column dashboard-wrapper ${isMobileView ? 'mobile-layout' : 'desktop-layout'}`}
                    style={{ paddingTop: '20px' }}
                >
                    <div className="icon-row">
                        <div className="icon-container" aria-label="Scheduled">
                            <div
                                onClick={() => handlePageChange('scheduled')}
                                className="d-flex flex-column align-items-center justify-content-center text-dark no-underline"
                                style={{ cursor: 'pointer' }}
                            >
                                <IonIcon icon={bookmarkOutline} className="icon-style"/>
                                <span className="fw-bold fs-6 mt-3 text-center text-dark" aria-hidden="true">Scheduled</span>
                            </div>
                        </div>

                        <div className="icon-container" aria-label="Completed">
                            <div
                                onClick={() => handlePageChange('completed')}
                                className="d-flex flex-column align-items-center justify-content-center text-dark no-underline"
                                style={{ cursor: 'pointer' }}
                            >
                                <IonIcon icon={checkmarkCircle} className="icon-style"/>
                                <span className="fw-bold fs-6 mt-3 text-center text-dark" aria-hidden="true">Completed</span>
                            </div>
                        </div>
                    </div>

                    <div className="icon-row">
                        <div className="icon-container" aria-label="Knowledge Base">
                            <div
                                onClick={() => handlePageChange('knowledge-base')}
                                className="d-flex flex-column align-items-center justify-content-center text-dark no-underline"
                                style={{cursor: 'pointer'}}
                            >
                                <IonIcon icon={grid} className="icon-style"/>
                                <span className="fw-bold fs-6 mt-3 text-center text-dark" aria-hidden="true">Knowledge Base</span>
                            </div>
                        </div>

                        <div className="icon-container" aria-label="Settings">
                            <div
                                onClick={() => handlePageChange('settings')}
                                className="d-flex flex-column align-items-center justify-content-center text-dark no-underline"
                                style={{cursor: 'pointer'}}
                            >
                                <IonIcon icon={settings} className="icon-style"/>
                                <span className="fw-bold fs-6 mt-3 text-center text-dark"
                                      aria-hidden="true">Settings</span>
                            </div>
                        </div>
                    </div>
                </main>

                {/* KnowledgeBase */}
                <footer className="container-fluid text-white fixed-bottom" style={{backgroundColor: '#00AAA2'}}
                        role="navigation" aria-label="footer navigation">
                    <div className="row p-2">
                        <div className="col d-flex flex-column justify-content-center text-center">
                            <div
                                onClick={() => handlePageChange('home')}
                                className="d-flex flex-column align-items-center justify-content-center no-underline-footer"
                                style={{ cursor: 'pointer' }}
                            >
                                <IonIcon icon={build} className={`fs-1 m-auto ${currentPage === 'home' ? 'active-icon' : 'footer-icon-grey'}`}/>
                                <span className={`${currentPage === 'home' ? 'active-icon' : 'footer-text-grey'}`}>Active Task</span>
                            </div>
                        </div>
                        <div className="col d-flex flex-column justify-content-center text-center">
                            <div
                                onClick={() => handlePageChange('search')}
                                className="d-flex flex-column align-items-center justify-content-center no-underline-footer"
                                style={{ cursor: 'pointer' }}
                            >
                                <IonIcon icon={searchOutline} className={`fs-1 m-auto ${currentPage === 'search' ? 'active-icon' : 'footer-icon-grey'}`}/>
                                <span className={`${currentPage === 'search' ? 'active-icon' : 'footer-text-grey'}`}>Search</span>
                            </div>
                        </div>
                        <div className="col d-flex flex-column justify-content-center text-center">
                            <div
                                onClick={() => handlePageChange('help')}
                                className="d-flex flex-column align-items-center justify-content-center no-underline-footer"
                                style={{ cursor: 'pointer' }}
                            >
                                <IonIcon icon={alertCircleOutline} className={`fs-1 m-auto ${currentPage === 'help' ? 'active-icon' : 'footer-icon-grey'}`}/>
                                <span className={`${currentPage === 'help' ? 'active-icon' : 'footer-text-grey'}`}>Help</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </IonContent>
        </>
    );
};

export default ExploreContainer;