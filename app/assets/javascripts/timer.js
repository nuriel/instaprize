var STATES = {
    STATE1: 1, 	// voting
    STATE2: 2,	// results
    STATE3: 3		// single vote event
}

var VOTES = ['dontlike','like','so-so']

var currentState = STATES.STATE1;
var totalTime = 90;
var showScoreFor = 15;
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
		
		scoreArr = [ 0, 0, 0 ];
		generateFlot(scoreArr);
		
		
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
			$.post('/screen/admin', function(data) {
				currentState = STATES.STATE1;
				sec = totalTime;
				manager.setState(Nexu.SocketChannels.ALL, STATES.STATE1, { 
					all_pics: data.pictures 
				});
				console.log(data);
				
			});
			timer2 = setInterval(function() {

					if (sec == showScoreFor) {
						currentState = STATES.STATE2;
						manager.setState(Nexu.SocketChannels.ALL, STATES.STATE2, { time: (sec - showScoreFor) });
					}
					else if (sec == 0) {					// restart clock and fetch new photos
						$.post('/screen/admin', function(data) {
							currentState = STATES.STATE1;
							sec = totalTime;
							manager.setState(Nexu.SocketChannels.ALL, STATES.STATE1, { 
								all_pics: data.pictures 
							});
						});					
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
				client.setState(Nexu.SocketChannels.SCREEN, STATES.STATE3, { vote_index: vote_index, comment: $('#vote_comment').val()});
				
			});
			
			
		}
}



function clientHandler(state, payload){
	if (state == STATES.STATE1) {
		currentState = STATES.STATE1;
		$('#results_modal').modal('hide');
		startProgressBar(netTime - 2);
		$('#pic_main').attr('src',payload.all_pics[0].picture.url);
		$('#picture_title').text(payload.all_pics[0].picture.title);
	}  
	else if (state == STATES.STATE2){
		currentState = STATES.STATE2;
		$('#results_modal').modal('show');
	}
}

function screenHandler(state, payload){
		if (state == STATES.STATE1) {
			currentState = STATES.STATE1;
			$('#pic_main').attr('src',payload.all_pics[0].picture.url);
			$('#picture_title').text(payload.all_pics[0].picture.title);
			$('#pic_thumb').attr('src',payload.all_pics[0].picture.url)
			$('#ticker').html("");
			scoreArr = [0,0,0];
			generateFlot(scoreArr);
			$('#pic_strip').html("<img class='thumbnail pull-left' src='" + payload.all_pics[0].picture.url + "' alt='' height=75 width=75>");  
			for(i=1;i<(payload.all_pics.length);i++)
		   {
				$('#pic_strip').append("<img class='thumbnail pull-left' src='" + payload.all_pics[i].picture.url + "' alt='' height=50 width=50>");  
		   }
			startProgressBar(netTime - 2);
		}
		else if (state == STATES.STATE2){
			currentState = STATES.STATE2;
			
		}  
		else if (state == STATES.STATE3){
			if (currentState == STATES.STATE1) { // check we are indeed in voting mode
				$("#ticker").prepend('<div class="row thumbnail"><img class="pull-left" src="http://placehold.it/70x70" alt=""><h5>' + VOTES[payload.vote_index] + '</h5>' + payload.comment + '</div>');
				scoreArr[payload.vote_index] = 1 + scoreArr[payload.vote_index];
				generateFlot(scoreArr);
			}
		}
}

function managerHandler(state, payload){
    $('#managerMessages').append('Got State:' + state + ' With Payload:' + JSON.stringify(payload)  + '<br />');
}
