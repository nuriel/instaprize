# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/


pics = gon.pics.data if gon?

$(document).ready ->
	
	if pics? 
		currentState = gon.state
		$('#pic_main').attr('src',pics[0].images.standard_resolution.url)
		$('#pic_thumb').attr('src',pics[0].images.thumbnail.url)
		for i in [1..9]
			$('#pic_strip').append("<img class='thumbnail pull-left' src='#{pics[i].images.thumbnail.url}' alt='' height=50 width=50>")
		
	setUpNexu()

