import React, { useState } from 'react';
import Countdown from 'react-countdown';
import { Container, Button } from './styles';
import { getEnumKeys } from '../../Utils/Utils';
import { FieldTimeOutlined, CloseOutlined} from '@ant-design/icons';
const con = require('electron').remote.getGlobal('console')
enum spellTypes {
    flash = 1,
    teleport = 2,
    barrier = 3,
    heal=4,
    cleanse=5,
    ignite=6,
    exaust=7
  }

  const spellsUrl = {
    [spellTypes.flash]: 'https://vignette.wikia.nocookie.net/leagueoflegends/images/7/74/Flash.png/revision/latest?cb=20140126101240&path-prefix=pt-br',
    [spellTypes.teleport]: 'https://vignette.wikia.nocookie.net/leagueoflegends/images/3/3b/Teleporte.png/revision/latest?cb=20140126103154&path-prefix=pt-br',
    [spellTypes.ignite]: 'https://vignette.wikia.nocookie.net/leagueoflegends/images/a/af/Incendiar.png/revision/latest?cb=20140201164319&path-prefix=pt-br',
    [spellTypes.barrier]: 'https://vignette.wikia.nocookie.net/leagueoflegends/images/2/29/Barreira.png/revision/latest?cb=20140126101128&path-prefix=pt-br',
    [spellTypes.cleanse]: 'https://vignette.wikia.nocookie.net/leagueoflegends/images/9/9c/Purificar.png/revision/latest?cb=20140126101440&path-prefix=pt-br',
    [spellTypes.exaust]: 'https://vignette.wikia.nocookie.net/leagueoflegends/images/2/28/Exaust%C3%A3o.png/revision/latest?cb=20140201180114&path-prefix=pt-br',
    [spellTypes.heal]: 'https://vignette.wikia.nocookie.net/leagueoflegends/images/a/a7/Cura.png/revision/latest?cb=20140201164549&path-prefix=pt-br'
  }

interface ITiming {
  [spellTypes.flash]: boolean,
  [spellTypes.teleport]: boolean,
  [spellTypes.ignite]: boolean,
  [spellTypes.barrier]: boolean,
  [spellTypes.cleanse]: boolean,
  [spellTypes.exaust]: boolean,
  [spellTypes.heal]: boolean
}

const spellsTime = {
  [spellTypes.flash]: 300000,
  [spellTypes.teleport]: 220000,
  [spellTypes.ignite]: 180000,
  [spellTypes.barrier]: 180000,
  [spellTypes.cleanse]: 210000,
  [spellTypes.exaust]: 210000,
  [spellTypes.heal]: 240000
}


import { Select, Row } from 'antd';
const remote = require('electron').remote
const w = remote.getCurrentWindow()

enum actualLaneType {
 top = 1,
 jungle = 2,
 mid = 3,
 adc = 4,
 support = 5
}
const Greetings: React.FC = () => {
  const objEntries:any = Object.entries(spellsUrl).reduce((agg, [key, value]) => (
    {
      ...agg,
      [key]:false
    }
  ), {});
  const [timing, setTiming] = useState<ITiming>(objEntries);
  const [flashTime, setFlashTime] = useState(300000);
  const [teleportTime, setTeleportTime] = useState(240000);
  const [igniteTime, setIgniteTime] = useState(200000);

  const [actualLane, setActualLane] = useState<actualLaneType>();
  return (
    <Container>
    <Row>
    
     <select style={{
       '-webkit-app-region': 'no-drag',
       marginTop: 0,
       height: '20px',
       width: '50px',
       fontSize: '12px',
       marginBottom: '10px',
     }}>
       {getEnumKeys(actualLaneType).map((lane, index) => (
         <option key={index}>
           {actualLaneType[lane].toUpperCase()}
         </option>
       ))}
     </select>
     <Button style={{
        border: 'none',
        fontSize: '12px',
        width: '20px',
        height:'20px',
        position:'absolute',
        right: 0,
        top: 0,
        
      }}
        onClick={() => w.close()}
       ><CloseOutlined /></Button>
         </Row>
      <div>
        {Object.entries(spellsUrl).map(([key,value], index) => {
          if(timing[key]){
            return (
              <Button 
              onClick={() => setTiming({
                ...timing,
                [key]: false
              })}
             style={{
                backgroundImage: `url(${value})`,
                marginTop: '0px',
                position:'relative',
                paddingTop: '-20px',
              }}>
                {renderCountDown(Number(key), index.toString())}
              </Button>
              );
          }

          return (
            <Button onClick={() => setTiming({
              ...timing,
              [key]: true
            })} style={{
              backgroundImage: `url(${value})`,
            }} />
          )
})}
        
      <Button onClick={() => setTiming(objEntries)} style={{
        position: 'absolute'
      }}>
       <FieldTimeOutlined style={{
       fontSize: 24}}/>
      </Button>
      </div>
    </Container>
  );

  function setSwitchTypes (type:spellTypes, time:number) {
    if(type === spellTypes.flash){
      return setFlashTime(time);
    }
    if(type === spellTypes.teleport){
      return setTeleportTime(time);
    }
  }

  function getSwitchTypes (type:spellTypes) {

  if(type === spellTypes.flash){
      return flashTime;
    }
    if(type === spellTypes.ignite){
      return igniteTime;
    }
    return 0;
  }


  function renderCountDown(key:number, index?:string) {
    return <Countdown date={Date.now() + spellsTime[key]} 
    onComplete={() => setTiming({
      ...timing,
      [key]: false
    })}
    key={index}
    renderer={(props) => (
      <>
      <div style={{
        margin: 0,
        width:'25px',
        height:'25px',
        backgroundColor: '#000',
        position: 'absolute',
        textAlign:'center',
        top:0,
        left:0,
        opacity: 0.6}} />
      <p style={{
        color: '#fff',
        fontWeight: 'bolder',
        zIndex:9999,
        position: 'relative',
        opacity: 1
        
      }}>
        {props.minutes}:{props.seconds}
      </p>
      </>
    )}
    />
  }
}

export default Greetings
