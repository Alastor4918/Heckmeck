import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Grill } from '../../components/Grill/Grill';
import { Dices } from '../../components/Dices/Dices';
import { PlayerStone } from './PlayerStone';
import { EndModal } from '../../components/EndModal/EndModal';
import * as GameActions from '../../redux/modules/game'


@connect(state =>
  ({game : state.game,
    user : state.auth.user}), GameActions)
export default class Game extends Component {

  componentDidMount() {
    if (socket) {
      socket.on('update state', (state) => {
        console.log("Idem updatovat state", state);
        this.props.updateState(state);
      });
      if(this.props.user){
        socket.emit('game started', this.props.user.username);
      }
    }
  }

  componentWillUnmount() {
    if (socket) {
      socket.removeListener('update state');
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

    return (this.props.user &&
      <div className={ `${styles.game} + 'container text-center'`}>
        <Helmet title="Hackmeck"/>
        <h1 className="text-center"> Na tahu je hrac : {this.props.game.playerList[this.props.game.playerTurn].name} </h1>
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
          <button
            onClick={() => {
              if(socket){
                console.log("idem emitit konec kola");
                socket.emit('end turn', this.props.user.username);
              }
            }}
            className={styles.endTurnButton}
          >
            End Turn
          </button>
        </div>
        <EndModal/>
      </div>
    );
  }
}
