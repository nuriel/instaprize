# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

$(".votes").click( (event) ->
	$('form input[name="vote[vote_index]"]').val($(this).data('vote-index'))
	$('form').submit()
#	$(this).slideUp()
	false
)

$("form").submit ->
  valuesToSubmit = $(this).serialize()
  $.ajax(
    url: $(this).attr("action")
    data: valuesToSubmit
    dataType: "JSON"
  ).success (json) ->

  false
