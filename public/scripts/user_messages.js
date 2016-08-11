$(() => {
	var userId = $('#user-id').val();
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
});