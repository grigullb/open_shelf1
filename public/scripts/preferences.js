$(() => {
	var userId = $('#user-id').val();
	console.log(userId);
	$('#preferences').on('click', function(){
		getInterests(userId);
		$('#info-field').empty();
		fillSection();
	});
	$(document).on('click', '#change_preferences', function(){
		$('#info-field').append('<div id="show_form" class="content"></div>')
		if($('#show_form').is(':empty')){
			$('#show_form').append('<br><form action="/interests" method="post" class="interest_submit_form">\
				<select name="interest_type">\
		  		<option value="title">title</option>\
		  		<option value="author">author</option>\
		  		<option value="genre">genre</option>\
				</select>\
			  	<label for="submit-title" class="label">Interest:</label>\
			  	<input id="submit-title" class="input" type="text" name="int_input"><br>\
			  	<input type="submit" value="Post Book">\
			  	<input type="hidden" value='+userId+' name="this_user_id">\
				</form>');
		} else{
			$('#show_form').empty();
		}
	});
	$(document).on('submit', '.interest_submit_form', function(event){
		event.preventDefault();
		$('#info-field').empty();
		fillSection();
		var form_data = $(this).serialize();
		$.ajax({
	  	type: "POST",
	   	url: "/api/users/interests",
	   	data: form_data,
	   	success: (data)=>{
	    	console.log(data);
	    	getInterests(userId);
	    }
	  });
	});
});


function getInterests(userId){
	$.ajax({
	    method: "GET",
	    url: "/api/users/interests/" + userId
	  }).done((interests) => {
	    for(interest of interests) {
	    	console.log(interest);
	    	if(interest.type === 'genre'){
	    		$('#show_genres').append('<li class="content">&nbsp;&nbsp;'+interest.interest+'</li>');
	    	}
	    	if(interest.type === 'title'){
	    		$('#show_titles').append('<li>&nbsp;&nbsp;'+interest.interest+'</li>');
	    	}
	    	if(interest.type === 'author'){
	    		$('#show_authors').append('<li>&nbsp;&nbsp;'+interest.interest+'</li>');
	    	}
	    }
	   if($('#show_genres').children().length === 0){
	   	$('#show_genres').empty();
	   }
	   if($('#show_titles').children().length === 0){
	   	$('#show_titles').empty();
	   }
	   if($('#show_authors').children().length === 0){
	   	$('#show_authors').empty();
	   }
	});
}
function fillSection(){
		// $('#info-field').append('<section id="notif_info" class="section"></section>')
		$('#info-field').append('<p class="title is-3">Watchlist</p>');
		$('#info-field').append('<div id="author_interest"><p class="subtitle is-5">You will be notified when books related to these interests are posted: </p></div><br>');
		$('#info-field').append('<ul id="show_titles">Titles: </ul>');
		$('#info-field').append('<ul id="show_authors">Authors: </ul>');
		$('#info-field').append('<ul id="show_genres">Genre: </ul>');
		$('#info-field').append('<br><a id="change_preferences"><button class="button is-primary">Add to Watchlist</button></a>');
}
