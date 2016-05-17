import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { routeActions } from 'react-router-redux';
import * as LobbyActions from 'redux/modules/lobby';
import { Grid, Row, Col, Table, Button } from 'react-bootstrap';

@connect(state =>
  ({lobby : state.lobby,
    user : state.auth.user}), {...LobbyActions, pushState: routeActions.push})
export default class LobbyRoom extends Component {


  componentDidMount() {
    if (socket) {
      socket.on('update lobbyRoom', (lobbyRoom) => { this.props.joinLobby(lobbyRoom) });
      socket.on('go to game', () => { this.props.pushState('/game'); })
    }

  }

  componentWillUnmount() {
    if (socket) {
      socket.removeListener('update lobbyRoom');
    }
  }

  leaveLobby(username){
    if(socket)
      socket.emit('leave lobby', {user: username, id: this.props.lobby.lobbyRoom.id})
  }

  startGame(user, lobby){
    if(socket){
      socket.emit('start game', {user: user, id: lobby.id});
    }
  }

  addBot(lobby){
    if(socket){
      socket.emit('add bot', lobby.id);
    }
  }


  render() {
    const styles = require('./LobbyRoom.scss');
    return ( this.props.lobby.lobbyRoom &&
      <Grid className={ styles.lobbyRoom }>
        <Row>
          <h1>Aktualne v lobby { this.props.lobby.lobbyRoom.name }</h1>
        </Row>
        <Row>
          <h3>Hraci</h3>
        </Row>
        <Row>
          <Col md={4}>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Meno hraca</th>
                </tr>
              </thead>
              <tbody>
                { JSON.parse(this.props.lobby.lobbyRoom.players).playerList.map((player, index) => {
                  return (
                    <tr
                      key={index}
                      className={ player === this.props.user.username ? styles.myName : ''}
                    >
                      <td>{ player }</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          { this.props.user.username === JSON.parse(this.props.lobby.lobbyRoom.players).playerList[0]
            ?
            <span>
              <Link to="/game">
                <Button
                  bsStyle="success"
                  className={ styles.button }
                  onClick={ () => this.startGame(this.props.user.username, this.props.lobby.lobbyRoom) }
                >
                  Spustit hru
                </Button>
              </Link>
              <Button
                bsStyle="info"
                className={ styles.button }
                onClick={ () => this.addBot(this.props.lobby.lobbyRoom) }
              >
                Pridat bota
              </Button>
            </span>
            : <h4>Musite pockat kym zakladatel spusti hru...</h4>
          }

          <Link to="/lobby">
            <Button
              bsStyle="danger"
              className={ styles.button }
              onClick={ () => this.leaveLobby(this.props.user.username) }
            >
              Opustit hru
            </Button>
          </Link>
        </Row>
      </Grid>
    );
  }
}