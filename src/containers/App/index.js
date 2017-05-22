import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./style.scss";
import * as authActions from "../../actions/auth";
import queryString from "query-string";

import Track from "../../components/Track";
import Login from "../../components/Login";

class App extends Component {
  componentDidMount() {
    this.getTokenFromCallbackHandler();
  }

  getTokenFromCallbackHandler() {
    if (window.location.pathname === "/cb") {
      let { code } = queryString.parse(window.location.search);

      if (code) {
        this.props.getAccessTokenFromCode(code);
      }
    }
  }

  render() {
    return (
      <div className={styles.app}>
        {this.props.accessToken ? <Track /> : <Login />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    accessToken: state.auth.accessToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAccessTokenFromCode: code =>
      dispatch(authActions.getAccessTokenFromCode(code)),
    getAccessTokenFromRefresh: () =>
      dispatch(authActions.getAccessTokenFromRefresh())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);