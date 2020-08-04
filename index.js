
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
        this.originalBackgroundColor = color('rgb(25, 255, 255)');
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
            this.mouseOnButton = true
            if(mouseIsPressed){
                this.backgroundColor = this.onMouseDownBackgroundColor;
            } else{
                this.backgroundColor = this.hoverBackgroundColor;
            }
        } else{
            this.backgroundColor = this.originalBackgroundColor;
            this.mouseOnButton = false;
        }
    }

    onLeftClick(){
        if(this.mouseOnButton){
            this.onPressedCallback();
        }
    }

    draw(){
        fill(this.backgroundColor);
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
        resetMatrix()
    }
}

class ToggleButton{
    constructor(x, y, text, toggled, disabled, onToggledCallback){
        this.x = x;
        this.y = y;

        this.width = 25;
        this.height = 25;

        this.borderColor = color('rgb(25, 25, 25)');
        this.borderWeight = 2;
        this.borderRadius = new CornerRadius(4);
        
        this.backgroundColor = color('rgb(200, 200, 200)');
        this.checkedFillColor = color('rgb(0, 0, 230)');
        this.textColor = color('rgb(0, 0, 0)');

        this.text = text;
        this.toggled = toggled;
        this.disabled = disabled;

        this.onToggledCallback = onToggledCallback;
    }

    update(){
    }

    onClicked(){
        if(!this.disabled)
            if(mouseX >= this.x && mouseX <= this.x+this.width && mouseY >= this.y && mouseY <= this.y+this.height){
                this.toggled = !this.toggled;
                this.onToggledCallback(this.toggled);
            }
                
    }

    draw(){
        translate(this.x, this.y);
        fill(this.backgroundColor)
        if(this.borderWeight == 0){
            noStroke();
        } else{
            stroke(this.borderColor);
            strokeWeight(this.borderWeight);
        }
        rect(0, 0, this.width, this.height, this.borderRadius.topLeft, this.borderRadius.topRight, this.borderRadius.bottomLeft, this.borderRadius.bottomRight);
        
        if(this.toggled){
            noStroke();
            fill(this.checkedFillColor);
            rect(3, 3, this.width-6, this.height-6, this.borderRadius.topLeft, this.borderRadius.topRight, this.borderRadius.bottomLeft, this.borderRadius.bottomRight);
        }
        
        textSize(14);
        noStroke();
        fill(this.textColor);
        text(this.text, this.width+10, (textAscent()-1)+(this.height/2)-(textAscent())/2);
        resetMatrix()
    }
}

class Label{
    constructor(x, y, fontSize, text){
        this.x = x;
        this.y = y;
        this.height = textAscent();
        this.fontSize = fontSize;

        this.textColor = color('rgb(20, 20, 20)');
        this.text = text;
    }

    update(){
    }

    draw(){
        fill(this.textColor)
        textSize(this.fontSize);
        text(this.text, this.x, this. y);
    }
}

class SliderBar{
    constructor(x, y, width, min, max){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 20;
        this.minValue = min;
        this.maxValue = max;

        this.percentage = 0;

        this.grabberRadius = 10;
        this.grabberX = 0;
        this.onValueChangedCallBack = function(){};
    }

    onValueChanged(value){
        this.onValueChangedCallBack(value);
    }

    onMouseDown(){
        if(mouseX > this.x+this.width || mouseX < this.x){
            return;
        }
        this.grabberX = mouseX-(this.grabberRadius*2);
        this.percentage = this.grabberX/this.width;
        this.onValueChanged(this.maxValue*this.percentage);
    }

    update(){
        if(mouseX > this.grabberX && mouseX < this.grabberX+this.x+(this.grabberRadius*2) && mouseY > this.y && mouseY < this.y+this.height)
            if(mouseIsPressed)
                this.onMouseDown();
    }

    draw(){
        translate(this.x, this.y);
        stroke(color('rgb(20, 20, 20)'))
        strokeWeight(1)
        line(0, (this.height/2), this.width, (this.height/2));
        fill(color('rgb(5, 190, 250)'))
        ellipse(this.grabberX, (this.height/2), (this.grabberRadius*2), (this.grabberRadius*2));
        resetMatrix()
    }
}

class ProgressBar{
    constructor(x, y, width, height, startingProgress){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.progress = startingProgress
        this.cornerRadius = new CornerRadius(4);
    }

    setProgress(progress){
        this.progress = progress;
    }

    update(){
    }
    
    draw(){
        rect(this.x, this.y, this.width, this.height, this.cornerRadius.topLeft, this.cornerRadius.topRight, this.cornerRadius.bottomLeft, this.cornerRadius.bottomRight);
        noStroke();
        fill(color('rgb(80, 80, 80)'));
        rect (this.x+2, this.y+2, (this.width-4)*this.progress, this.height-4, this.cornerRadius.topLeft, this.cornerRadius.topRight, this.cornerRadius.bottomLeft, this.cornerRadius.bottomRight);
    }
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    button = new Button(20, 20, 100, 30, "Press me!", function(){
        testLabel.text = "Button pressed!";
    })

    button.cornerRadius = new CornerRadius([8, 0, 9, 20]);
    button.borderWeight = 1;

    toggleButton = new ToggleButton(20, button.y+button.height+20, "Enable me", true, false, function(toggleStatus){
        if(toggleStatus){
            testLabel.text = "Toggle is enabled!"
        } else{
            testLabel.text = "Toggle is disabled!";
        }
    });

    testLabel = new Label(toggleButton.x, toggleButton.y+toggleButton.height+20, 14, "Hello world!");
    
    slideBar = new SliderBar(testLabel.x, testLabel.y+testLabel.height, 100, 0, 1);
    slideBar.onValueChangedCallBack = function(value){
        testLabel.text = "Slider bar value: "+(Math.round(value * 10)/10);
        progressBar.setProgress(value);
    }

    progressBar = new ProgressBar(slideBar.x, slideBar.y+slideBar.height+20, 150, 25, 0.94);
}

function mouseClicked(){
    // Temporary, will make this work in the class standalone later on.
    button.onLeftClick(); 
    toggleButton.onClicked();
}

function draw(){
    background(244);

    button.draw();
    button.update();

    toggleButton.draw();
    toggleButton.update();

    testLabel.draw();

    slideBar.update();
    slideBar.draw();

    progressBar.update();
    progressBar.draw();
}