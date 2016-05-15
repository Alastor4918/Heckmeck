import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({auth: state.auth}),
  authActions)
export default class Login extends Component {
  static propTypes = {
    auth: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const username = this.refs.username;
    const password = this.refs.password;
    this.props.login( username.value, password.value);
    username.value = '';
    password.value = '';
  };

  render() {
    const {user, logout} = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>
        <h1>Login</h1>
        {!user &&
        <div>
          <form className="login-form form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" ref="username" placeholder="Enter a username" className="form-control"/><br/>
              <input type="password" ref="password" placeholder="Enter a password" className="form-control"/><br/>
            </div>
            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
            </button>
            { this.props.auth.loginError ? <p className={styles.error}>{ this.props.auth.loginError }</p> : '' }
          </form>
          <p>Dont have account ? <Link to="/register">Register now !</Link></p>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.username}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
