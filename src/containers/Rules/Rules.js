import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class Rules extends Component {
  render(){
    return(
      <div className="rules container">
        <Helmet title="Rules"/>
        <h1 className="text-center">
          HECKMECK ( officialne pravidla )
        </h1>
        <h3 className="headline">
          Jednoduchá kocková hra pre 2-6 hravých vtákov, ktorí zacítili pečené červíky.
        </h3>
        <p className="desciption">
          Pečené červíky majú vynikajúci kurz. Za jedno je to tým, že červíky sú naozaj
          obľúbeným jedlom každého operenca. Obľúbenosť pečených červíkov má
          však na svedomí predovšetkým kohút Harald. Sam, jeho strýko
          z Chickentownu v Kentucky , ho priviedol na myšlienku zriadiť na každom
          rohu stánky s pečenými červíkami. Od otvorenia prvého stánku mu blahorečia
          všetci operenci a Harald z toho má nemalý zisk. Na každom dvore
          vyhrabávajú sliepky červíky zo zeme a zasielajú ich do siete Haraldovych
          stánkov. Je jedno či je to červík v curry-omáčke, grilovaný červík, či
          frankfurktský červíček: operenci celého sveta na ne letia dodnes. Pre Haralda
          ale platí stále iba jedno heslo: Od lovca červíkov k milionárovi.
        </p>

        <h3>
          Hracia plocha
        </h3>
        <p className="description">
          16 porcií pečených červíkov s hodnotami 21 – 36
          <br/>
          8 kociek so 6 symbolmi (červík a čísla od 1 do 5)
        </p>

        <h3>
          Cieľ hry
        </h3>
        <p className="description">
          Vyhráva vták, ktorý má na konci hry najviac pečených červíkov v pazúroch.
        </p>

        <h3>
          Priebeh hry
        </h3>
        <p className="description">
          Hráč, ktorý je na ťahu, sa snaží
          získať porciu pečených červíkov z grilu alebo od súpera. S týmto cieľom hodí
          na začiatku ťahu všetkými ôsmymi kockami. Zo svojho hodu si vyberie všetky
          kocky s jedným symbolom (číslo alebo červík) a uloží ich pre seba.
          Následne smie urobiť ďalšie hody. Pre ďalšie hody používa iba kocky, ktoré
          ešte v predchádzajúcich hodoch neodložil pred seba. Pri každom hode vždy
          musí odložiť všetky kocky s niektorým symbolom. Nesmie však odkladať
          symboly, ktoré už odložil v niektorom z predchádzajúcich hodov. Symboly na
          odložených kockách ihneď spočítava. Aj červík má hodnotu, konkrétne 5.
        </p>

        <h3>
          Získanie porcie pečených červíkov
        </h3>
        <p className="description">
          Ak hráč pred sebou odložil všetkých 8 kociek alebo všetkých 6 symbolov,
          každopádne končí jeho ťah. Hráč však smie svoj ťah ukončiť aj skôr. To má
          zmysel iba vtedy, keď odloženými koncami už získa porciu pečených
          červíkov.
          Ak odložené kocky obsahujú aspoň jedného červíka a súčasne je ich hodnota
          rovná alebo vyššia ako hodnota niektorej porcie pečených červíkov v strede
          stola, alebo je rovná hodnote porcie, ktorú má spoluhráč na vrchu svojho
          stĺpčeka. Z grilu je možné vziať porciu s hodnotou nahádzanou v ťahu alebo
          hodnotou nižšou ako je nahádzaná. Ak chce hráč prevziať porciu od
          spoluhráča musí sa hodnota porcie zhodovať s nahádzanou hodnotou.
        </p>

        <h3>
          Branie porcie pečených červíkov
        </h3>
        <p className="description">
          Ten, kto získa porciu červíkov, položí ju otvorene pred seba. Každú práve
          získanú porciu
          pritom položí na stĺpček už skôr získaných porcií. To znamená, že pred
          každým hráčom leží otvorene vždy najviac jedna porcia pečených červíkov.
          Presne túto mu môže spoluhráč preberať. Spodné porcie sú ňou chránené.
        </p>

        <h3>
          Neúspešné ťahy
        </h3>
        <div className="description">
          <ul>
            <li>
              Ťah končí neúspešne, ak hráč pri hode hodil iba symboly, ktoré už má
              pred sebou odložené. Tým sa ťah hráča skončil.
            </li>
            <li>
              Ťah končí neúspešne, ak sa na konci hádzania medzi odloženými
              symbolmi nenachádza žiaden červík.
            </li>
            <li>
              Ťah končí neúspešne, ak na konci hádzania odložené kocky nedosahujú
              takú hodnotu, aby hráč získal porciu červíkov
            </li>
          </ul>
          Ten, kto spôsobí neúspešný ťah, nedostane žiadnu porciu červíkov. Namiesto
          toho musí dokonca odovzdať svoju otvorene vyloženú (vrchnú zo stĺpika)
          porciu červíkov – teda ak nejakú má. Na ťah sa dostane ďalší hráč.
        </div>

        <h3>
          Odovzdanie porcie pečených červíkov
        </h3>
        <p className="description">
          Hráč, ktorý musí odovzdať porciu, ju zaradí medzi zvyšné porcie na gril
          v strede stola. Následne na grile prevráti (aby neboli viditeľná hodnota
          a červíky) porciu s najvyššou hodnotou. Túto porciu už nikto počas hry
          nemôže získať. Porcia ostane prevrátená na grile.
          Ak hráč vrátil porciu s najvyššou hodnotou, žiadna sa neprevráti.
        </p>

        <h3>
          Koniec hry a vyhodnotenie
        </h3>
        <p className="description">
          Hra končí, ak na grile už neleží žiadna porcia pečených červíkov.
          Každému hráčovi sa spočíta počet červíkov na jeho porciách. Kto má najviac červíkov,
          vyhral. Pri rovnosti počtu červíkov vyhral hráč s vyššou hodnotou svojej
          najhodnotnejšej porcie.
        </p>
      </div>
    )
  }
}