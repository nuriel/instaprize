var STATES = {
    STATE1: 1, 	// voting
    STATE2: 2,	// results
    STATE3: 3		// single vote event
}

var currentState = STATES.STATE1;
var totalTime = 20;
var showScoreFor = 5;
var timeLeft = 0;
var role;
var results = [ 0, 0, 0]

function setUpNexu(){

		$('#results_modal').modal({
		  keyboard: false,
			show: false
		})
		
		// check if we are in TIMER mode
		if ($('#contest_time').length > 0) {
			var nexu = new Nexu("http://" + document.location.hostname);
			manager = new Nexu("http://m.nexu.co:80",Nexu.SocketChannels.MANAGER).socket;
	    manager.setDefaultHandler(managerHandler);
			manager.connect();
			timeLeft = totalTime;
			
			manager.setMessageHandler(STATES.STATE3 , function(state , payload){
	      console.log(JSON.stringify(payload));
	    });

			var timer=setInterval(function() {
					if (timeLeft == 15) {
						currentState = STATES.STATE2;
						
					}
					else if (timeLeft == -1) {					// restart clock
						currentState = STATES.STATE1;
						timeLeft = totalTime;
					}

					manager.setState(Nexu.SocketChannels.ALL, currentState, { time: timeLeft - showScoreFor });
					$('#contest_state').text(currentState);
					$('#contest_time').text(--timeLeft);
					
				},1000);
		}
		// check if we are in SCREEN mode
		else if ($('#ticker').length > 0) {
	    var screen = new Nexu("http://m.nexu.co:80",Nexu.SocketChannels.SCREEN).socket;
	    screen.setDefaultHandler(screenHandler);
      screen.connect();

		}
		// check if we are in voting mode
    else if ($('.votes').length > 0) {
	    var client = new Nexu("http://m.nexu.co:80",Nexu.SocketChannels.CLIENT).socket;
	    client.setDefaultHandler(clientHandler);
      client.connect();
		}


    $('#btnSendState1ToScreen').bind('click', function(){
        manager.setState(Nexu.SocketChannels.SCREEN, STATES.STATE1, { text: 'I am the payload'});
    });

    $('#btnSendState2ToClient').bind('click', function(){
        screen.setState(Nexu.SocketChannels.CLIENT, STATES.STATE2, { text: 'I am the payload'});
    });

    $('#btnSendState3ToAll').bind('click', function(){
        manager.setState(Nexu.SocketChannels.ALL, STATES.STATE3, { text: 'I am the payload'});
    });


}



function clientHandler(state, payload){
	if (state == STATES.STATE1) {
		$('#results_modal').modal('hide');
	}  
	else if (state == STATES.STATE2){
		$('#results_modal').modal('show');
	}
}

function screenHandler(state, payload){
		if (state == STATES.STATE1) {
		}  
		else if (state == STATES.STATE2){
		}
}

function managerHandler(state, payload){
    $('#managerMessages').append('Got State:' + state + ' With Payload:' + JSON.stringify(payload)  + '<br />');
}
