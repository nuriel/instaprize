# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

$(".votes").click( (event) ->
	$('form input[name="vote[vote_index]"]').val($(this).data('vote-index'))
	$('form').submit()
	channel.trigger("client-mouse-moved", {x:state.currentX, y: state.currentY});
#	$(this).slideUp()
)
