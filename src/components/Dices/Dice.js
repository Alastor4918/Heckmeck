import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as GameActions from '../../redux/modules/game'

@connect(
  state => ({game: state.game}), GameActions
  )
export class Dice extends Component {
  pickNumber() {
    console.log("Idem pickovat ", this.props);
    if(this.props.game.dices.rolled && !this.props.game.dices.alreadyTakenValues.includes(this.props.value)){
      let numberOfDices=0;
      for(let x=0;x < this.props.game.dices.values.length;x++) {
        if(this.props.game.dices.values[x] === this.props.value){
          numberOfDices+=1;
        }
      }
      const remaining = this.props.game.dices.remaining - numberOfDices;
      let sum;
      if(this.props.value === 6 )
        sum = numberOfDices*5;
      else
        sum = numberOfDices*this.props.value;

      let newScore = this.props.game.dices.score;
      newScore += sum;

      let newDices =[];
      for(let i=0;i<remaining;i++){
        newDices.push(0);
      }

      const taken = this.props.game.dices.alreadyTakenValues;
      taken.push(this.props.value);

      this.props.pickDice(remaining, newScore, newDices, taken);
    }
  }
  render() {
    const imgSrc = require(`./static/${this.props.value}.png`);
    const styles = require('./Dices.scss');

    return (
      <span className="dice">
        <img className={ styles.dice } onClick={() => this.pickNumber()} src={imgSrc}/>
      </span>
    )
  }
}