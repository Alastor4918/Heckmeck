import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Grill } from '../../components/Grill/Grill';
import { Dices } from '../../components/Dices/Dices';


@connect(
  state => ({game: state.game})
  )
export default class Game extends Component {
  render() {
    console.log("WTF", this.props);
    const styles = require('./Game.scss');
    // require the logo image both from client and server

    return (
      <div className={ `${styles.game} + 'container text-center'`}>
        <Helmet title="Hackmeck"/>
        <h1 className="text-center"> Na tahu je hrac cislo: {this.props.game.playerTurn} </h1>
        <h3 className="text-center">Aktualne ma nahadzanych {this.props.game.dices.score} bodov.</h3>
        {this.props.game.playerList.map((player, index) =>
          {
            return(
              <div key={index} className={styles[`player-${index}`]}>
                <h1>{player.name}</h1>
                <img
                  src={player.stones.length
                        ? require(`../../components/Grill/static/${player.stones[player.stones.length-1]}.png`)
                        : require('../../components/Grill/static/empty.png')
                        }
                  className={ styles.playerStone }
                />
                <div className={styles.score}>{player.score}</div>
              </div>
            )
          }
        )
        }
        <Grill/>
        <Dices/>
      </div>
    );
  }
}
