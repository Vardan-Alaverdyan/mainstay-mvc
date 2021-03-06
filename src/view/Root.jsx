import React from 'react';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import {routes} from './routes';
import Footer from './Footer';
import TopNavigation from './TopNavigation';
import Client from './Client';
import PrivacyPolicy from './PrivacyPolicy';
import Commitment from './Commitment';
import Transaction from './Transaction';
import MerkleRoot from './MerkleRoot';
import Blockhash from './Blockhash';
import Position from './Position';
import Attestation from './Attestation';
import Search from './search/search';
import TermsConditions from './TermsConditions';
import Home from './Home';
import Subscribe from './Subscribe';
import About from './About';
import appHistory from './app.history';

const Root = () => (
    <Router history={appHistory}>
        <div className="top-nav">
            <div className="container">
                <TopNavigation />
            </div>
            <div className="container main" data-controller="main">
                <Switch>
                    <Route path={routes.search} component={Search} />
                    <Route path={routes.search} component={Search} />
                    <Route path={routes.position} component={Position} />
                    <Route path={routes.block} component={Blockhash} />
                    <Route path={routes.commitment} component={Commitment} />
                    <Route path={routes.transation} component={Transaction} />
                    <Route path={routes.merkle} component={MerkleRoot} />
                    <Route path={routes.attestation} component={Attestation} />
                    <Route path={routes.client} exac component={Client} />
                    <Route path={routes.privacy} component={PrivacyPolicy} />
                    <Route path={routes.terms} component={TermsConditions} />
                    {/*<Route path={routes.pricing} component={Pricing} />*/}
                    <Route path={routes.about} component={About} />
                    <Route path={routes.subscribe} component={Subscribe} />
                    <Route exact path={routes.app} component={Home} />
                    <Redirect from="*" to={routes.app} />
                </Switch>
            </div>
            <Footer />
        </div>
    </Router>
);

export default Root;
