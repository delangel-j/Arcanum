let score = 0;
var model = {
  boardSize: 7,
  numShips: 3,
  shipLenght: 3,
  shipsSunk: 0,

  ships: [
    {type: "portaviones", locations: [0, 0, 0, 0], hits: ["", "", ""]},
    {type: "submarino", locations: [0, 0, 0], hits: ["", "", ""]},
    {type: "barco", locations: [0, 0], hits: ["", "", ""]}
  ],

  fire: function (guess) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      var index = ship.locations.indexOf(guess);

      if (ship.hits[index] === "hit") {
        view.displayMessage("Ya has golpeado esta locación");
        return true;
      }else if (index >= 0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("Hit");
        score = score + 100;
        document.getElementById('score').value = score;
        if (this.isSunk(ship)) {
          view.displayMessage("Has hundido el barco");
          this.shipsSunk++;
          score = score + 300;
          document.getElementById('score').value = score;
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("Fallaste");
      if (score < 1){
        score = score;
                    }
                    else{
                      score = score -25;
                    }
    document.getElementById('score').value = score;
    return false;
  },


  isSunk: function (ship) {
    //console.log("Inicia funcion isSink");
    for (var i = 0; i < this.shipLenght; i++) {
      if (ship.hits[i] !== "hit") {
        return false;
      }
  }
    return true;
  },

  generateShipLocations: function () {
    //console.log("Iniciar generateShipLocations");
    var locations;

    for (var i = 0; i < this.numShips; i++) {
      do {
        locations = this.generateShip();
      } while (this.collision(locations));
      this.ships[i].locations = locations;
    }
   // console.log("Arreglo de barcos: ");
    console.log(this.ships);
  },

  generateShip: function () {

    var direction = Math.floor(Math.random() * 2);
    var row;
    var col;
    //////////////////////////////////////////////////////console.log("direccion: "+direction);
    //console.log(this.ships[0].type);
    for(let i=0 ; i<3 ; i++){
    //console.log(this.ships[i].locations.length+"...");
    }
    if (direction === 1){
      //random = Math.floor(Math.random());
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - this.shipLenght + 1));
      //console.log("asd: " + row + "col: "+ col);
      console.log("Direccion cuando es 0")
      console.log("fila: " + row + "col: " +col)
    } else {
      row = Math.floor(Math.random() * (this.boardSize - this.shipLenght + 1));
			col = Math.floor(Math.random() * this.boardSize);
      console.log("Direccion cuando es != 0")
      console.log("fila:"+row + "col: " +col)
    }
    var newShipLocations = [];
    for (var i = 0; i < this.shipLenght; i++) {
      if (direction === 1 ) {
        newShipLocations.push(row + "" + (col + i));
       // console.log("dir1 "  +row + "" + (col + i));
      } else {
        newShipLocations.push((row + i) + "" + col);
        //console.log("dir!=1 "+(col + i) + "" + row)
      }
    }
    //console.log("barco: " + newShipLocations);
    return newShipLocations;
  },

collision: function(locations){
  for (var i=0; i <= this.numShips; i++){
    var ship = this.ships[i];
    for (var j=0; j<=locations.lenght;j++){
      if(ship.locations.indexOf(locations[j]) >= 0){
        return true;
      }
    }
  }
  return false;
}

};



var view = {
  displayMessage: function(msg){
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },

  displayHit: function(location){
    var cell = document.getElementById(location);
    cell.setAttribute("class","hit");
  },

  displayMiss: function(location){
    var cell = document.getElementById(location);
    cell.setAttribute("class","miss");
  }
};



var controller = {
  guesses: 0,

  processGuess: function(guess){
    var location = parseGuess(guess);
    if(location){
      this.guesses++;
      var hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips){
        alert("Hundiste todos los barcos en " +
                              this.guesses+ " veces");
      }
    }
  }
};


function parseGuess(guess){
  //var alphabet = ["A","B","C","D","E","F","G"];

  if (guess === null || guess.lenght > 2) {
    alert("Ingresa un valor válido. Debe ser una letra y número");
    //console.log(guess);
  }else {
    var firstChar = guess.charAt(0);
    var row = guess.charAt(1);
    var column = guess.charAt(0);
    if (isNaN(row) || isNaN(column)){
      alert("No es un valor válido");
    } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize){
      alert("El valor no se encuentra en el tablero");
    } else {
      
      return row + column;
    }
  }
  return null;
};


function handleFireButton(){
  var guessInput = document.getElementById("guessInput");
  var guess = guessInput.value.toUpperCase();

  controller.processGuess(guess);

  guessInput.value = "";
};


function handleKeyPress(e){
  var fireButton = document.getElementById("fireButton");

  e=e || window.event;

  if (e.keyCode === 13){
    fireButton.click();
    return false;
  }
};


function init(){
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;

  var guessInput = document.getElementById("guessInput");
  guessInput.onkeypress = handleKeyPress;

  var score = document.getElementById("score");
  score.onclick

  model.generateShipLocations();
};

window.onload = (init);
