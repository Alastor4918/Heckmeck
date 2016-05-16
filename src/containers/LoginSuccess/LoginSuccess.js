import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as authActions from 'redux/modules/auth';

@connect(
    state => ({user: state.auth.user}),
    authActions)
export default
class LoginSuccess extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func
  };

  render() {
    const {user, logout} = this.props;
    return (user &&
      <div className="container" style={{"marginTop":"50px"}}>
        <h1>Prihlasenie uspesne</h1>

        <div>
          <p>Hi, {user.username}. Uspesne ste sa prihlasili.
          </p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Odhlasenie</button>
            <Link to="/game"><button className="btn btn-primary"><i className="fa fa-play-circle"/>{' '}Rychla hra proti botovi</button></Link>
            <button className="btn btn-success"><i className="fa fa-plus-circle"/>{' '}Rychla hra proti botovi</button>
          </div>
        </div>
      </div>
    );
  }
}
