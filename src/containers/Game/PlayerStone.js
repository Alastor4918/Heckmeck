import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as GameActions from '../../redux/modules/game'

@connect(state =>
  ({game : state.game,
    user : state.auth.user}), GameActions)
export class PlayerStone extends Component {
  isAvailable() {
    return  this.props.player.stones.length !==0 &&
            (+this.props.player.stones[this.props.player.stones.length-1] === this.props.game.dices.score) &&
            !this.props.game.dices.rolled &&
            this.props.game.dices.alreadyTakenValues.includes(6) &&
            this.props.game.playerTurn !== this.props.playerID
  }

  render() {
    const styles = require('./Game.scss');
    return (
      <img
        src={this.props.player.stones.length
              ? require(`../../components/Grill/static/${this.props.player.stones[this.props.player.stones.length-1]}.png`)
              : require('../../components/Grill/static/empty.png')
              }
        onClick={ () => {if(socket)socket.emit('pick player stone', {user: this.props.user.username, id: this.props.playerID})} }
        className={
              this.isAvailable()
              ? styles.playerStoneAvailable
              : styles.playerStone
            }
      />
    )
  }
}