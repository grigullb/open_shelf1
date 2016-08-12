$(() => {
	var userId = $('#user-id').val();
	$('#preferences').on('click', function(){
		getInterests(userId);
		$('#info-field').empty();
		$('#info-field').append('<section id="notif_info" class="section"></section>')
		$('#notif_info').append('<div id="author_interest"><p>You will be notified when books related to these interests are posted: </p></div><br>');
		$('#notif_info').append('<p id="show_titles">Titles: </p>');
		$('#notif_info').append('<p id="show_authors">Authors: </p>');
		$('#notif_info').append('<p id="show_genres">Genres: </p>');
		$('#notif_info').append('<br><a id="change_preferences">Change Notification Preferences</a>');
	});
});

function getInterests(userId){
	$.ajax({
	    method: "GET",
	    url: "/api/users/interests/" + userId
	  }).done((interests) => {
	    for(interest of interests) {
	    	if(interest.type === 'genre'){
	    		$('#show_genres').append('<p>&nbsp;&nbsp;'+interest.interest+'</p>');
	    	} else{
	    		$('#show_genres').remove();
	    	}
	    	if(interest.type === 'title'){
	    		$('#show_titles').append('<p>&nbsp;&nbsp;'+interest.interest+'</p>');
	    	} else{
	    		$('#show_titles').remove();
	    	}
	    	if(interest.type === 'author'){
	    		$('#show_authors').append('<p>&nbsp;&nbsp;'+interest.interest+'</p>');
	    	} else{
	    		$('#show_authors').remove();
	    	}
	    }
	});
}