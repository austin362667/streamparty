import React, { useState } from 'react';
// import Browse from './components/Browse/Browse';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './components/breakpoints.scss';
import JoinRoom from './components/Join/JoinRoom';
import Room from './components/Room/Room';

import { Button } from "@material-ui/core";
import VideoCall from "./VideoCall";

const App = () => (
    
    const [inCall, setInCall] = useState(false);
    
    <div>
        <ReactNotification />
        <Router>
            <Switch>
                <Route path="/" exact component={JoinRoom} />
                <Route path="/room/:roomName" component={Room} />
                <Redirect to="/" />
                {/* <Route path="/browse" component={Browse} /> */}
            </Switch>
        </Router>
        <div className="App" style={{ height: "100%" }}>
          {inCall ? (
            <VideoCall setInCall={setInCall} />
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setInCall(true)}
            >
              Join Call
            </Button>
          )}
        </div>
    </div>

);

export default App;
