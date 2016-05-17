import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dice } from './Dice';
import * as GameActions from '../../redux/modules/game'


@connect(
  state => ({dices: state.game.dices,
             user : state.auth.user}), GameActions
  )
export class Dices extends Component {
  render() {
    console.log("idem posielat update ako ", this.props.user.username);
    const styles = require('./Dices.scss');
    const dices=this.props.dices.values.map( (value,index) => <Dice key={index} value={value}/> );
    return (this.props.user &&
      <div className={ styles.dices }>
        { dices }
        { !this.props.dices.rolled && !this.props.end ? <div className={ styles.button } onClick={() => {if(socket)socket.emit('roll dice', this.props.user.username)}}>Roll</div> : '' }
      </div>
    )
  }
}