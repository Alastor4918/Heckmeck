import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as LobbyActions from 'redux/modules/lobby';
import { Grid, Row, Col, Table, Button } from 'react-bootstrap';

@connect(state =>
  ({lobby : state.lobby,
    user : state.auth.user}), LobbyActions)
export default class Lobby extends Component {
  state= {
    value: '',
    error: ''
  };

  onChange(e){
    this.setState({value: e.target.value, error: ''});
  }

  componentDidMount() {
    if (socket) {
      socket.on('update lobbies', (lobbies) => {
        this.props.updateLobbyList(lobbies);
      });
      socket.on('update lobbyRoom', (lobbyRoom) => { this.props.joinLobby(lobbyRoom) });
      socket.emit('get lobbies', this.props.user.username);
    }

  }

  componentWillUnmount() {
    if (socket) {
      socket.removeListener('update lobbies');
      socket.removeListener('update lobbyRoom');
    }
  }

  createLobby(username){
    if(socket) {
      if(this.state.value){
        socket.emit('create lobby', {user: username, name: this.state.value});
        this.setState({value: ''});
      }
      else
        this.setState({error: "Meno hry nemoze byt prazndny retazec"})
    }
  }

  setSelected(index) {
    this.props.selectLobby(index);
  }

  joinLobby(username, index) {
    const lobby = this.props.lobby.lobbyList[index];

    this.props.joinLobby(this.props.lobby.lobbyList[index]);
    if(socket){
      socket.emit('join lobby', {user: username, id: lobby.id});
      this.setState({value: ''});
    }
  }

  render() {
    const styles = require('./Lobby.scss');
    return (
      <Grid className={ styles.lobby }>
        <Row>
          <h1>Dostupne lobby</h1>
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
                  <th>Meno lobby</th>
                  <th>Obsadenost lobby</th>
                </tr>
              </thead>
              <tbody>
                { this.props.lobby.lobbyList.map((lobby, index) => {
                  return (
                    <tr
                      key={index}
                      className={ this.props.lobby.selectedLobby === index ? styles.activeLobby : ''}
                      onClick={ () => this.setSelected(index) }
                    >
                      <td>{ lobby.players.playerList[0] }</td>
                      <td>{ lobby.name }</td>
                      <td>{ lobby.players.playerList.length }/{ lobby.limit }</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <form className="login-form form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                ref="username"
                placeholder="Meno novej hry"
                value={ this.state.value }
                onChange={ (e) => this.onChange(e) }
                className="form-control"
              />
            </div>
            <Link to="/lobbyRoom">
              <Button
                bsStyle="primary"
                className={ styles.button }
                onClick={ () => this.createLobby(this.props.user.username) }
              >
                Vytvorit hru
              </Button>
            </Link>
          </form>
          <p>{ this.state.error }</p>
        </Row>
        <Row>
          <Link to="/lobbyRoom">
            <Button
              bsStyle="success"
              className={ styles.button }
              onClick={ () => this.joinLobby(this.props.user.username, this.props.lobby.selectedLobby) }
            >
              Pridat sa ku hre
            </Button>
          </Link>
        </Row>
      </Grid>
    );
  }
}