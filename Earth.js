/*
 Earth is made via EarthDist (Airplane)

 There's a chance that other Airplain (EarthDist) can see earth and try to land there

 */

class Earth {
    constructor(x, y, id) {

        this.x = x;
        this.y = y;
        this.id = id; //5
        this.energy = 6;

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