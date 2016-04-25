import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({user: state.auth.user}),
  authActions)
export default class Register extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    const username = this.refs.username;
    const nickname = this.refs.nickname;
    const password = this.refs.password;
    this.props.register(nickname.value, username.value, password.value);
    username.value = '';
    nickname.value = '';
    password.value = '';
  };

  render() {
    const {user, logout} = this.props;
    const styles = require('./Register.scss');
    return (
      <div className={styles.RegisterPage + ' container'}>
        <Helmet title="Register"/>
        <h1>Register</h1>
        {!user &&
        <div>
          <form className="register-form form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" ref="nickname" placeholder="Enter a nickname" className="form-control"/><br/>
              <input type="text" ref="username" placeholder="Enter a username" className="form-control"/><br/>
              <input type="password" ref="password" placeholder="Enter a password" className="form-control"/><br/>
            </div>
            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Register
            </button>
          </form>
          <p>Create registration</p>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
