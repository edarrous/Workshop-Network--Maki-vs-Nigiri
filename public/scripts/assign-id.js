$(function () {
    var socket = io();

    let statePlayer = null;

    $('#spawn2').submit(function(){
        //console.log('{pseudo:'+$('#pseudo').val()+'}');
        var msg =  '{"pseudo":"'+$('#pseudo').val()+'"}';
        socket.emit('spawn2',JSON.parse(msg));
        socket.on("admin assign", () => {
            window.location.href = '/wait-master.html';
            statePlayer = admin;
        })
        socket.on("j2 assign", () => {
            window.location.href = '/ecranM1-attente.html';
            statePlayer = j2;
        })
        
        return false;
    });

    
});