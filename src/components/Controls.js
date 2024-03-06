import React from "react";
import '../styles/dist/Controls.min.css'
import Run from "../utils/Run";

export default class Controls extends React.Component
{    
    constructor(props)
    {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.runMoves = this.runMoves.bind(this)
    }

    runMoves()
    {
        //1)start & define array of moves
        const moves = this.props.moves
        //2)if no moves, no run
        if(moves.length === 0){ return }

        //define block code and var/const needed in the loop
        const [WRONG_WAY, WIN, COLLISION] = ['WRONG_WAY', 'WIN', 'COLLISION']
        const endMoves = (status, interval) =>
        //loop exit block ↓
        {
            clearInterval(interval)
            
            //clear moves array
            this.props.removeAllMoves()

            switch(status)
            {
                case WRONG_WAY:
                    alert('We will not finish on the correct cell: retry ;-)')
                    this.props.resetLevel()
                    break;
                case WIN:
                    alert('YOU WIN');
                    this.props.nextLevel()
                    if(this.props.isWin === true)
                    {
                        alert('GAME OVER: YOU WIN!')
                        this.props.resetGame()
                    }
                    break;
                case COLLISION:
                    alert('Outch collision: retry ;-)')
                    this.props.resetLevel()
                    break;
                default:
                    throw new Error('status invalid (given: '+status+')')
            }
        }
        const lastIdx = moves.length-1
        let i = 0;
        
        //3)interval to watch hero moving
        const movesInterval = setInterval(()=>{
            
            //4)convert move to next position
            const nextPosition = Run.nextPosition(moves[i], this.props.currPosition)
            const nextOrientation = Run.nextOrientation(moves[i], this.props.currOrientation)
            console.log('next position/or', nextPosition, nextOrientation)
            //5)Is next position collision?
            //all x which is collision in y coor of hero position
            const yCollisionsInRow = this.props.collisionMap[nextPosition[1]]
            //loops through y_i
            for(let x of yCollisionsInRow)
            {
                if(Run.isInto(x, nextPosition[0]))
                {
                    console.log('collision!')
                    endMoves(COLLISION, movesInterval)
                    return;
                }
            }
            console.log('no collision')

            //6)change curr position and redraw
            this.props.moveHero(nextPosition, nextOrientation)
            console.log('change curr pos')

            //7)is last move of moves array?
            if(i===lastIdx)
            {
                console.log('last move')
                //is hero on destination cell
                if( nextPosition[0]===this.props.endPosition[0] &&
                    nextPosition[1]===this.props.endPosition[1]
                ){ endMoves(WIN, movesInterval);return;}
                else{ endMoves(WRONG_WAY, movesInterval);return; }
            }
            else{ i++ }

        }, 600)
    }

    handleClick(btnId)
    {
        switch(btnId)
        {
            case 'start':
                this.runMoves();break;
            case 'move': this.props.addMove('move');break;
            case 'left': this.props.addMove('left');break;
            case 'right': this.props.addMove('right');break;
            case 'top': this.props.addMove('top');break;
            case 'bottom': this.props.addMove('bottom');break;
            case 'turnLeft': this.props.addMove('turnLeft');break;
            case 'turnRight': this.props.addMove('turnRight');break;
            case 'removeAll': this.props.removeAllMoves();break;
            case 'remove1': this.props.popMove();break;
            default: console.log("unknown btn");break;
        }
    }
    
    componentDidMount()
    {
        const controlbtns = Array.from( document.querySelectorAll(".Controls-btn") )
        controlbtns.forEach(btn => {
            btn.addEventListener(
                'click',
                ()=>{ this.handleClick(btn.id.replace('control_','')) }
            )
        })
    }

    componentWillUnmount()
    {
        const controlbtns = Array.from( document.querySelectorAll(".Controls-btn") )
        controlbtns.forEach(btn => {
            btn.removeEventListener(
                'click',
                ()=>{ this.handleClick(btn.id.replace('control_','')) }
            )
        })
    }
    
    render()
    {
        const permanentBtns = ['menu','start','remove1','removeAll']
        const allBtns = [].concat(permanentBtns, this.props.controlsAvailable)
        return (
            <div className="Controls-container">
                <p className="Controls-level_info">
                    level<br />
                    {this.props.level}
                </p>
                {
                    allBtns.map((name, idx) => {
                        return (
                            <button key={idx} id={"control_"+name} 
                                className="Controls-btn" title={name}
                            >
                                {Run.nameToSymbol[name]}
                            </button>
                        )
                    })
                }
            </div>
        )
    }
}