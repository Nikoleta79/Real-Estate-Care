import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import {
    settings,
    build,
    searchOutline,
    alertCircleOutline,
    ellipseOutline,
    squareOutline,
    chevronDownOutline, chevronUpOutline, notificationsOffOutline
} from 'ionicons/icons';
import '../pages/Home.css';
import logo from '../assets/logo.svg';

const InspectionAdd: React.FC = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 576);
    const [showDamageForm, setShowDamageForm] = useState(false);
    const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
    const [showModificationsForm, setShowModificationsForm] = useState(false);
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

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 576);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
            <IonContent className="ion-padding ion-content" scrollY={true}>
                <main className="container-fluid text-dark d-flex flex-column align-items-start"
                      style={{width: '100%', maxWidth: '100%', marginTop: '20px', marginBottom: '80px'}}>
                    <form aria-label="Form to edit inspection" style={{width: '100%'}}>
                        <h1>Inspection 111</h1>
                        <div className="form-group">
                            <label htmlFor="cleanlinessScore" aria-label="Cleanliness Score">Cleanliness Score</label>
                            <select className="form-select" id="cleanlinessScore"
                                    aria-label="Cleanliness score dropdown">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>

                        {/* Damage Section */}
                        <div className="form-group my-3 py-3">
                            <div className="form-group my-3 d-flex align-items-center">
                                <button
                                    type="button"
                                    className="btn btn-secondary d-flex align-items-center"
                                    aria-label="Toggle damage section"
                                    onClick={() => setShowDamageForm(!showDamageForm)}
                                >
                                    <IonIcon
                                        icon={showDamageForm ? chevronUpOutline : chevronDownOutline}
                                        size="small"
                                        className="text-white"
                                    />
                                </button>
                                <span className="ms-3 fs-5">Damage</span>
                            </div>

                            <div className="d-flex justify-content-between">
                                <button type="button" className="btn custom-toolbar" aria-label="Add Damage">Add
                                    Damage
                                </button>
                            </div>

                            {showDamageForm && (
                                <div className="mt-3">
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        aria-label="Delete damage"
                                        onClick={() => setShowDamageForm(false)}
                                    >
                                        Delete
                                    </button>
                                    <div className="form-group">
                                        <label>Location</label>
                                        <input type="text" className="form-control"
                                               placeholder="Enter the location of the damage"/>
                                    </div>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="newDamage"/>
                                        <label className="form-check-label" htmlFor="newDamage">New</label>
                                    </div>
                                    <div className="form-group">
                                        <label>Type</label>
                                        <input type="text" className="form-control"
                                               placeholder="Enter the type of damage"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Date</label>
                                        <input type="date" className="form-control"
                                               placeholder="Enter the date the damage was discovered"/>
                                    </div>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="acuteAction"/>
                                        <label className="form-check-label" htmlFor="acuteAction">Acute Action</label>
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea className="form-control"
                                                  placeholder="Enter a description of the damage"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Photos</label>
                                        <input type="file" className="form-control" multiple/>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Maintenance Section */}
                        <div className="form-group my-3 py-3">
                            <div className="form-group my-3 d-flex align-items-center">
                                <button
                                    type="button"
                                    className="btn btn-secondary d-flex align-items-center"
                                    aria-label="Toggle maintenance section"
                                    onClick={() => setShowMaintenanceForm(!showMaintenanceForm)}
                                >
                                    <IonIcon
                                        icon={showMaintenanceForm ? chevronUpOutline : chevronDownOutline}
                                        size="small"
                                        className="text-white"
                                    />
                                </button>
                                <span className="ms-3 fs-5">Maintenance</span>
                            </div>

                            <div className="d-flex justify-content-between">
                                <button type="button" className="btn custom-toolbar" aria-label="Add Maintenance">Add
                                    Maintenance
                                </button>
                            </div>

                            {showMaintenanceForm && (
                                <div className="mt-3">
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        aria-label="Delete maintenance"
                                        onClick={() => setShowMaintenanceForm(false)}
                                    >
                                        Delete
                                    </button>
                                    <div className="form-group">
                                        <label>Location</label>
                                        <input type="text" className="form-control"
                                               placeholder="Enter the location of the maintenance"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Type</label>
                                        <input type="text" className="form-control"
                                               placeholder="Enter the type of maintenance"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Date</label>
                                        <input type="date" className="form-control"
                                               placeholder="Enter the date of the maintenance"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea className="form-control"
                                                  placeholder="Enter a description of the maintenance"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Photos</label>
                                        <input type="file" className="form-control" multiple/>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Installations Section */}
                        <div className="form-group my-3 py-3">
                            <div className="form-group my-3 d-flex align-items-center">
                                <button
                                    type="button"
                                    className="btn btn-secondary d-flex align-items-center"
                                    aria-label="Toggle installation section"
                                    onClick={() => setShowModificationsForm(!showModificationsForm)}
                                >
                                    <IonIcon
                                        icon={showModificationsForm ? chevronUpOutline : chevronDownOutline}
                                        size="small"
                                        className="text-white"
                                    />
                                </button>
                                <span className="ms-3 fs-5">Installations</span>
                            </div>

                            <div className="d-flex justify-content-between">
                                <button type="button" className="btn custom-toolbar" aria-label="Add Installation">Add
                                    Installation
                                </button>
                            </div>
                        </div>

                        {/* Modifications Section */}
                        <div className="form-group my-3 py-3">
                            <div className="form-group my-3 d-flex align-items-center">
                                <button
                                    type="button"
                                    className="btn btn-secondary d-flex align-items-center"
                                    aria-label="Toggle modifications section"
                                    onClick={() => setShowModificationsForm(!showModificationsForm)}
                                >
                                    <IonIcon
                                        icon={showModificationsForm ? chevronUpOutline : chevronDownOutline}
                                        size="small"
                                        className="text-white"
                                    />
                                </button>
                                <span className="ms-3 fs-5">Modifications</span>
                            </div>

                            <div className="d-flex justify-content-between">
                                <button type="button" className="btn custom-toolbar" aria-label="Add Modification">Add
                                    Modification
                                </button>
                            </div>

                            {showModificationsForm && (
                                <div className="mt-3">
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        aria-label="Delete modification"
                                        onClick={() => setShowModificationsForm(false)}
                                    >
                                        Delete
                                    </button>
                                    <div className="form-group">
                                        <label>Existing Situation</label>
                                        <input type="text" className="form-control"
                                               placeholder="Enter existing situation"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Location</label>
                                        <input type="text" className="form-control" placeholder="Enter the location"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Performed By</label>
                                        <input type="text" className="form-control" placeholder="Enter the performer"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea className="form-control" placeholder="Enter a description"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Action</label>
                                        <input type="text" className="form-control" placeholder="Enter action taken"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Comments</label>
                                        <input type="text" className="form-control" placeholder="Enter comments"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Photos</label>
                                        <input type="file" className="form-control" multiple/>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer section */}
                        <div className="form-group d-flex gap-3">
                            <button
                                type="button"
                                className="btn btn-danger"
                                aria-label="Cancel inspection"
                                onClick={() => {
                                    history.push('/home');
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-success"
                                type="submit"
                                aria-label="Save inspection"
                                onClick={() => {
                                    history.push('/home');
                                    alert('Inspection saved successfully!');
                                }}
                            >
                                Save inspection
                            </button>
                            <button
                                type="button"
                                className="btn btn-success"
                                aria-label="Complete inspection"
                                onClick={() => {
                                    history.push('/home');
                                    alert('Inspection completed successfully!');
                                }}
                            >
                                Complete inspection
                            </button>
                        </div>
                    </form>
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
                                    className={`${currentPage === 'help' ? 'active-icon' : 'footer-text-grey'}`}>Help</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </IonContent>
        </IonPage>
    );
};

export default InspectionAdd;