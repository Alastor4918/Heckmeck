import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Grill } from '../../components/Grill/Grill';
import { Dices } from '../../components/Dices/Dices';
import { PlayerStone } from './PlayerStone';
import { EndModal } from '../../components/EndModal/EndModal';
import * as GameActions from '../../redux/modules/game'


@connect(state =>
  ({game : state.game }), GameActions)
export default class Game extends Component {
  isEnd() {
    let end = true;
    Object.keys(this.props.game.grill).forEach((key) =>
      { end= end && (!this.props.game.grill[key].active || this.props.game.grill[key].taken); }
    );
    this.props.endGame(end);
  }
  endTurn(end){
    if(!end) {
      let newGrill = this.props.game.grill;
      let newPlayerList = this.props.game.playerList;
      if (newPlayerList[this.props.game.playerTurn].stones.length) {
        let stone = newPlayerList[this.props.game.playerTurn].stones.pop();
        newGrill[stone].taken = false;
        if (+stone !== 36) {
          for (let index = 36; index >= 21; index--) {
            if (!newGrill[index].taken && newGrill[index].active) {
              newGrill[index].active = false;
              break;
            }
          }
        }

        let score = 0;
        if (stone <= 24)
          score = 1;
        else if (stone <= 28)
          score = 2;
        else if (stone <= 32)
          score = 3;
        else
          score = 4;

        newPlayerList[this.props.game.playerTurn].score -= score;
      }
      const values = [0, 0, 0, 0, 0, 0, 0, 0];
      this.props.pickStone(newPlayerList, newGrill, values);
      this.isEnd();
    }
  }

  render() {
    const styles = require('./Game.scss');

    let taken=[];
    this.props.game.dices.alreadyTakenValues.map((value, index) => {
      let imgSrc = require(`../../components/Dices/static/${value}.png`);
      taken.push(
        <img key={ index } className={ styles.dice } src={imgSrc}/>
      )
    });

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
                <PlayerStone player={ player } playerID={ index } />
                <div className={styles.score}>Score: {player.score}</div>
                <div className={ styles.takenDices }>
                  { index == this.props.game.playerTurn
                    ? taken
                    : ''
                  }
                </div>
              </div>
            )
          }
        )
        }
        <Grill/>
        <Dices end={this.props.game.endGame }/>
        <div className={`text-center ${styles.endTurn}`}>
          <button onClick={() => this.endTurn(this.props.game.endGame)} className={styles.endTurnButton}>
            End Turn
          </button>
        </div>
        <EndModal/>
      </div>
    );
  }
}
