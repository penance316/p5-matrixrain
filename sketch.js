let symbolSize = 26;
let streams = [];

window.setup = function () {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );
    background( 0 );

    let x = 0;

    // fit streams based on screen size
    for ( var i = 0; i < width / symbolSize; i++ ) {
        var stream = new Stream();
        //delay the start of stream
        stream.generateSymbols( x, random( -2000, 0 ) );
        streams.push( stream );
        x += symbolSize;
    }

    textFont( 'Consolas' );
    textSize( symbolSize );
};

window.draw = function () {
    background( 0, 150 );
    streams.forEach( function ( stream ) {
        stream.render();
    } );
};

class Symbol {
    constructor( x, y, speed, first ) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.first = first;
        this.value = '';
    }

    switchInterval() {
        return round( random( 2, 25 ) )
    };

    setToRandomSymbol() {
        //p5 frameCount value
        if ( frameCount % this.switchInterval() == 0 ) {
            this.value = String.fromCharCode(
                0x30A0 + round( random( 0, 96 ) )
            );
        }
    };

    rain() {
        this.y = (this.y >= height) ? 0 : this.y += this.speed
    };

}

class Stream {

    constructor() {
        this.symbols = [];
        this.totalSymbols = round( random( 5, 30 ) );
        this.speed = random( 5, 20 );
    };

    generateSymbols( x, y ) {
        let first = round( random( 0, 4 ) ) == true;
        for ( let i = 0; i < this.totalSymbols; i++ ) {
            let symbol = new Symbol( x, y, this.speed, first );
            symbol.setToRandomSymbol();
            this.symbols.push( symbol );
            // put next symbol above the previous
            y -= symbolSize;
            first = false;
        }
    };

    render() {
        this.symbols.forEach( function ( symbol ) {
            // make first symbol glow
            if ( symbol.first ) {
                fill( 140, 255, 200 );
            } else {
                fill( 0, 255, 70 );
            }

            text( symbol.value, symbol.x, symbol.y );
            symbol.rain();
            symbol.setToRandomSymbol();
        } );
    }

}

