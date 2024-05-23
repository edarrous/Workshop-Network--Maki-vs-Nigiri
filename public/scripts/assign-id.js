$(function () {
    var socket = io();


    $('#spawn2').submit(function(){
        //console.log('{pseudo:'+$('#pseudo').val()+'}');
        // var msg =  '{"pseudo":"'+$('#pseudo').val()+'"}';
        socket.emit('spawn2');
        // socket.on("admin assign", () => {
        //     window.location.href = '/wait-master.html?id=1';
        // })
        // socket.on("j2 assign", () => {
        //     window.location.href = '/ecranM1-attente.html?id=2';
        // })
        // socket.on("j3 assign", () => {
        //     window.location.href = '/ecranM1-attente.html?id=3';
        // })
        // socket.on("j4 assign", () => {
        //     window.location.href = '/ecranM1-attente.html?id=4';
        // })
        
        return false;
    });

    socket.on("wait player", () => {
        window.location.href = '/mince.html';
    })

    socket.on("connectPlayer", (e) => {
        window.location.href = '/wait.html?id='+e;
    })

    
});