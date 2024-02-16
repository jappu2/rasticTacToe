import React from 'react';
import Board from './Board.js'
import './App.css'

function App() {
  const [currentTurn, setCurrentTurn] = React.useState('x');
  const [currentSet, setCurrentSet] = React.useState([
    {'index': 1, 'value': ''},
    {'index': 2, 'value': ''},
    {'index': 3, 'value': ''},
    {'index': 4, 'value': ''},
    {'index': 5, 'value': ''},
    {'index': 6, 'value': ''},
    {'index': 7, 'value': ''},
    {'index': 8, 'value': ''},
    {'index': 0, 'value': ''},
]);
  const [turns, setTurns] = React.useState(0);



  return (
    <Board 
      currentTurn={currentTurn} 
      setCurrentTurn={setCurrentTurn} 
      currentSet={currentSet} 
      setCurrentSet={setCurrentSet} 
      turns = {turns}
      setTurns = {setTurns}
    />
  );
}

export default App;
