import React, { Component } from 'react';


import { Navbar, Nav } from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';

import LoginStatus from 'client-auth/dist/LoginStatus/LoginStatus';



class MainNavbar extends Component {

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Agile Boost</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/" exact>
                            <Nav.Link href="/">Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/about">
                            <Nav.Link href="/about">About</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/signup">
                            <Nav.Link href="/signup">Signup</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Navbar.Text className="justify-content-end">
                       <LoginStatus cookies={this.props.cookies}></LoginStatus> 
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}


export default MainNavbar;