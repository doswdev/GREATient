/*
 *  Demonstration of gradient animation.
 *  Radial vs linear   ✓ (radial where supported by the browser)
 *  RGB                ✓
 *  Color name         ✓
 *  Hexadecimal colors ✓
 */

(function($) {
    //ArrrGB
    $("div.click").click(function() {
        var c1 = [Math.floor(256 * Math.random()),
                  Math.floor(256 * Math.random()),
                  Math.floor(100 * Math.random() + 156)],
            c2 = [Math.floor(256 * Math.random()),
                  Math.floor(100 * Math.random() + 156),
                  Math.floor(256 * Math.random())];
        $(this).animate({
            "gradientFrom": "rgb(" + c2.join(",") + ")",
            "gradientTo": "rgb(" + c1.join(",") + ")"
        }, 1000);
    });

    //Hex colors too!
    $("#hover").hover(function() {
        $(this).stop().animate({
            "gradientFrom": "#000000",
            "gradientTo": "#FFFFFF"
        }, 1000);
    }, function () {
        $(this).stop().animate({
            "gradientFrom": "#FFFFFF",
            "gradientTo": "#000000"
        }, 1000);
    });

    //And color names
    var colors = ["red", "yellow"];
    $("#colorName").click(function() {
        $(this).animate({
            "gradientFrom": colors[0],
            "gradientTo": colors.reverse()[0]
        }, 1000);
    });
})(jQuery);
