$.getJSON('/user_verification', function(user_id) {
  if (user_id) {
    var socket = io();
    socket.on('connect', function() {
      socket.emit("user", user_id)
    })
    socket.on('notification', function(message) {
      var n = new Notification(message, { 
          icon: "https://files.slack.com/files-tmb/T027U4K7E-F2229H9JA-d8e7b539bd/shelficon_360.png"
        }); 
    });
  }
})