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
			$('#show_form').addClass('menu');
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
			$('#show_form').removeClass('menu');
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
	    	getInterests(userId);
	    	fillSection;
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
	    	if(interest.type === 'genre'){
	    		$('.genre-in').append('<li class="content">&nbsp;&nbsp;'+interest.interest+'</li>');
	    	}
	    	if(interest.type === 'title'){
	    		$('.title-in').append('<li>&nbsp;&nbsp;'+interest.interest+'</li>');
	    	}
	    	if(interest.type === 'author'){
	    		$('.author-in').append('<li>&nbsp;&nbsp;'+interest.interest+'</li>');
	    	}
	    }
	});
}
function fillSection(){
		// $('#info-field').append('<section id="notif_info" class="section"></section>')
		$('#info-field').append('<p class="title is-3">Preferences - Watchlist</p>');
		$('#info-field').append('<div id="author_interest"><p class="subtitle is-5">You will be notified when books related to these interests are posted: </p></div><br>');
		$('#info-field').append('<ul id="show_titles" class="menu-list box">Titles: <ul class="title-in content"><br></ul> </ul>');
		$('#info-field').append('<ul id="show_authors" class="menu-list box">Authors: <ul class="author-in content"><br></ul> </ul>');
		$('#info-field').append('<ul id="show_genres" class="menu-list box">Genre: <ul class="genre-in content"><br></ul> </ul>');
		$('#info-field').append('<br><a id="change_preferences"><button class="button is-outlined is-primary">Add to Watchlist</button></a>');
}
