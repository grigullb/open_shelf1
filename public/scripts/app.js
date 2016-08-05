$(() => {
  var userId = $('#user-id').val();
  $.ajax({
    method: "GET",
    url: "/api/users/" + userId + "/books"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.title).appendTo($(".show_books"));
    }
  });;
  


$.ajax({
    method: "GET",
    url: "/api/users/" + userId
  }).done((users) => {
    for(user of users) {
    $("h1").text(user.firstname + "'s Profile Page");
      $("<div>").text(user.email).appendTo($(".show_users"));
    }
  });
  

});
