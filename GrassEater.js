var m = require("./Mother");

class GrassEater extends m{
    constructor(x, y, id){
        super(x, y, id);
        this.energy = 8;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    eat(){
        return super.eat();
    }
    chooseCell(){
        return super.chooseCell();
    }
    getNewCoordinates(){
        return super.getNewCoordinates();
    }
    mul(){
        return super.mul();
    }
    eat(){
        return super.eat();
    }
    move(){
        return super.move();
    }
    die(){
        return super.die();
    }
}