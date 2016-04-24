import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GrillItem } from './GrillItem';


@connect(
  state => ({grill: state.game.grill})
  )
export class Grill extends Component {
  render() {
    console.log("Grill", this.props);
    const styles = require('./Grill.scss');
    let grill = [];
    Object.keys(this.props.grill).forEach((key, index) => grill.push(<GrillItem key={index} index={key} icon={this.props.grill[key]} />) );

    return (
      <div className={styles.grill}>
        { grill }
      </div>
    );
  }
}
