class Grass {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.multiply = 0;
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

    // Finds and returns cells with charecters, that you were searcheing

    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {

            var x = this.directions[i][0]; // Left one in this.directions
            var y = this.directions[i][1]; // Right one in this.directions

            /* Ete bolor 4 ankyunneric chi durs galis,
             u mer uzac charecter - na tvayal cellum = appa... */

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {

                    // ...veradarcnuma...

                    found.push(this.directions[i]);

                }

            }
        }
        // ... bolor koxqi mer uzats charecter - ov vandakneri kordinatner@

        return found;

    }


    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells); //Patahakan @ndruma koxqi mer uzats charecterneric meki kordinatner@

        if (newCell /* piti ta true (ete random-i mej datark var liner ` random@ undifined kveradarcner newCell-i mej) */ && this.multiply >= 8) {

            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = this.id; /* mer @ntrats charecteri tex@ dnuma arten mer uzats charecter@ 
                                    (stex 0-n poxanakuma 1-ov (nothing charecter@ poxanakuma grass-ov))  */

            var newGrass = new Grass(newX, newY, this.id); // Talisa kyanq mer henc nor texadrvats charecterin
            grassArr.push(newGrass); // Mcnuma charecterin thvyal charecterneri object-i (cucaki) pahesti mej
            this.multiply = 0; // Mother Charecterin zroyacnuma, vor amen qajlin chbazmana ` ajl menak 8 qajl@ mek

        }
    }

}






/*

nothing is charecter as well

0 (id) is nothing
1 (id) is grass...

*/