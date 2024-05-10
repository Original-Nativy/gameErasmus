import React, { useEffect, useState } from 'react';
import logo from './eu.png';
import Timer  from './components/Timerko';
import './App.css';
import { questions }  from './question/questions';
import 'bootstrap/dist/css/bootstrap.min.css';
import  CustomInput  from './components/CustomInput';
import {
  Card, CardHeader, CardBody, NavLink, Button,
  ButtonGroup,
} from 'reactstrap';

function App() {
  //random function to choose number from one to 10
  const randomNumberList = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const onetoTen = [1,2,3,4,5,6,7,8,9,10]

  const [
    playersNumber,
    setPlayersNumber
  ] = useState<number | null>(null);
  const [
    listOfNumbers,
    setListOfNumbers
  ] = useState<number[]>([]);

  const counter = (number: number) => {
    setNumber(number + 1);
    return number + 1;
  }

  const [
    skip,
    setSkip
  ] = useState<{ skip: boolean }[]>([]);

  const [
    currentPlayer,
    setCurrentPlayer
  ] = useState<number | null>(null);

  const [
    number,
    setNumber
  ] = useState<number | null>(null);

  useEffect(() => {
    setNumber(0);
    const numbers = Array.from({ length: questions.length  }, (_, i) => i);
    const numberList = randomNumberList(numbers);
    console.log(numberList);
    setListOfNumbers(numberList);
    setCurrentPlayer(1);
  }, []);

  useEffect(() => {
    if (playersNumber && !skip.length){
      setSkip(Array(playersNumber).fill(false));}
    }, [playersNumber]);


  return (
    <div className="App">
      <header className="App-header">

      {playersNumber === null &&
      <CustomInput name={'players'}
        label={'Number of players'}
        type={'select'}
        placeholder={'Type here'}
        value={onetoTen[0] }
        options={onetoTen.map((number) => ({name: number.toString(), value: number}))}
        onChange={(value) => setPlayersNumber(value)}
      />}
        {(number || number === 0) && playersNumber &&
        <>
          <span>{questions[number]}</span>
        <ButtonGroup>
        <Button
          color='success'
          onClick={() => {
            setNumber(listOfNumbers[counter(number)]);
            setCurrentPlayer(prevValue => prevValue !== null ? (prevValue % playersNumber) + 1 : null);
            console.log(currentPlayer);
          }}
        >
          Next question
        </Button>
          {currentPlayer &&
          <Button
            color={skip[currentPlayer] ? 'danger' : 'warning'}
            onClick={() => {
              setNumber(listOfNumbers[counter(number)]);
              setSkip(skip.map((value, index) => index === currentPlayer ? { skip: true } : value));
            }}

            disabled={Boolean(skip[currentPlayer])}
          >
            skip question
          </Button>
        }
        </ButtonGroup>
        <ButtonGroup>
        {onetoTen.filter(player => player < playersNumber + 1).map(player => (
          <Button key={player}
          onClick={() => setCurrentPlayer(player)}
          color={player === currentPlayer ? 'primary' : 'secondary'}
          >
            Player {player}
          </Button>
        ))}
      </ButtonGroup>
      <Timer></Timer>
        </>
      }
        <img src={logo} className="App-logo" alt="logo" />
        </header>
    </div>
  );
}

export default App;


