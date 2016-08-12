$(() => {
	var userId = $('#user-id').val();
	$('#preferences').on('click', function(){
		getGenres(userId);
		getAuthors(userId);
		$('#info-field').empty();
		$('#info-field').append('<section id="notif_info" class="section"></section>')
		$('#notif_info').append('<div id="author_interest"><p>Notify me when books by these authors are posted: </p></div>');
		$('#notif_info').append('<div id="genre_interest"><p>Notify me when books with these genres are posted: </p></div>');
		$('#notif_info').append('<br><a id="change_preferences">Change Notification Preferences</a>');
	});
});

function getGenres(userId){
	$.ajax({
	    method: "GET",
	    url: "/api/users/genre_preferences/" + userId
	  }).done((genres) => {
	    for(genre of genres) {
	    	$('#genre_interest').append('<ul id="show_genres"></ul>')
	      $('#show_genres').append('<li>&ensp;&ensp;&ensp;'+genre.genre+'</li>')
	    }
	});
}
function getAuthors(userId){
	$.ajax({
	    method: "GET",
	    url: "/api/users/author_preferences/" + userId
	  }).done((authors) => {
	    for(author of authors) {
	    	$('#author_interest').append('<ul id="show_authors"></ul>')
	      $('#show_authors').append('<li>&ensp;&ensp;&ensp;'+author.first_name+' '+author.last_name+'</li>')
	    }
	});
}