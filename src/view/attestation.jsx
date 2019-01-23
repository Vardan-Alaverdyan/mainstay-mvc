import FaviconAddrBar from './faviconAddrBar';
import FooterPage from './footerPage';
import HamburgerMenu from './hamburgerMenu';
import Navbar from './navbar';
import React, {Component} from 'react';
import AttestationPaginated from './attestationPaginated';

class Attestation extends Component {
    render() {
        return <div class="top-nav">
            <div class="container">
                <div class="d-flex align-items-center flex-wrap">
                    <FaviconAddrBar/>
                    <Navbar/>
                    <HamburgerMenu/>
                    <AttestationPaginated/>
                    <FooterPage/>

                </div>
            </div>


        </div>;
    }
}

export default Attestation;