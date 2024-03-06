export default class Game
{
    static nameToSymbol = {
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
    static symbolToName = {
        start:"start",
        move: "move",
        '☰': "menu",
        '←': "left",
        '→': "right",
        '↑': "top",
        '↓': "bottom",
        '⟲': "turnLeft",
        '⟳': "turnRight",
        '✗': "removeAll",
        '✗¹': "remove1"
    }
    static nextPosition(move, heroPos)
    {
        switch(move)
        {
            case 'left': heroPos[0]--; break;
            case 'right': heroPos[0]++; break;
            case 'top': heroPos[1]--; break;
            case 'bottom': heroPos[1]++; break;
            case 'turnLeft': 
            case 'turnRight': break;
            default: break;
        }
        return heroPos;
    }

    static nextOrientation(move, heroOrientation)
    {
        const orientations = ['left', 'top', 'right','bottom'];
        let orientationIdx = orientations.indexOf(heroOrientation)
        switch(move)
        {
            case 'left': 
            case 'right':
            case 'top': 
            case 'bottom': return move
            case 'turnLeft': orientationIdx = (orientationIdx+1)%4; break;
            case 'turnRight': orientationIdx = (orientationIdx+3)%4; break;
            default: break;
        }
        return orientations[orientationIdx];
    }

    static isInto(interval, number)
    {
        if(/:/.test(interval))
        {
            const [min, max] = interval.split(':').map((x)=>{return parseInt(x)})
            if(parseInt(number)>= min && parseInt(number)<=max)
            {
                return true
            }
        }
        else if( parseInt(interval) === parseInt(number))
        {
            return true
        }
        return false
    }

    static displayInstructions()
    {
        let mess = "Objective:\nGuide the oriented circle to the dark blue "
        mess += "cell without collision by creating a program of moves using arrows.\n\n"
        mess += "Tips:\n"
        mess += "- Plan your sequence of moves carefully to navigate around obstacles "
        mess += "and reach the dark blue cell efficiently.\n"
        mess += "- Pay attention to the orientation of the arrows to ensure the oriented circle moves in the intended direction."

        alert(mess)
    }
}