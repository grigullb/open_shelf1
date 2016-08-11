$(() => {
	var userId = $('#user-id').val();
	getMessages(userId);
  $('#message_box').on('click', function(){
  	addDim();
  	addPopup();
  	$.ajax({
    method: "GET",
    url: "/api/messages/"+userId
  	}).done((messages) => {
  		if(messages.length!==0){
  			console.log(messages);
		    for(mes of messages) {
			    $('.panel-tabs').after('<a class="panel-block is-active" href="#"> \
			   	<span class="panel-icon"> \
			    <i class="fa fa-book"></i> \
			    </span> \
			    '+mes.text+' \
			  	</a>');
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

function getMessages(userId){
	$.ajax({
    method: "GET",
    url: "/api/messages/"+userId
  }).done((messages) => {
  	var messageTotal = 0;
    for(mes of messages) {
      console.log(mes);
      messageTotal ++;
    }
    $('#message_count').text(messageTotal);
    if(messageTotal===1){
    	$('#message_header').text('Message');
  	}else{
  		$('#message_header').text('Messages');
  	}
  });
}

