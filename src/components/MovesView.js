import React from "react";
import '../styles/dist/MovesView.min.css'
import Run from "../utils/Run";

export default class MovesView extends React.Component
{
    render()
    {
        const moveCounter = []
        this.props.moves.forEach((element, idx, arr) => {
            if(idx===0 || element !== arr[idx-1])
            {
                moveCounter.push([element,1])
            }
            else if(element === arr[idx-1])
            {
                let last = moveCounter.pop()
                last[1]++
                moveCounter.push(last)
            }
        });
        return (
            <div className="MovesView-container">
                {moveCounter.map((move, idx)=>{
                    if(move[1] === 1)
                    {
                        return (<p key={idx} className="MovesView-move">{Run.nameToSymbol[move[0]]}</p>)
                    }
                    else
                    {
                        return (<p key={idx} className="MovesView-move">{Run.nameToSymbol[move[0]]}<sup>{move[1]}</sup></p>)
                    }
                })}
            </div>
        )
    }
}