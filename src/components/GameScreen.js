import React from "react";
import '../styles/dist/GameScreen.min.css'
import Draw from "../utils/Draw";

export default class GameScreen extends React.Component
{
    draw = new Draw()

    drawLevel()
    {
        const heroInfo = [ this.props.hero[0] ].concat(
            this.props.currPosition,
            this.props.currOrientation
        )
        
        this.draw.setCanvasById('gameScreen')       
        this.draw.map(
            this.props.coorSystem,
            this.props.background,
            heroInfo,
            this.props.drawingMap
        )
    }

    componentDidMount()
    {
        this.drawLevel()
    }

    componentDidUpdate()
    {
        this.drawLevel()
    }
    
    render()
    {
        return (
            <div className="GameScreen-container">
                <p>Your screen is too small to play this game sorry.</p>
                <canvas id="gameScreen" width="864" height="448"></canvas>
            </div>
        )
    }
}