import React from "react";
import '../styles/dist/Controls.min.css'

const nameToSymbol = {
    start:"start",
    move: "move",
    menu: '☰',
    left: '←',
    right: '→',
    top: '↑',
    bottom: '↓',
    turnLeft: '⟲',
    turnRight: '⟳',
    removeAll: '✗',
    remove1: '✗¹'
}

export default class Controls extends React.Component
{    
    constructor(props)
    {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(btnId)
    {
        switch(btnId)
        {
            case 'start':
                console.log("start...");break;
            case 'move': this.props.addMove('move');break;
            case 'left': this.props.addMove('←');break;
            case 'right': this.props.addMove('→');break;
            case 'top': this.props.addMove('↑');break;
            case 'bottom': this.props.addMove('↓');break;
            case 'turnLeft': this.props.addMove('⟲');break;
            case 'turnRight': this.props.addMove('⟳');break;
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
                                {nameToSymbol[name]}
                            </button>
                        )
                    })
                }
            </div>
        )
    }
}