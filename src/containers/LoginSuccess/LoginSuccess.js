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

  createGame(){
    if(socket)
      socket.emit('game started', this.props.user.username);
  }

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
            <Link to="/game"><button onClick={ () => this.createGame() } className="btn btn-primary"><i className="fa fa-play-circle"/>{' '}Rychla hra proti botovi</button></Link>
            <Link to="/lobby"><button className="btn btn-success"><i className="fa fa-plus-circle"/>{' '}Vytvorit novu hru</button></Link>
          </div>
        </div>
      </div>
    );
  }
}
