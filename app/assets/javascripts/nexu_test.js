var STATES = {
    STATE1: 1,
    STATE2: 2,
    STATE3: 3
}

$(document).ready(function(){

    var nexu = new Nexu("http://" + document.location.hostname);

    var client = new Nexu("http://" + document.location.hostname,Nexu.SocketChannels.CLIENT).socket;
    var screen = new Nexu("http://" + document.location.hostname,Nexu.SocketChannels.SCREEN).socket;
    var manager = new Nexu("http://" + document.location.hostname,Nexu.SocketChannels.MANAGER).socket;

    client.setMessageHandler(STATES.STATE3 , function(state , payload){
        $('#clientMessages').append('Got State3 Event!!! Payload:' + JSON.stringify(payload) + '<br />');
    });

    client.setDefaultHandler(clientHandler);
    screen.setDefaultHandler(screenHandler);
    manager.setDefaultHandler(managerHandler);


    $('#btnManagerConnect').bind('click', function(){
        manager.connect();
        $('#managerText').css( 'color', 'green');
        $('#btnManagerConnect').attr("disabled", "disabled");
    });

    $('#btnScreenConnect').bind('click', function(){
        screen.connect();
        $('#screenText').css( 'color', 'green');
        $('#btnScreenConnect').attr("disabled", "disabled");
    });

    $('#btnClientConnect').bind('click', function(){
        client.connect();
        $('#clientText').css( 'color', 'green');
        $('#btnClientConnect').attr("disabled", "disabled");
    });

    $('#btnSendState1ToScreen').bind('click', function(){
        manager.setState(Nexu.SocketChannels.SCREEN, STATES.STATE1, { text: 'I am the payload'});
    });

    $('#btnSendState2ToClient').bind('click', function(){
        screen.setState(Nexu.SocketChannels.CLIENT, STATES.STATE2, { text: 'I am the payload'});
    });

    $('#btnSendState3ToAll').bind('click', function(){
        manager.setState(Nexu.SocketChannels.ALL, STATES.STATE3, { text: 'I am the payload'});
    });


});

function clientHandler(state, payload){
    $('#clientMessages').append('Got State:' + state + ' With Payload:' + JSON.stringify(payload)  + '<br />');
}

function screenHandler(state, payload){
    $('#screenMessages').append('Got State:' + state + ' With Payload:' + JSON.stringify(payload)  + '<br />');
}

function managerHandler(state, payload){
    $('#managerMessages').append('Got State:' + state + ' With Payload:' + JSON.stringify(payload)  + '<br />');
}


					// 
					//         var STATES = {
					//             STATE1: 1,
					//             STATE2: 2,
					//             STATE3: 3
					//         }
					// 
					//         $(document).ready(function(){
					// 
					//             nexu = new Nexu("http://" + document.location.host);
					// 
					//             var client = new Nexu("http://m.nexu.co:80/",Nexu.SocketChannels.CLIENT).socket;
					//             var screen = new Nexu("http://m.nexu.co:80/" + document.location.host,Nexu.SocketChannels.SCREEN).socket;
					//             var manager = new Nexu("http://m.nexu.co:80/",Nexu.SocketChannels.MANAGER).socket;
					// 
					//             client.setMessageHandler(STATES.STATE3 , function(state , payload){
					//                 $('#clientMessages').append('Got State3 Event!!! Payload:' + JSON.stringify(payload) + '<br />');
					//             });
					// 
					//             client.setDefaultHandler(clientHandler);
					//             screen.setDefaultHandler(screenHandler);
					//             manager.setDefaultHandler(managerHandler);
					// 
					// 
					// 
					// 
					//             $('#btnManagerConnect').bind('click', function(){
					//                 manager.connect();
					//                 $('#managerText').css( 'color', 'green');
					//                 $('#btnManagerConnect').attr("disabled", "disabled");
					//             });
					// 
					//             $('#btnScreenConnect').bind('click', function(){
					//                 screen.connect();
					//                 $('#screenText').css( 'color', 'green');
					//                 $('#btnScreenConnect').attr("disabled", "disabled");
					//             });
					// 
					//             $('#btnClientConnect').bind('click', function(){
					//                 client.connect();
					//                 $('#clientText').css( 'color', 'green');
					//                 $('#btnClientConnect').attr("disabled", "disabled");
					//             });
					// 
					//             $('#btnSendState1ToScreen').bind('click', function(){
					// 		manager.setState(Nexu.SocketChannels.SCREEN, STATES.STATE1, { text: 'I am the payload'});
					//             });
					// 
					//             $('#btnSendState2ToClient').bind('click', function(){
					//                 screen.setState(Nexu.SocketChannels.CLIENT, STATES.STATE2, { text: 'I am the payload'});
					//             });
					// 
					//             $('#btnSendState3ToAll').bind('click', function(){
					//                 manager.setState(Nexu.SocketChannels.ALL, STATES.STATE3, { text: 'I am the payload'});
					//             });
					// 
					// 
					//         });
					// 
					//         function clientHandler(state, payload){
					//           console.log(state);
					// $('#clientMessages').append('Got State:' + state + ' With Payload:' + JSON.stringify(payload)  + '<br />');
					//         }
					// 
					//         function screenHandler(state, payload){
					//             $('#screenMessages').append('Got State:' + state + ' With Payload:' + JSON.stringify(payload)  + '<br />');
					//         }
					// 
					//         function managerHandler(state, payload){
					//             $('#managerMessages').append('Got State:' + state + ' With Payload:' + JSON.stringify(payload)  + '<br />');
					//         }
					// 
