import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as GameActions from '../../redux/modules/game'

@connect(state =>
  ({}), GameActions)
export class GrillItem extends Component {

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
        <img className={ this.props.icon.available ? styles.grillIconAvailable : styles.grillIcon } src={imgSrc} onClick={ () => this.props.flipIcon(this.props.index) } />
      </span>
    )
  }
}