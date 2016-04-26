import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as GameActions from '../../redux/modules/game'

@connect(state =>
  ({game : state.game }), GameActions)
export class PlayerStone extends Component {
  isAvailable() {
    return (+this.props.player.stones[this.props.player.stones.length-1]) !==0 &&
            (+this.props.player.stones[this.props.player.stones.length-1] === this.props.game.dices.score) &&
            !this.props.game.dices.rolled &&
            this.props.game.dices.alreadyTakenValues.includes(6) &&
            this.props.game.playerTurn !== this.props.playerID
  }

  pickPlayerStone() {
    if (this.isAvailable() ) {
      let newPlayerList = this.props.game.playerList;
      const stone = newPlayerList[this.props.playerID].stones.pop();
      newPlayerList[this.props.game.playerTurn].stones.push(stone);
      let cerv=0;
      if(stone <=24)
        cerv=1;
      else if(stone <=28)
        cerv=2;
      else if(stone <=32)
        cerv=3;
      else
        cerv=4;
      newPlayerList[this.props.game.playerTurn].score += cerv;
      newPlayerList[this.props.playerID].score -= cerv;
      const values = [0,0,0,0,0,0,0,0];
      this.props.stealStone(newPlayerList, values);
    }
  }

  render() {
    const styles = require('./Game.scss');
    return (
      <img
        src={this.props.player.stones.length
              ? require(`../../components/Grill/static/${this.props.player.stones[this.props.player.stones.length-1]}.png`)
              : require('../../components/Grill/static/empty.png')
              }
        onClick={ () => this.pickPlayerStone() }
        className={
              this.isAvailable()
              ? styles.playerStoneAvailable
              : styles.playerStone
            }
      />
    )
  }
}