import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Modal } from 'react-bootstrap';

@connect(
  state => ({game: state.game,
             user : state.auth.user})
  )
export class EndModal extends Component {
  render() {
    const styles = require('./EndModal.scss');
    let winnerName='';
    let winnerScore=0;
    this.props.game.playerList.map((player) => {
      if(player.score > winnerScore){
        winnerScore=player.score;
        winnerName=player.name;
      }
    });
    return (
      <Modal
        show ={ this.props.game.endGame }
        className={ styles.endModal }
      >
        <Modal.Header className="text-center">
          End Game !
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className={styles.winner}>
            And the winner is { winnerName } with score { winnerScore }.
          </div>
          <div>
            Do you want to play <Link to="/game"><span onClick={()=>{if(socket)socket.emit('restart game', this.props.user.username)}}>again</span></Link> ?
            <br/>
            Or would you rather get back to <Link to="/">Home page</Link> ?
          </div>
        </Modal.Body>

      </Modal>
    )
  }
}