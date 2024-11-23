import React, { useState, useEffect } from 'react';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import Home from './pages/Home';
import Settings from './components/Settings';
import ExploreContainer from './components/ExploreContainer';
import Login from './components/Login';
import Scheduled from './components/Scheduled'; // Import the Scheduled component
import Completed from './components/Completed'; // Import the Completed component
import InspectionAdd   from "./components/InspectionAdd";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import Inspections from './components/Inspections';
import Knowledgebase  from "./components/Knowledgebase";
import Search  from "./components/Search";
/* Theme variables */
import './theme/variables.css';
import Help from './components/Help';
setupIonicReact();

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
      <IonApp>
        <Router>
          <IonRouterOutlet>
            <Route exact path="/home">
              {isLoggedIn ? <Home onLogout={handleLogout} /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/explore">
              {isLoggedIn ? <ExploreContainer /> : <Redirect to="/login" />}
            </Route>

           <Route exact path="/completed">
            {isLoggedIn ? <Completed /> : <Redirect to="/login" />}
          </Route>
            <Route exact path="/settings">
              {isLoggedIn ? <Settings onLogout={handleLogout} /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/inspectionadd">
              {isLoggedIn ? <InspectionAdd /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/scheduled">
              {isLoggedIn ? <Scheduled /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/help">
              {isLoggedIn ? <Help /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/login">
              {isLoggedIn ? <Redirect to="/home" /> : <Login onLoginSuccess={handleLoginSuccess} />}
            </Route>
            <Route exact path="/search">
              {isLoggedIn ? <Search /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/knowledgebase">
             {isLoggedIn ? <Knowledgebase onLoginSuccess={handleLoginSuccess} /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/inspections/:id">
              <Inspections />
            </Route>
          </IonRouterOutlet>
        </Router>
      </IonApp>
  );
};

export default App;
