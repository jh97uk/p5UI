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
        this.onMouseDownBackgroundColor = color('rgb(255, 25, 255)');
        this.textColor = color('rgb(20, 20, 20)');
        this.mouseOnButton = false;
        this.borderColor = 'rgb(0, 0, 0)';
        this.borderWeight = 0;
        this.disabled = false;
    }

    update(){
        this.onMouseHoverOver();    
    }

    onMouseHoverOver(){
        if(mouseX >= this.x && mouseX <= this.x+this.width && mouseY >= this.y && mouseY <= this.y+this.height){
            if(mouseIsPressed){
                fill(this.onMouseDownBackgroundColor)
            } else{
                fill(this.hoverBackgroundColor)
            }
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
        if(this.borderWeight == 0){
            noStroke();
        } else{
            stroke(this.borderColor);
            strokeWeight(this.borderWeight);
        }
        translate(this.x, this.y)
        rect(0, 0, this.width, this.height, this.cornerRadius.topLeft, this.cornerRadius.topRight, this.cornerRadius.bottomLeft, this.cornerRadius.bottomRight)
        noStroke();
        textSize(14)
        fill(this.textColor);
        text(this.text, (this.width/2)-textWidth(this.text)/2, (textAscent()-3)+(this.height/2)-(textAscent())/2); 
    }
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    button = new Button(20, 20, 100, 30, "Press me!", function(){
        console.log("button pressed");
    })
    button.cornerRadius = new CornerRadius([8, 0, 9, 20]);
    button.borderWeight = 1;
}

function mouseClicked(){
    button.onLeftClick(); // Temporary, will make this work in the class standalone later on.
}

function draw(){
    background(244);

    button.draw();
    button.update();
}