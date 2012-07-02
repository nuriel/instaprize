# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/


pics = gon.pics.data if gon?
@yourMom = (location) ->
  console.log location

$(document).ready ->
	
	if pics? 
		currentState = gon.state
		$('#pic_main').attr('src',pics[0].images.standard_resolution.url)
		$('#pic_thumb').attr('src',pics[0].images.thumbnail.url)
		for i in [1..9]
			$('#pic_strip').append("<img class='thumbnail pull-left' src='#{pics[i].images.thumbnail.url}' alt='' height=50 width=50>")
		
	
	setUpNexu()
	
	#get state and then	
	scoreArr = [ 0, 0, 0 ]
	generateFlot(scoreArr)
#	startProgressBar()

# 
# startProgressBar = (sec = 90) ->
# 	full_time = sec
# 	$('#time_left').text(sec)
# 	timer = setInterval( -> 
# 		$('#time_left').text(--sec)
# 		percentage = 100*(sec/full_time)
# 		$('#progress').css('width', "#{percentage}%")
# 		$('#progress_bar').attr('class', 'progress progress-warning active progress-striped') if sec is 30
# 		$('#progress_bar').attr('class', 'progress progress-danger active progress-striped') if sec is 15
# 		clearInterval(timer) if sec is 0
# 	, 1000)