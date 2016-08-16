$(() => {
	var userId = $('#user-id').val();
  var notification = new Notification('Email received', {
  body: 'You have a total of 3 unread emails'
  });
	updateMessageDisplay(userId);
  $('#message_box').on('click', function(){
  	addDim();
  	addPopup();
  	$.ajax({
      method: "GET",
      url: "/api/messages/"+ userId
  	}).done((messages) => {
  		if(messages.length > 0){
  			var message_count = messages.length;
		    for(mes of messages) {
			    $('.panel-tabs').after('<a class="panel-block is-active" href="#"> \
			   	<span class="panel-icon"> \
			    <i class="fa fa-book"></i> \
			    </span> \
			    <span data-count='+message_count+'></span> <p>Subject: '+mes.subject+'</p><p>'+mes.text+'</p> \
			  	</a>');
			  	getUserName(mes.sender_id, message_count);
			  	message_count ++;
          notification;
		    }
		  }else{
		  	$('.panel-tabs').after('<a class="panel-block is-active" href="#"> \
			   	<span class="panel-icon"> \
			    <i class="fa fa-book"></i> \
			    </span> \
			    No Messages \
			  	</a>');
		  }
  	});
  });
});

// currently, just pluralizes the message header if more than one message
function updateMessageDisplay(userId){
  $.ajax({
    method: "GET",
    url: "/api/messages/"+userId
  }).done((messages) => {
    var messageSingular = messages.length;
    $('#message_count').text(messageSingular);
    if(messageSingular===1){
      $('#message_header').text('Message');
    } else{
      $('#message_header').text('Messages');
    }
  });
}

// displays the name of the message sender 
function getUserName(userId, message_count){
  $.ajax({
    method: "GET",
    url: "/api/users/" + userId
  }).done((users) => {
    for(user of users) {
      $('span').filter('[data-count="'+message_count+'"]').text('From '+user.firstname+': ');
    }
  });
}

// dim the background when the popup window appears 
function addDim(){
  $('#search_book_info').remove();
  $('<div id="msg_overlay">').css({
      "width" : "100%"
    , "height" : "100%"
    , "background" : "#000"
    , "position" : "fixed"
    , "top" : "0"
    , "left" : "0"
    , "z-index" : 2
    , "MsFilter" : "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)"
    , "filter" : "alpha(opacity=60)"
    , "MozOpacity" : 0.6
    , "KhtmlOpacity" : 0.6
    , "opacity" : 0.6
    }).appendTo(document.body);
}

// creates a popup window for the messages (can refactor to a bulma 'model')
function addPopup(){
  $('<nav class="panel" id="display_messages"> \
  <p class="panel-heading"> \
    Messages \
  </p> \
  <p class="panel-tabs"> \
    <a class="is-active" href="#">All</a> \
    <a href="#">Read</a> \
    <a href="#">Unread</a> \
  </p> \
  <div class="panel-block"> \
    <button class="button is-primary is-outlined is-fullwidth"> \
      Mark all as Read \
    </button> \
  </div> \
</nav>').css({
      "width" : "50%"
    , "background" : "#ffffff"
    , "position" : "fixed"
    , "top" : "50%"
    , "left" : "50%"
    , "z-index" : 3
    ,'-webkit-transform': 'translate(-50%, -50%)'
    }).appendTo(document.body);
}

