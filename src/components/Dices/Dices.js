import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dice } from './Dice';
import * as GameActions from '../../redux/modules/game'


@connect(
  state => ({dices: state.game.dices}), GameActions
  )
export class Dices extends Component {
  roll(){
    if(!this.props.dices.rolled){
      let values=[];
      for(let i=0;i<this.props.dices.remaining;i++){
        values.push(Math.floor(Math.random() * 6) + 1);
      }
      this.props.rollDices(values);
    }
  }
  render() {
    const styles = require('./Dices.scss');
    const dices=this.props.dices.values.map( (value,index) => <Dice key={index} value={value}/> );
    return (
      <div className={ styles.dices }>
        { dices }
        <div className={ styles.button } onClick={() => this.roll()}>Roll</div>
      </div>
    )
  }
}