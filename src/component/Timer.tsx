import React, { FC, useEffect, useRef, useState } from 'react'
import { Player } from '../models/Players';
import { Colors } from '../models/Colors';

interface TimeProps{
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: FC<TimeProps> = ({currentPlayer, restart}) => {
    const[blackTime, setBlackTime] = useState(60)
    const[whiteTime, setWhiteTime] = useState(60)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)
    useEffect(() =>{
        startTimer()
    }, [currentPlayer])
    function startTimer(){
        if(timer.current){
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }
    function decrementBlackTimer(){
        setBlackTime(prev => {
            if (prev === 0) {
                prev = 0
                return prev;
            }
            return prev - 1;
        });    }
    function decrementWhiteTimer(){
        setWhiteTime(prev => {
            if (prev === 0) {
                prev = 0
                return prev;
            }
            return prev - 1;
        });
    }
    const handleRestart = () =>{
        setWhiteTime(60)
        setBlackTime(60)
        restart()
    }
return (
    <div>
        <div>
            <button onClick={handleRestart}>
                Restart Game
            </button>
        </div>
        <h2>Чёрные - {blackTime}</h2>
        <h2>Белые - {whiteTime}</h2>
    </div>
)
}

export default Timer