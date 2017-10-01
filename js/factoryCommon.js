$(function() {

    $('body').on('selection', function(ev) {
        ev.preventDefault();
        return false;
    });

    $('factoryArea').on('mousedown', function(ev) {
        var mouse = factoryState;
    });

});

