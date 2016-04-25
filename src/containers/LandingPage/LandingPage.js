import React, { Component } from 'react';
import { Link } from 'react-router';
import config from '../../config';
import Helmet from 'react-helmet';

export default class LandingPage extends Component {
  render() {
    const styles = require('./Landing.scss');
    // require the logo image both from client and server
    const logoImage = require('./static/heckmeck.png');
    const mainImg = require('./static/back.png');
    const cucak = require('./static/cucak.png');
    const skrtic = require('./static/skrtic.png');
    return (
      <div className={ `${styles.landing} + 'container text-center'`}>
        <Helmet title="Landing"/>
        <h1 className="text-center"> Vitajte </h1>
        <p className={`${styles.description} text-justify`}>
          Extrémne zábavná kocková hra pre 2-6 hráčov - sliepok, ktorí majú radi grilované červíky. Hra pre celú rodinu či partiu kamarátov. Hra v ktorej sa všetko rýchlo mení a nič v nej nie je isté. Zvíťazí ten hráč, ktorému sa podarí ukoristiť najviac grilovaných červíkov. Tých získavate z hodov kociek - hádžete dokedy chcete, ale okrem šťastia treba aj rozumný odhad, kedy máte dosť. Inak prídete o všetko nahádzané a na grile sa červíci pripečú. Dávajte si pozor aj na súperov, ani červíky, ktoré raz získate, nie sú úplne v bezpečí.
        </p>
        <div className="text-center">
          <span className={styles.image}>
            <img src={ cucak } />
          </span>
          <span className={styles.logo}>
            <img  src={ logoImage } />
          </span>
          <span className={styles.image}>
            <img src={ skrtic } />
          </span>
        </div>
        <div className={`text-center ${styles.button}`}>
          <span>
            <Link to="/game">PLAY NOW</Link>
          </span>
        </div>
        <div className={`${styles['main-img']} text-center`}>
          <img  src={ mainImg } />
        </div>
      </div>
    );
  }
}
