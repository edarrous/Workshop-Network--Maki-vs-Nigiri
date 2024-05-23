$(function () {
    var socket = io();


    $('#spawn2').submit(function(){
        //console.log('{pseudo:'+$('#pseudo').val()+'}');
        var msg =  '{"pseudo":"'+$('#pseudo').val()+'"}';
        socket.emit('spawn2',JSON.parse(msg));
        socket.on("admin assign", () => {
            window.location.href = '/wait-master.html';
        })
        socket.on("j2 assign", () => {
            window.location.href = '/ecranM1-attente.html';
        })
        socket.on("j3 assign", () => {
            window.location.href = '/ecranM1-attente.html';
        })
        socket.on("j4 assign", () => {
            window.location.href = '/ecranM1-attente.html';
        })
        
        return false;
    });

    
});