/*
 * jQuery GREAT!-ient
 * Gradient animation with jQuery
 *
 * Copyright 2011 Dennis O'Flaherty
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */

(function($) {

    /* Handle IE.  Everyone else uses backgroundImage but IE uses filter.  Untested. */
    var gradientProp = $.browser.msie ? "filter":"backgroundImage",

    /* List of color names, borrowed from the jQuery color plugin */
        colors = {aqua: "#00ffff",azure: "#f0ffff",beige: "#f5f5dc",black: "#000000",blue: "#0000ff",brown: "#a52a2a",cyan: "#00ffff",darkblue: "#00008b",
         darkcyan: "#008b8b",darkgrey: "#a9a9a9",darkgreen: "#006400",darkkhaki: "#bdb76b",darkmagenta: "#8b008b",darkolivegreen: "#556b2f",darkorange: "#ff8c00",
         darkorchid: "#9932cc",darkred: "#8b0000",darksalmon: "#e9967a",darkviolet: "#9400d3",fuchsia: "#ff00ff",gold: "#ffd700",green: "#008000",indigo: "#4b0082",
         khaki: "#f0e68c",lightblue: "#add8e6",lightcyan: "#e0ffff",lightgreen: "#90ee90",lightgrey: "#d3d3d3",lightpink: "#ffb6c1",lightyellow: "#ffffe0",
         lime: "#00ff00",magenta: "#ff00ff",maroon: "#800000",navy: "#000080",olive: "#808000",orange: "#ffa500",pink: "#ffc0cb",purple: "#800080",violet: "#800080",
         red: "#ff0000",silver: "#c0c0c0",white: "#ffffff",yellow: "#ffff00"};

    /* pos is between 0 and 1, start and end are arrays of [r,g,b] values.  Returns an rgb formatted color */
        getPartialColor = function (pos, start, end) {
            return "rgb(" + [
                Math.max(Math.min(parseInt((pos * (end[0] - start[0])) + start[0], 10), 255), 0),
                Math.max(Math.min(parseInt((pos * (end[1] - start[1])) + start[1], 10), 255), 0),
                Math.max(Math.min(parseInt((pos * (end[2] - start[2])) + start[2], 10), 255), 0)
            ].join(",") + ")";
        },

    /* Parse the provided colors and convert into numbers for calculation */
        convertColors = function(fx, index) {
            var str, rgb;
            str = $(fx.elem).css(gradientProp);
            rgb = (str.match(/(rgb\(.+?\))/g) || str.match(/(#[0-9a-f]{6})/g))[index];
            if(rgb[0] == "#") {
                fx.start = [parseInt(rgb.substring(1,3), 16), parseInt(rgb.substring(3,5), 16), parseInt(rgb.substring(5,7), 16)];
                fx.format = /(#[0-9a-f]{6})/;
            } else {
                rgb = rgb.match(/\d+/g);
                fx.start = [parseInt(rgb[0], 10), parseInt(rgb[1], 10), parseInt(rgb[2], 10)];
                fx.format = /(rgb\(.+?\))/;
            }
            rgb = colors[fx.end] || fx.end;
            if(rgb[0] == "#") {
                fx.end = [parseInt(rgb.substring(1,3), 16), parseInt(rgb.substring(3,5), 16), parseInt(rgb.substring(5,7), 16)];
            } else {
                rgb = rgb.match(/\d+/g);
                fx.end = [parseInt(rgb[0], 10), parseInt(rgb[1], 10), parseInt(rgb[2], 10)];
            }
        };

    /* Animates the first color in the gradient  */
    $.fx.step.gradientFrom = function(fx) {
        if (fx.state === 0) {
            convertColors(fx, 0);
        }

        var str = $(fx.elem).css(gradientProp).split(fx.format), i;
        for (i = 0; i < str.length; i++) {
            if (str[i].substring(0, 4) === "rgb(" || str[i].substring(0, 1) === "#" ) {
                str[i] = getPartialColor(fx.pos, fx.start, fx.end);
                fx.elem.style[gradientProp] = str.join("");
                break;
             }
        }
    };

    /* Animates the second color in the gradient  */
    $.fx.step.gradientTo = function(fx) {
        if (fx.state === 0) {
            convertColors(fx, 1);
        }

        var str = $(fx.elem).css(gradientProp).split(fx.format), i = str.length;
        while(i--) {
            if (str[i].substring(0, 4) === "rgb(" || str[i].substring(0, 1) === "#" ) {
                str[i] = getPartialColor(fx.pos, fx.start, fx.end);
                fx.elem.style[gradientProp] = str.join("");
                break;
            }
        }
    };
})(jQuery);
