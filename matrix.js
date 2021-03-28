const fs = require("fs");

const writeAndReadMatrix = (matrix) => {
  const file = fs.createWriteStream("result.csv");
  file.on("error", (err) => {
    console.error(err);
  });
  matrix.forEach((v) => file.write(`${v}\r\n`));
  file.end();
  fs.readFile("result.csv", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
  });
};

class Matrix {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.matrix = [];
    this.createdIsland = [];
    this.deletedIsland = [];
    this.pointerCol = 0;
    this.pointerRow = 0;
    this.ableLocateIsland = this.row * this.col;
  }

  generateMatrix = () => {
    if (this.row < 2 || this.row > 10000 || this.col < 2 || this.col > 10000) {
      return false;
    }
    this.matrix = Array.from(Array(this.col), () => Array(this.row).fill(0));
    writeAndReadMatrix(this.matrix);
    return this.matrix;
  };

  generateIsland = (n) => {
    if (n > this.ableLocateIsland) {
      return false;
    }

    let addCount = 0;
    while (true) {
      if (addCount === n) {
        break;
      }
      this.matrix[this.pointerCol][this.pointerRow] = "1";
      this.ableLocateIsland--;
      if (this.ableLocateIsland !== 0) {
        this.pointerRow++;
        if (this.pointerRow === this.row) {
          this.pointerCol++;
          this.pointerRow = 0;
        }
      }

      addCount++;
    }

    const result = this.matrix.flat().filter((v) => v === "1").length;

    writeAndReadMatrix(this.matrix);
    return result;
  };

  removeIsland = (n) => {
    let occupiedIslandCount = this.row * this.col - this.ableLocateIsland;
    let subCount = 0;
    if (n > occupiedIslandCount) {
      return false;
    }
    while (true) {
      if (subCount === n) {
        break;
      }
      if (this.ableLocateIsland === 0) {
        this.pointerCol = this.col - 1;
        this.pointerRow = this.row - 1;
        this.matrix[this.pointerCol][this.pointerRow] = 0;
      } else if (this.pointerRow === 0) {
        this.matrix[this.pointerCol - 1][this.col - 1] = 0;
        this.pointerCol--;
        this.pointerRow = this.row - 1;
      } else {
        this.matrix[this.pointerCol][this.pointerRow - 1] = 0;
        this.pointerRow--;
      }
      this.ableLocateIsland++;
      subCount++;
    }
    writeAndReadMatrix(this.matrix);
    return n;
  };
}

const matrix = new Matrix(100, 100);
matrix.generateMatrix();
matrix.generateIsland(500);
