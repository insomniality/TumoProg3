/*
 Earth is made via EarthDist (Airplane)

 There's a chance that other Airplain (EarthDist) can see earth and try to land there

 */

 class Earth {
    constructor(x, y, id) {
        super(x, y, id);
    }
    stay() {
        if (this.energy <= 0) {
            for (var i in earthArr) {
                if (this.x == earthArr[i].x && this.y == earthArr[i].y) {
                    earthArr.splice(i, 1);
                    break;
                }
            }
            var newGrass = new Grass(this.x, this.y, 1);
            grassArr.push(newGrass);
            matrix[this.y][this.x] = 1;
        }
        else {
            if (Math.round(Math.random() * 1000) < 25) {

                matrix[this.y][this.x] = 4;

                var newEarthDist = new EarthDist(this.x, this.y, 4, Math.round(random(0, 3)));
                earthDistArr.push(newEarthDist);

                for (var i in earthArr) {
                    if (this.x == earthArr[i].x && this.y == earthArr[i].y) {
                        earthArr.splice(i, 1);
                        break;
                    }
                }
            }
            this.energy--;
        }
    }
}

/*
    Airplain (or rocket) which comes in contact with surface and kills everything leaving earth(հող) behind.

    EarthDistributor
*/

class EarthDist extends GrassEater{
    constructor(x, y, id, dir) {
        super(x, y, id);
        this.dir = dir;
    }
    eat() {
        var newX = this.directions[this.dir][0];
        var newY = this.directions[this.dir][1];
        if (newX > matrix[0].length - 1 ||
            newY > matrix.length - 1 ||
            newX < 0 ||
            newY < 0) 
            {

            this.stop();
        }
        else {
            matrix[newY][newX] = this.id;

            var newEarthDist = new EarthDist(newX, newY, this.id, this.dir);
            earthDistArr.push(newEarthDist);

            matrix[this.y][this.x] = 5;

            var newEarth = new Earth(this.x, this.y, 5);
            earthArr.push(newEarth);

            this.x = newX;
            this.y = newY;

            for (var i in earthDistArr) {
                if (this.x == earthDistArr[i].x && this.y == earthDistArr[i].y) {
                    earthDistArr.splice(i, 1);
                    break;
                }
            }
            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            for (var i in grassArr) {
                if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
            for (var i in earthArr) {
                if (this.x == earthArr[i].x && this.y == earthArr[i].y) {
                    earthArr.splice(i, 1);
                    break;
                }
            }
        }
    }
    stop() {

        matrix[this.y][this.x] = 5;

        var newEarth = new Earth(this.x, this.y, 5);
        earthArr.push(newEarth);
        for (var i in earthDistArr) {
            if (this.x == earthDistArr[i].x && this.y == earthDistArr[i].y) {
                earthDistArr.splice(i, 1);
                break;
            }
        }
    }
}

class Grass {
    constructor(x, y, id){
        super(x, y, id);
    this.multiply = 0;
    }
    eat(){
        return super.eat();
    }
    // mul(){
    //     this.multiply++;
    //     return super.mul();
    // }
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.id;

            var newGrass = new Grass(newX, newY, this.id);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }
}

class GrassEater {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
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

    eat() {
        var emptyCells = this.chooseCell(1);
        var newCell = random(emptyCells);

        if (newCell && this.energy > 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.id;

            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;

            this.energy++;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.mul();
        }
        else if (this.energy <= 0) {
            this.die();
        }
        else {
            this.move();
        }
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    getNewCoordinates() {
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

    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.energy >= 12) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.id;

            var newGrassEater = new GrassEater(newX, newY, this.id);
            grassEaterArr.push(newGrassEater);
            this.energy = 8;
        }
    }

    move() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.energy > 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.id;

            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;

            this.energy--;

        } else {
            this.energy--;
        }
        this.die();
    }

    die() {
        if (this.energy <= 0) {
            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            matrix[this.y][this.x] = 0;
        }
    }
}

class Predator extends GrassEater{
    constructor(x, y, id){
        super(x, y, id);
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
