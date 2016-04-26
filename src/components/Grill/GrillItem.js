import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as GameActions from '../../redux/modules/game'

@connect(state =>
  ({game : state.game }), GameActions)
export class GrillItem extends Component {
  isEnd() {
    let end = true;
    Object.keys(this.props.game.grill).forEach((key) =>
      { end= end && (!this.props.game.grill[key].active || this.props.game.grill[key].taken); }
    );
    console.log("Testujem end GrillItem ", end);
    this.props.endGame(end);
  }
  isAvailable() {
    return (+this.props.index <= this.props.game.dices.score) &&
            this.props.icon.active &&
            !this.props.icon.taken &&
            !this.props.game.dices.rolled &&
            this.props.game.dices.alreadyTakenValues.includes(6)
  }
  pickStone() {
    if(this.isAvailable()){
      let newGrill = this.props.game.grill;
      newGrill[this.props.index].taken =true;
      let newPlayerList = this.props.game.playerList;
      newPlayerList[this.props.game.playerTurn].stones.push(+this.props.index);
      let cerv=0;
      if(+this.props.index <=24)
        cerv=1;
      else if(+this.props.index <=28)
        cerv=2;
      else if(+this.props.index <=32)
        cerv=3;
      else
        cerv=4;
      newPlayerList[this.props.game.playerTurn].score += cerv;
      const values = [0,0,0,0,0,0,0,0];
      this.props.pickStone(newPlayerList, newGrill, values);
      this.isEnd();
    }
  }

  render() {
    const styles = require('./Grill.scss');
    let imgSrc;
    if( !this.props.icon.taken){
      if(this.props.icon.active){
        imgSrc=require(`./static/${this.props.index}.png`);
      }
      else
        imgSrc=require(`./static/back.png`);
    }
    else {
      imgSrc=require('./static/empty.png');
    }

    return (
      <span>
        <img
          className={ this.isAvailable()
                      ? styles.grillIconAvailable
                      : styles.grillIcon
                      }
          src={imgSrc}
          onClick={ () => this.pickStone() }
        />
      </span>
    )
  }
}