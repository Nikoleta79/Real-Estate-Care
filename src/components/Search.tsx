import React, { useState, useEffect } from 'react';
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

const Search: React.FC = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 576);
    const [inspections, setInspections] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
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

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 576);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/inspections')
            .then(response => response.json())
            .then(data => {
                setInspections(data);
            })
            .catch(error => console.error('Error fetching inspections:', error));
    }, []);

    const handleViewInspection = (id: string) => {
        history.push(`/inspections/${id}`);
    };

    // Updated filtering logic
    const filteredInspections = inspections.filter((inspection) => {
        if (inspection.address) {
            return inspection.address.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false; // Skip inspections that don't have an address field
    });

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

            {/* Modified IonContent to allow scrollability */}
            <IonContent className="ion-padding" scrollY={true}>
                <main className="container-fluid w-100 text-dark d-flex flex-column align-items-left"
                      style={{ width: isMobileView ? '90%' : '96%', maxWidth: '800px', marginTop: '20px' }}>

                    {/* Search bar input */}
                    <input
                        type="text"
                        className="form-control mb-4"
                        placeholder="Search for address or city"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ maxWidth: '700px' }}
                    />

                    {filteredInspections.length > 0 ? (
                        filteredInspections.map((inspection) => (
                            <div key={inspection.id}
                                 className="d-flex flex-column align-items-center my-2 p-3 border rounded"
                                 style={{ width: '100%', maxWidth: '700px' }}>
                                <span>{inspection.address || 'No address available'}</span>
                                <button
                                    className="btn custom-toolbar mt-2"
                                    onClick={() => handleViewInspection(inspection.id)}
                                >
                                    View Inspections
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No scheduled inspections available.</p>
                    )}
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
                                <span className={`${currentPage === 'help' ? 'active-icon' : 'footer-text-grey'}`}>Help</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </IonContent>
        </IonPage>
    );
};

export default Search;
