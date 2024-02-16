const Board = (props) => {
    
    let tie, winner, showScreen
    //start game
    function startNewGame() {
        props.setCurrentSet([
            {'index': 1, 'value': ''},
            {'index': 2, 'value': ''},
            {'index': 3, 'value': ''},
            {'index': 4, 'value': ''},
            {'index': 5, 'value': ''},
            {'index': 6, 'value': ''},
            {'index': 7, 'value': ''},
            {'index': 8, 'value': ''},
            {'index': 0, 'value': ''},
        ])
        console.log(props.currentSet)
        props.setCurrentTurn('x')
        props.setTurns(0)

    }
    //handle clicks
    checkForWins()
    function handleClick(id, event){
        if (event.target.classList.contains('x') || event.target.classList.contains('o')) {
            return
        }

        props.setCurrentSet(prev => prev.map(obj => {
            if (obj.index === id) return {...obj, 'value': props.currentTurn} 
            return obj
        }))
        props.setTurns(prev => prev + 1)
        props.setCurrentTurn(props.currentTurn === 'x' ? 'o' : 'x')

    }
    
    function checkForWins(){
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8], 
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        winningCombinations.forEach(
            combination => {
                if (props.currentSet[combination[0]].value !== '' && props.currentSet[combination[0]].value === props.currentSet[combination[1]].value && props.currentSet[combination[2]].value === props.currentSet[combination[1]].value) {
                    endGame(props.currentSet[combination[0]].value)
                }
            }
        )
    }

    function endGame(wnr){
        

        winner = wnr
        showScreen = true
    }
    if (props.turns === 9 && winner === undefined){
        tie = true
        showScreen = true

    }
    // restart game
    return (
        <>
        <div className={"end-game " +  (showScreen && 'show')}>
                <div className="winner">it {tie ? "was a tie!" : "is " + winner + "'s win"}</div>
                <button
                    onClick={startNewGame}
                >start a new game</button>
            </div>
        <div className={"board " + props.currentTurn} id="board">
            {
                props.currentSet.map(e => {
                    if(e.value === 'x' || e.value === 'o'){
                        return (
                            <div 
                                className={"cell " + e.value} 
                                key={e.index}
                            >
                            </div>
                        )
                    }
                    return (<div 
                        className={"cell"} 
                        key={e.index}
                        onClick={(event) => handleClick(e.index, event)}
                    >
                    </div>)
                })
            }
        </div>
        </>
    )
}

export default Board