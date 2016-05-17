import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as GameActions from '../../redux/modules/game'

@connect(
  state => ({game: state.game,
             user : state.auth.user }), GameActions
  )
export class Dice extends Component {
  render() {
    const imgSrc = require(`./static/${this.props.value}.png`);
    const styles = require('./Dices.scss');

    return ( this.props.user &&
      <span className="dice">
        <img
          className={ styles.dice }
          onClick={() => {
                if(socket)
                  socket.emit('pick dice', {user: this.props.user.username, value:this.props.value})
                }
              }
          src={imgSrc}
        />
      </span>
    )
  }
}