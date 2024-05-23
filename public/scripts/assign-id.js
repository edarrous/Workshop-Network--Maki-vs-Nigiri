$(function () {
    var socket = io();



    $('#spawn2').submit(function(){
        console.log('{pseudo:'+$('#pseudo').val()+'}');
        var msg =  '{"pseudo":"'+$('#pseudo').val()+'"}';
        socket.emit('spawn2',JSON.parse(msg));
        socket.on("confirm admin", () => {
            window.location.href = '/wait-master.html';
        })
        window.location.href = '/ecranM1-attente.html';
        return false;
    });

    
});

