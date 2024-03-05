export default class Draw
{
    #canvas = {}
    #ctx = {}
    #unit = 0
    //game zone size in units
    #width_u = 0
    #height_u = 0
    //game zone size in px
    #width_px = 0
    #height_px = 0

    constructor(canvasId, unit=32, width=26, height=14)
    {
        if(width>52) width=52
        this.#canvas = document.getElementById(canvasId)
        this.#ctx = this.#canvas.getContext('2d');
        this.#unit = unit
        this.#width_u = width
        this.#height_u = height
        this.#updateSizesPx()
    }

    // Setters
    setUnit(newUnit){ this.#unit = newUnit; this.#updateSizesPx() }
    setWidth(newWidth){ this.#width_u = newWidth; this.#updateSizesPx('w') }
    setHeight(newHeight){ this.#height_u = newHeight; this.#updateSizesPx('h') }
    #updateSizesPx(sizes='all')
    {
        if(['all','w'].includes(sizes))this.#width_px = this.#width_u * this.#unit
        if(['all','h'].includes(sizes))this.#height_px = this.#height_u * this.#unit
    }

    // Getters
    getCanvas(){ return this.#canvas; }
    getCtx(){ return this.#ctx; }
    getUnit(){ return this.#unit; }
    getWidth_u(){ return this.#width_u; }
    getHeight_u(){ return this.#height_u; }
    getWidth_px(){ return this.#width_px; }
    getHeight_px(){ return this.#height_px; }

    //tools
    convert(...args){ return args.map(val => parseInt(val*this.#unit)) }

    //interpreter
    map(level)
    {
      let coors = []
      let [x, y] = [0,0]
      const defaultTile = level[1]
      const map = level[2]
      this.coorSystem(level[0])
      this.background(defaultTile[0],defaultTile[1])
      for(let coor in map)
      {
        coors = coor.split('_')
        x = parseInt(coors[0])
        y = parseInt(coors[1])
        this.cell(x, y, map[coor][0][0], map[coor][0][1])
        this.sprite(map[coor][1][0], x, y, map[coor][1][1])
      }
    }
    
    
    //switch
    sprite(functionName, x, y, param)
    {
        switch(functionName)
        {
            case 'hero': this.heroe(x, y, param); break;
            default: return;
        }
    }

    simpleSquare(x, y, filledColor, strokedColor=undefined)
    {
        [x, y] = this.convert(x,y)
        this.#ctx.fillStyle = filledColor
        this.#ctx.fillRect(x, y, this.#unit, this.#unit)
        if(strokedColor !== undefined)
        {
            this.#ctx.strokeStyle = strokedColor
            this.#ctx.strokeRect(x, y, this.#unit, this.#unit)
        }
    }

    background(color, lineColor=undefined)
    {
        const [u, w, h] = [this.#unit, this.#width_px, this.#height_px]
        
        //draw background
        this.#ctx.fillStyle = color
        this.#ctx.fillRect(u, u, w, h)

        //draw grid if exists
        if(lineColor !== undefined)
        {
            this.#ctx.strokeStyle = lineColor
            
            for(let i = u; i<=h; i += u){
                for(let j = u; j<=w; j += u)
                {
                    this.#ctx.strokeRect(j, i, u, u)
                }
            }
        }
    }

    text({str, x, y, color='#000', font='20px Arial', baseline=undefined, alignment=undefined})
    {
        [x, y] = this.convert(x, y)
        this.#ctx.fillStyle = color
        this.#ctx.font = font
        this.#ctx.textBaseline = baseline || "top"
        this.#ctx.textAlign = alignment || "start"
        this.#ctx.fillText(str, x, y)
    }
    cellCenterText(str, x, y, color='#000', font='20px Arial')
    {
        this.text({str, x:x+(0.5), y:y+(0.5), color, font, baseline:'middle', alignment:'center'})
    }
    textInCells(str, x, y, color='#000', font='20px Arial')
    {
        for(let i = 0; i<str.length; i++)
        {
            this.cellCenterText(str[i], x+i, y, color, font)
        }
    }


    //swtich
    coorSystem(type='letters-digits')
    {
        switch(type)
        {
            case 'letters-digits':
            default: return this.coorSystem_lettersDigits()
        }
    }
    coorSystem_lettersDigits()
    {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

        for(let i = 1; i<=this.#width_u; i++)
        {
            this.cellCenterText(letters[i-1], i, 0)
        }
        for(let i = 1; i<=this.#height_u; i++)
        {
            this.text({str:i, x:0.5, y:(0.5)+i, baseline:'middle', alignment:'center'})
        }
    }

    /**
     * 
     * @param {int} x cordinate x of the cell (in unit)
     * @param {int} y cordinate y of the cell (in unit)
     * @param {string} direction 'top'||'bottom'||"left"||"right"
     */
    heroe(x, y, direction) 
    {
        //units to px
        const [Cx, Cy, Cr, cr] = this.convert(x+(0.5), y+(0.5), 0.5, 0.25)
        
        this.#ctx.beginPath();
        this.#ctx.arc(Cx, Cy, Cr-1, 0, Math.PI*2);
        this.#ctx.fillStyle = "darkblue";
        this.#ctx.fill();
        this.#ctx.closePath();
        
        let [cx, cy] = [Cx,Cy]
        if(['left','right'].includes(direction))
        {
            cx = direction==='left' ? cx-cr : cx+cr
        }
        if(['bottom','top'].includes(direction))
        {
            cy = direction==='top' ? cy-cr : cy+cr
        }
        
        this.#ctx.beginPath();
        this.#ctx.arc(cx, cy, cr-1, 0, Math.PI*2);
        this.#ctx.fillStyle = "lightblue";
        this.#ctx.fill();
        this.#ctx.closePath();
    }
}