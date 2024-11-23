import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonIcon, IonButton } from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import {
    chevronBackOutline,
    notificationsOffOutline,
    settings,
    build,
    searchOutline,
    alertCircleOutline,
    squareOutline, ellipseOutline, chevronDownOutline
} from 'ionicons/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/Home.css';
import logo from '../assets/logo.svg';

interface InspectionDetails {
    id: string;
    address: string;
    details: string;
    status: string;
    scheduledDate: string;
}

const Inspections: React.FC = () => {
    const [inspection, setInspection] = useState<InspectionDetails | null>(null);
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 576);
    const [currentPage, setCurrentPage] = useState('home');

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

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 576);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/inspections/${id}`)
            .then((response) => response.json())
            .then((data) => setInspection(data))
            .catch((error) => console.error("Error fetching inspection:", error));
    }, [id]);

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

            <IonContent className="ion-padding border rounded w-100">
                <IonButton
                    color="danger"
                    onClick={() => history.goBack()}
                    style={{ fontWeight: 'bold', border: '1px solid #ccc', marginBottom: '2px' }}
                >
                    Go Back
                </IonButton>
                {inspection ? (
                    <div style={{
                        maxWidth: '100%',
                        margin: '0 auto',
                        textAlign: 'left',
                        padding: '3px',
                        borderRadius: '10px'
                    }}>
                        <div style={{ padding: '20px', borderRadius: '10px'}}>
                            <h2 style={{fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '10px', color: '#333'}}>
                                Inspection at {inspection.address}
                            </h2>

                            <div style={{ padding: '20px', borderRadius: '10px', border: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ textAlign: 'left' }}>
                                    <p style={{
                                        fontSize: '1.2rem',
                                        color: '#555',
                                        marginBottom: '10px',
                                        padding: '10px'
                                    }}>
                                        <strong>Inspection ID:</strong> {inspection.id}
                                    </p>
                                    <p style={{
                                        fontSize: '1.2rem',
                                        color: '#555',
                                        marginBottom: '20px',
                                        padding: '10px'
                                    }}>
                                        <strong>Date:</strong> {inspection.scheduledDate}
                                    </p>
                                    <span
                                        style={{
                                            padding: '8px 16px',
                                            borderRadius: '5px',
                                            color: '#fff',
                                            backgroundColor: inspection.status === 'Completed' ? '#28a745' : '#dc3545',
                                            marginRight: '10px',
                                            fontSize: '1rem',
                                            fontWeight: 'bold',
                                            border: '1px solid #ccc',
                                        }}
                                    >
                            {inspection.status}
                        </span>
                                </div>
                                <IonButton
                                    color=" custom-toolbar  border rounded"
                                    onClick={() => history.push('/InspectionAdd')}
                                    style={{  }}
                                >
                                    GO TO INSPECTION
                                </IonButton>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p style={{textAlign: 'center', color: '#555'}}>Loading inspection details...</p>
                )}
            </IonContent>


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
                            <span className={`${currentPage === 'help' ? 'active-icon' : 'footer-text-grey'}`}>Information</span>
                        </div>
                    </div>
                </div>
            </footer>
        </IonPage>
    );
};

export default Inspections;