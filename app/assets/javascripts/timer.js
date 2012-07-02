var STATES = {
    STATE1: 1, 	// voting
    STATE2: 2,	// results
    STATE3: 3		// single vote event
}

var currentState = STATES.STATE1;
var totalTime = 25;
var showScoreFor = 5;
var sec = totalTime - showScoreFor
var role;
var results = [ 0, 0, 0]
var percentage;
var netTime = totalTime - showScoreFor;

var timer,timer2; 

function startProgressBar(seconds) {
	clearInterval(timer);
  $('#progress_bar').attr('class', 'progress progress-success active progress-striped');
	timer = setInterval(function() {		
		$('#time_left').text(seconds);
	  percentage = 100 * (seconds / netTime);
	  $('#progress').css('width',percentage + "%");
	  if (seconds == 30) {
	    $('#progress_bar').attr('class', 'progress progress-warning active progress-striped');
	  }
	  if (seconds == 15) {
	    $('#progress_bar').attr('class', 'progress progress-danger active progress-striped');
	  }
	  if (seconds == 0) {
			clearInterval(timer);
	  }
		--seconds;
	}, 1000);
	
	
};

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
			
			manager.setMessageHandler(STATES.STATE3 , function(state , payload){
	      console.log(JSON.stringify(payload));
	    });
			var sendState = false;
			$("#stop_contest").click(function(){
				clearInterval(timer2);
				
			});
			timer2 = setInterval(function() {
					
					if (sec == showScoreFor) {
						currentState = STATES.STATE2;
						manager.setState(Nexu.SocketChannels.ALL, STATES.STATE2, { time: (sec - showScoreFor) });
					}
					else if (sec == 0) {					// restart clock
						currentState = STATES.STATE1;
						sec = totalTime;
						manager.setState(Nexu.SocketChannels.ALL, STATES.STATE1, { time: (sec - showScoreFor) });
					}

					$('#contest_state').text(currentState);
					$('#contest_time').text(--sec);
											
				},1000);
		}
		// check if we are in SCREEN mode
		else if ($('#ticker').length > 0) {
	    var screen = new Nexu("http://m.nexu.co:80",Nexu.SocketChannels.SCREEN).socket;
	    screen.setDefaultHandler(screenHandler);
      screen.connect();
			startProgressBar(netTime);

		}
		// check if we are in voting mode
    else if ($('.votes').length > 0) {
	    var client = new Nexu("http://m.nexu.co:80",Nexu.SocketChannels.CLIENT).socket;
	    client.setDefaultHandler(clientHandler);
      client.connect();
			startProgressBar(netTime);
			
			$(".votes").click( function(event) {
				vote_index = $(this).data('vote-index');
				$('form input[name="vote[vote_index]"]').val(vote_index);
				$('form').submit();

			});
			
			
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
	startProgressBar(netTime);

	if (state == STATES.STATE1) {
		currentState = STATES.STATE1;
		$('#results_modal').modal('hide');
		startProgressBar(netTime);
    
	}  
	else if (state == STATES.STATE2){
		currentState = STATES.STATE2;
		$('#results_modal').modal('show');
	}
}

function screenHandler(state, payload){
		sec = payload.time;
		if (state == STATES.STATE1) {
		}
		else if (state == STATES.STATE2){
			
		}  
		else if (state == STATES.STATE3){
			$("#ticker").prepend('<div class="row thumbnail"><img class="pull-left" src="http://placehold.it/50x50" alt="">' + payload.vote_index + ' / ' + payload.comment + '</div>');
		}
}

function managerHandler(state, payload){
    $('#managerMessages').append('Got State:' + state + ' With Payload:' + JSON.stringify(payload)  + '<br />');
}
