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
        <div className={`text-center ${styles.logo}`}>
          <span>
            <img  src={ logoImage } />
          </span>
        </div>
        <h3 className="text-center">
          Online board game Heckmeck !
        </h3>
        <div className={styles.text}>
          <p className={`${styles.description} text-justify`}>
            Extrémne zábavná kocková hra pre 2-6 hráčov - sliepok, ktorí majú radi grilované červíky. Hra pre celú rodinu či partiu kamarátov. Hra v ktorej sa všetko rýchlo mení a nič v nej nie je isté. Zvíťazí ten hráč, ktorému sa podarí ukoristiť najviac grilovaných červíkov. Tých získavate z hodov kociek - hádžete dokedy chcete, ale okrem šťastia treba aj rozumný odhad, kedy máte dosť. Inak prídete o všetko nahádzané a na grile sa červíci pripečú. Dávajte si pozor aj na súperov, ani červíky, ktoré raz získate, nie sú úplne v bezpečí.
          </p>
        </div>
        <div className={styles.vtaky}>
          <img src={ mainImg } />
        </div>
        <span className={styles.image1}>
          <img src={ cucak } />
        </span>
        <span className={styles.button}>
          <Link to="/game">PLAY NOW</Link>
        </span>
        <span className={styles.image2}>
          <img src={ skrtic } />
        </span>
      </div>
    );
  }
}
