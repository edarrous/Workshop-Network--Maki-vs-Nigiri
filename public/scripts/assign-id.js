$(function () {
    var socket = io();


    $('#launch').submit(function(){
        socket.emit('launch');
        return false;
    });

    socket.on("wait player", () => {
        window.location.href = '/busy.html';
    })

    socket.on("connectPlayer", (e) => {
        window.location.href = '/wait.html?id='+e;
    })

    
});