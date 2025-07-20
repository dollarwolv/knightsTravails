class Square {
  constructor(location) {
    this.location = location;
  }

  getPossibleSquares() {
    // get all possible moves
    const possibleMoves = [
      [this.location[0] + 2, this.location[1] + 1],
      [this.location[0] + 2, this.location[1] - 1],
      [this.location[0] - 2, this.location[1] + 1],
      [this.location[0] - 2, this.location[1] - 1],
      [this.location[0] + 1, this.location[1] + 2],
      [this.location[0] + 1, this.location[1] - 2],
      [this.location[0] - 1, this.location[1] + 2],
      [this.location[0] - 1, this.location[1] - 2],
    ];

    // clean moves by checking if it exceeds board size
    let cleanedMoves = [];
    for (let square of possibleMoves) {
      if (square[0] < 8 && square[0] > 0 && square[1] < 8 && square[1] > 0) {
        cleanedMoves.push(new Square(square));
      }
    }
    this.possibleMoves = cleanedMoves;
  }
}

class Search {
  constructor(location, target) {
    this.startingSquare = new Square(location);
    this.target = target;
  }

  searchHelp() {
    let queue = [[this.startingSquare]];
    let visitedSquares = new Set();

    while (queue) {
      let path = queue.shift();
      let node = path.at(-1);
      if (this.sameLocation(node.location, this.target)) {
        return path;
      }

      node.getPossibleSquares();
      for (let move of node.possibleMoves) {
        if (!visitedSquares.has(JSON.stringify(move.location))) {
          let new_path = [...path, move];
          visitedSquares.add(JSON.stringify(move.location));
          queue.push(new_path);
        }
      }
    }
  }

  search() {
    const path = this.searchHelp();
    console.log(
      `Getting from ${this.startingSquare.location} to ${this.target} takes ${
        path.length - 1
      } moves:`
    );
    for (let square of path) {
      console.log(square.location);
    }
  }

  sameLocation(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  }
}

search = new Search([0, 0], [7, 7]);
search.search();
