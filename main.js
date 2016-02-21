/**
 * Created by emilfrisk on 21/02/16.
 */
Crafty.init(window.innerWidth, window.innerHeight, document.getElementById('game'));

Crafty.background('#100719');

/* Global Variables */
tileSize = 60;
wallWidth = 100;
wallHeight = 100;

/* Wall */
var wall = Crafty.e('2D, DOM, Color')
    .attr({
        x: (window.innerWidth / 2) - (wallHeight / 2),
        y: (window.innerHeight / 2) - (wallHeight / 2),
        w: wallWidth,
        h: wallHeight
    })
    .color('#FFFFFF');

var zoom = 0;
var maxZoom = 500;

window.setInterval(function(){
    zoom = zoom + 1;
    var newBackgroundWidth = wallWidth + zoom;
    var newBackgroundHeight = wallHeight + zoom;
    wall.attr({
        x: (window.innerWidth / 2) - (newBackgroundWidth / 2),
        y: (window.innerHeight / 2) - (newBackgroundHeight / 2),
        w: newBackgroundWidth,
        h:newBackgroundHeight
    });
    if (zoom >= maxZoom) zoom = 0;
}, 25);

/* Square */
var squareWidth = 60;
var squareHeight = 60;

Crafty.c('SquareControls',{
    __move: {left: false, right: false, up: false, down: false},
    _speed: 3,

    SquareControls: function(){
        var move = this.__move;
        var delay = 0;
        var maxDelay = 4;
        this.bind('EnterFrame', function(){
            if (delay > 2) {
                if (move.right) this.x += tileSize;
                else if (move.left) this.x -= tileSize;
                else if (move.up) this.y -= tileSize;
                else if (move.down) this.y += tileSize;
                delay = 0;
            }
            delay += 1;
        }).bind('KeyDown', function(e) {
            console.log("kd");
            // Default movement booleans to false
            move.right = move.left = move.down = move.up = false;

            // If keys are down, set the direction
            if (e.keyCode === Crafty.keys.RIGHT_ARROW) move.right = true;
            if (e.keyCode === Crafty.keys.LEFT_ARROW) move.left = true;
            if (e.keyCode === Crafty.keys.UP_ARROW) move.up = true;
            if (e.keyCode === Crafty.keys.DOWN_ARROW) move.down = true;

            //this.preventTypeaheadFind(e);
        }).bind('KeyUp', function(e) {
            console.log("ku");
            // If key is released, stop moving
            if (e.keyCode === Crafty.keys.RIGHT_ARROW) move.right = false;
            if (e.keyCode === Crafty.keys.LEFT_ARROW) move.left = false;
            if (e.keyCode === Crafty.keys.UP_ARROW) move.up = false;
            if (e.keyCode === Crafty.keys.DOWN_ARROW) move.down = false;

            //this.preventTypeaheadFind(e);
        });
    }
});

Crafty.c('CustomControls', {
    __move: {left: false, right: false, up: false, down: false},
    _speed: 3,

    CustomControls: function(speed) {
        if (speed) this._speed = speed;
        var move = this.__move;

        console.log("inside custom controls");

        this.bind('EnterFrame', function() {
            // Move the player in a direction depending on the booleans
            // Only move the player in one direction at a time (up/down/left/right)
            if (move.right) this.x += this._speed;
            else if (move.left) this.x -= this._speed;
            else if (move.up) this.y -= this._speed;
            else if (move.down) this.y += this._speed;
        }).bind('KeyDown', function(e) {
            console.log("inside keydown")
            // Default movement booleans to false
            move.right = move.left = move.down = move.up = false;

            // If keys are down, set the direction
            if (e.keyCode === Crafty.keys.RA) move.right = true;
            if (e.keyCode === Crafty.keys.LA) move.left = true;
            if (e.keyCode === Crafty.keys.UA) move.up = true;
            if (e.keyCode === Crafty.keys.DA) move.down = true;

            //this.preventTypeaheadFind(e);
        }).bind('KeyUp', function(e) {
            console.log("inside keyup")
            // If key is released, stop moving
            if (e.keyCode === Crafty.keys.RA) move.right = false;
            if (e.keyCode === Crafty.keys.LA) move.left = false;
            if (e.keyCode === Crafty.keys.UA) move.up = false;
            if (e.keyCode === Crafty.keys.DA) move.down = false;

            //this.preventTypeaheadFind(e);
        });

        return this;
    }
});

var square = Crafty.e('2D, DOM, Color, SquareControls')
    .attr({
        x:(window.innerWidth / 2) - (squareWidth / 2),
        y: (window.innerHeight * 0.8) - (squareHeight / 2),
        w: squareWidth,
        h: squareHeight
    })
    .color('#9FF781')
    .SquareControls();


