// remake in ES6

var symbolSize = 26;
var streams = [];

function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );
    background(0);

    var x = 0;

    // fit streams based on screen size
    for (var i = 0; i < width / symbolSize; i++) {
        var stream = new Stream();
        //delay the start of stream
        stream.generateSymbols(x, random(-2000, 0));
        streams.push(stream);
        x += symbolSize;
    }
  
  	textFont('Consolas');
    textSize(symbolSize);
}

function draw() {
    background(0, 150);
    streams.forEach(function(stream) {
        stream.render();
    });
}

function Symbol(x, y, speed, first) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.switchInterval = round(random(2, 25));
    this.value;
    this.first = first;

    this.setToRandomSymbol = function() {
        //p5 frameCount value
        if (frameCount % this.switchInterval == 0) {
            this.value = String.fromCharCode(
                0x30A0 + round(random(0, 96))
            );
        }
    }

    this.rain = function() {
        this.y = (this.y >= height) ? 0 : this.y += this.speed;
    }
}

function Stream() {
    this.symbols = [];
    this.totalSymbols = round(random(5, 30));
    this.speed = random(5, 20);

    this.generateSymbols = function(x, y) {
        var first = round(random(0, 4)) == true;
        for (var i = 0; i < this.totalSymbols; i++) {
            symbol = new Symbol(x, y, this.speed, first);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            // put next symbol above the previous
            y -= symbolSize;
            first = false;
        }
    }

    this.render = function() {
        this.symbols.forEach(function(symbol) {
            // make first symbol glow
            if (symbol.first) {
                fill(140, 255, 200);
            } else {
                fill(0, 255, 70);
            }

            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        });
    }

}
