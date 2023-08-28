import React, { useEffect, useState } from 'react'
import './App.css'
import BoardComponent from './component/BoardComponent'
import { Board } from './models/Board'
import { Colors } from './models/Colors'
import { Player } from './models/Players'
import LostFigures from './component/LostFigures'
import Timer from './component/Timer'
const App = () => {
    const[board, setBoard] = useState(new Board())
    const[whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    const[blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const[currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
    useEffect(() => {
        restart()
        setCurrentPlayer(whitePlayer)
    }, [])

    function restart() {
        const newBoard = new Board();
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard)
    }

    function swapPlayer(){
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

    const [word] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'])
    const [num] = useState(['1', '2', '3', '4', '5', '6', '7', '8'])

return (
    <div className='app'>
        <Timer restart={restart} currentPlayer={currentPlayer} />
        <div>
            <div>
                <BoardComponent board={board} setBoard={setBoard} currentPlayer={currentPlayer} swapPlayer={swapPlayer} />
                <div className="word">
                    {
                        word.map((item, index) => {
                            return <p>{item}</p>
                        }
                    )}
                </div>
            </div>
        </div>
        <div className='num'>
        {
            num.map((item, index) => {
                return <p>{item}</p>
            }
        )}
        </div>
        <div>
            <LostFigures title='Чёрные фигуры' figures={board.lostBlackFigures} />
            <LostFigures title='Белые фигуры' figures={board.lostWhiteFigures} />
        </div>
    </div>
)
}

export default App