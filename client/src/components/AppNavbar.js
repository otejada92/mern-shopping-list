import React, {Component, Fragment} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './Auth/RegisterModal';
import Logout from './Auth/Logout';
import LoginModal from './Auth/LoginModal';

class AppNavBar extends Component {
    
    state = { 
        isOpen: false
    }

    static propTypes = {
        auth : PropTypes.object.isRequired
    }

    toggle = () =>{
        this.setState({ 
            isOpen : !this.state.isOpen
        });
    }

    render() { 
        const {isAuthenticated, user} = this.props.auth;

        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{ user ? `Welcome ${user.name}` : null}</strong>
                    </span>
                    <Logout/>
                </NavItem> 
            </Fragment>
        );

        
        const guestLink = (
            <Fragment>
                <NavItem>
                        <RegisterModal/>
                </NavItem>
                <NavItem>
                        <LoginModal/>
                </NavItem>
            </Fragment>);

        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand hre="/">Shopping list</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {isAuthenticated ? authLinks : guestLink}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});


export default connect (mapStateToProps, null)(AppNavBar);
