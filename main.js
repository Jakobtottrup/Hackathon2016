/**
 * Created by emilfrisk on 21/02/16.
 */
Crafty.init(window.innerWidth, window.innerHeight, document.getElementById('game'));

Crafty.background('#100719');

backgroundWidth = 100;
backgroundHeight = 100;

var background = Crafty.e('2D, DOM, Color')
    .attr({
        x: (window.innerWidth / 2) - (backgroundHeight / 2),
        y: (window.innerHeight / 2) - 50,
        w: backgroundWidth,
        h: backgroundHeight
    })
    .color('#FFFFFF');
