import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
import GoogleButton from "react-google-button";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "240071533521-4d3v2hcam837cf2a46pk9uutooar0n9p.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          //get the auth object
          this.auth = window.gapi.auth2.getAuthInstance();
          console.log(this.auth);
          //set intitial auth state
          this.onAuthChange(this.auth.isSignedIn.get());
          //set up listener to monitor changes in auth state
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };
  // when auth state changes, we run the ACTION CREATORS to produce the action and change the state isSignedIn
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn();
    } else {
      this.props.signOut();
    }
  };

  renderAuthButton = () => {
    if (this.props.isSignedIn === null) {
      return null;
    }
    if (this.props.isSignedIn) {
      return (
        <GoogleButton
          onClick={this.onSignOutClick}
          label="Sign Out with Googgle"
          type="light"
          style={{borderRadius:'8px'}}
        />
      );
    }
    if (!this.props.isSignedIn) {
      return (
        <GoogleButton
          onClick={this.onSignInClick}
          label="Sign In with Googgle"
          type="light"
          style={{borderRadius:'8px'}}
        />
      );
    }
  };

  render() {
    return <div> {this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
