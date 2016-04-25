import React, { Component } from 'react';

export class Footer extends Component {
  render(){
    const styles = require('./Footer.scss');
    return (
      <div className={styles.footer}>
        Nice footer ! :)
      </div>
    )
  }
}