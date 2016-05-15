import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as GameActions from '../../redux/modules/game'

@connect(state =>
  ({game : state.game,
    user : state.auth.user}), GameActions)
export class GrillItem extends Component {
  isAvailable() {
    return (+this.props.index <= this.props.game.dices.score) &&
            this.props.icon.active &&
            !this.props.icon.taken &&
            !this.props.game.dices.rolled &&
            this.props.game.dices.alreadyTakenValues.includes(6)
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
          onClick={ () => { if(socket)socket.emit('pick stone', {user: this.props.user.username, value: this.props.index}) } }
        />
      </span>
    )
  }
}