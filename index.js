class CornerRadius{
    constructor(radius){
        if(Number.isInteger(radius)){
            this.topLeft = radius;
            this.topRight = radius;
            this.bottomLeft = radius;
            this.bottomRight = radius;
        } else if(Array.isArray(radius)){
            this.topLeft = radius[0];
            this.topRight = radius[1];
            this.bottomLeft = radius[2];
            this.bottomRight = radius[3];
        }
    }
}

class Button{
    constructor(x, y, width, height, text, onPressed){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.labelText = text;
        this.onPressedCallback = onPressed;
        this.cornerRadius = new CornerRadius(8);
        this.backgroundColor = color('rgb(25, 255, 255)');
        this.hoverBackgroundColor = color('rgb(255, 255, 255)');
        this.textColor = color('rgb(20, 20, 20)');
        this.mouseOnButton = false;
        this.scale = 1;
        this.inc = 0;
    }

    update(){
        this.onMouseHoverOver();
        
        if(this.inc <1){
            this.inc+=deltaTime/800
        }
        
    }

    onMouseHoverOver(){
        if(mouseX >= this.x && mouseX <= this.x+this.width && mouseY >= this.y && mouseY <= this.y+this.height){
            fill(this.hoverBackgroundColor)
            this.mouseOnButton = true
        } else{
            fill(this.backgroundColor)
            this.mouseOnButton = false;
        }
    }

    onLeftClick(){
        if(this.mouseOnButton){

            this.onPressedCallback();
        }
    }

    draw(){
        translate(this.x, this.y)
        scale(lerp(1, 0.97, this.inc));
        rect(0, 0, this.width, this.height, this.cornerRadius.topLeft, this.cornerRadius.topRight, this.cornerRadius.bottomLeft, this.cornerRadius.bottomRight)
        textSize(14)
        fill(this.textColor);
        text(this.text, (this.width/2)-textWidth(this.text)/2, (textAscent()-3)+(this.height/2)-(textAscent())/2); 
    }
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    button = new Button(100, 200, 100, 30, "Press me ag!", function(){
        console.log("button pressed");
    })
}

function mouseClicked(){
    button.onLeftClick();
}

function draw(){
    background(244);

    button.draw();
    button.update();
}