// Knowledge-base.tsx
import React from 'react';
import { IonIcon } from '@ionic/react';
import { home, searchOutline, alertCircleOutline, build } from 'ionicons/icons';
import '../pages/Home.css';

interface FooterProps {
    currentPage: string;
    handlePageChange: (page: string) => void;
}

const KnowledgeBase: React.FC<FooterProps> = ({ currentPage, handlePageChange }) => {
    return (
        <footer className="container-fluid text-white fixed-bottom" style={{ backgroundColor: '#00AAA2' }} role="navigation" aria-label="footer navigation">
            <div className="row p-2">
                <div className="col d-flex flex-column justify-content-center text-center">
                    <a href="/"
                       onClick={() => handlePageChange('home')}
                       className="d-flex flex-column align-items-center justify-content-center no-underline-footer">
                        <IonIcon icon={build} className={`fs-1 m-auto ${currentPage === 'home' ? 'active-icon' : 'footer-icon-grey'}`}/>
                        <span className={`${currentPage === 'home' ? 'active-icon' : 'footer-text-grey'}`}>Active Task</span>
                    </a>
                </div>
                <div className="col d-flex flex-column justify-content-center text-center">
                    <a href="/search"
                       onClick={() => handlePageChange('search')}
                       className="d-flex flex-column align-items-center justify-content-center no-underline-footer">
                        <IonIcon icon={searchOutline} className={`fs-1 m-auto ${currentPage === 'search' ? 'active-icon' : 'footer-icon-grey'}`}/>
                        <span className={`${currentPage === 'search' ? 'active-icon' : 'footer-text-grey'}`}>Search</span>
                    </a>
                </div>
                <div className="col d-flex flex-column justify-content-center text-center">
                    <a href="/help"
                       onClick={() => handlePageChange('help')}
                       className="d-flex flex-column align-items-center justify-content-center no-underline-footer">
                        <IonIcon icon={alertCircleOutline} className={`fs-1 m-auto ${currentPage === 'help' ? 'active-icon' : 'footer-icon-grey'}`}/>
                        <span className={`${currentPage === 'help' ? 'active-icon' : 'footer-text-grey'}`}>Help</span>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default KnowledgeBase;
