import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount() {
        //gapi - var available in window scope after linking Oauth library
        //library is extremely lightweight and every functionality must be additionally loaded
        //we load only functionality we will use
        window.gapi.load('client:auth2', () => {
            //initialize with our key
            window.gapi.client.init({
                clientId: '779770667112-u21la91tp5q28ikql3hcpnt2m4pibpvc.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                //when initialized get info and set to state is user authenticated or not
                this.auth = window.gapi.auth2.getAuthInstance();
                //get initial status from library and save to redux using appropriate action
                this.onAuthChange(this.auth.isSignedIn.get(this.auth.currentUser.get().getId()));
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        //if not authenticated - grab userId
        isSignedIn ? this.props.signIn(this.auth.currentUser.get().getId()) : this.props.signOut();
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if(this.props.isSignedIn === null) return null;
        else if(this.props.isSignedIn) {
            return (
                <button className="ui red google button" onClick={this.onSignOutClick}>
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        }
        return (
            <button className="ui red google button" onClick={this.onSignInClick}>
                <i className="google icon" />
                Sign In
            </button>
        )
    }
    
    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);
