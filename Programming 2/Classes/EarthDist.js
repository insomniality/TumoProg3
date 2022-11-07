/*
    Airplain (or rocket) which comes in contact with surface and kills everything leaving earth(հող) behind.

    EarthDistributor
*/

class EarthDist {
    constructor(x, y, id, dir) {

        this.x = x;
        this.y = y;
        this.id = id; //4
        this.dir = dir;
        this.directions = [
            [this.x, this.y - 1], // ^ 
            [this.x - 1, this.y], // <-
            [this.x + 1, this.y], // ->
            [this.x, this.y + 1] //, // v
        ];
    }




    eat() {
      //   debugger;

        var newX = this.directions[this.dir][0];
        var newY = this.directions[this.dir][1];
        
        if (newX > matrix[0].length - 1 ||
            newY > matrix.length - 1 ||
            newX < 0 ||
            newY < 0) {

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

