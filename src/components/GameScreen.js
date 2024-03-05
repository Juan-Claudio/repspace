import React from "react";
import '../styles/dist/GameScreen.min.css'
import Draw from "../utils/Draw";

export default class GameScreen extends React.Component
{
    render()
    {
        return (
            <canvas id="gameScreen"></canvas>
        )
    }
}