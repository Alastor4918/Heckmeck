import React, { Component } from 'react';

export class Dice extends Component {
  render() {
    const imgSrc = require(`./static/${this.props.value}.png`);
    const styles = require('./Dices.scss');

    return (
      <span className="dice">
        <img className={ styles.dice } src={imgSrc}/>
      </span>
    )
  }
}