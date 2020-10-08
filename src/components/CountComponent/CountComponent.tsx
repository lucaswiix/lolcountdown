import React from 'react';
import Countdown, { CountdownApi } from 'react-countdown';
import { useState } from 'react';
import { Button } from '../Greetings/styles';
import * as dateFns from 'date-fns';
const con = require('electron').remote.getGlobal('console')
enum spellTypes { 
    flash = 1,
    teleport =2,
    exaust =3 
}
const spellTimes = { 
    [spellTypes.flash]: 300000,
    [spellTypes.teleport]: 240000
}

const CountComponent: React.FC = () => {
    const [flashApi, setFlashApi] = useState<CountdownApi | null>(null);
    const [teleportApi, setTeleportApi] = useState<CountdownApi | null>(null);


    const [flashTime, setFlashTime] = useState(dateFns.addSeconds(Date.now(), 300).getTime());

   function spellRef (countdown: Countdown | null, type:spellTypes): void {
        if (countdown) {
            if(type === spellTypes.flash){

               return setFlashApi(countdown.getApi());
            }
            if(type === spellTypes.teleport){
                return setTeleportApi(countdown.getApi());

            }
        }
      };
    
     function handleStartSpell(type: spellTypes){
         if(type === spellTypes.flash){
             return flashApi && flashApi.start();
         }
         if(type === spellTypes.teleport){
             return teleportApi && teleportApi.start();
         }
      }

      function handleResetSpell(type: spellTypes){
        if(type === spellTypes.flash){
             
            flashApi?.pause();
            return setFlashTime(dateFns.addMilliseconds(new Date(), 300000).getTime());
        }
        if(type === spellTypes.teleport){
            return teleportApi && teleportApi.pause();
        }
     }

  return(
      <>
      <div>
          <p>Flash</p>
     
    <Countdown
    key={spellTypes.flash}
    ref={(e) => spellRef(e, spellTypes.flash)}
    date={flashTime}
    autoStart={false}
  />
  
    <button
      type="button"
      onClick={() => handleStartSpell(spellTypes.flash)}
      style={{
          cursor: 'pointer'
      }}
    >
      Start
    </button>
    <Button
      type="button"
      onClick={() => handleResetSpell(spellTypes.flash)}
      style={{
          cursor: 'pointer'
      }}
    >
      Reset
    </Button>
    </div>

    <div>
          <p>Teleport</p>
     
    <Countdown
    key={spellTypes.teleport}
    ref={(e) => spellRef(e, spellTypes.teleport)}
    date={Date.now() + spellTimes[spellTypes.teleport]}
    autoStart={false}
  />
  
    <button
      type="button"
      onClick={() => handleStartSpell(spellTypes.teleport)}
      style={{
          cursor: 'pointer'
      }}
    >
      Start
    </button>
    <button
      type="button"
      onClick={() => handleResetSpell(spellTypes.flash)}
      style={{
          cursor: 'pointer'
      }}
    >
      Reset
    </button>
    </div>
    </>
  );
}

export default CountComponent;