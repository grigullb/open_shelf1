$(() => {
  var userId = $('#user-id').val();
  showUserBooks(userId);

  $('#settings').on('click', function(){
    $('#info-field').empty();
    showUserInfo(userId);
  })

  $(document).on("click", ".book_link",function(event){
    event.preventDefault();
    var this_book_id = $(this).data("bookid");
    $.ajax({
      method: "GET",
      url: "/api/books/user_books/"+this_book_id
    }).done((book) => {
      var this_isbn = book[0].isbn;
      $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=isbn:"+this_isbn, 
        method: "get",
        dataType: "json",
        success: function (book_info)  {
          var results = book_info.items[0].volumeInfo;
          var book_title = results.title;
          var author = results.authors; //array
          var page_count = results.pageCount;
          var genre = results.categories[0];
          if (results.imageLinks){
            var image = results.imageLinks.thumbnail
          }  //smallThumbnail also available, both are URL links
          var genre = results.categories[0]; //array 
          if($('div').filter('[data-bookid="'+this_book_id+'"]').is(':empty')){
            if (author){
            $('div').filter('[data-bookid="'+this_book_id+'"]').append('<p>'+author+'</p>');
            }
            if(image){
              $('div').filter('[data-bookid="'+this_book_id+'"]').append('<img src="'+image+'">');
            }
            $('div').filter('[data-bookid="'+this_book_id+'"]').append('<p>Genre: '+genre+'</p>');
            if(page_count){
              $('div').filter('[data-bookid="'+this_book_id+'"]').append('<p>Pages: '+page_count+'</p>');
            }
            $('div').filter('[data-bookid="'+this_book_id+'"]').append('<p>Description: '+book[0].condition+'</p>');
          } else {
            $('div').filter('[data-bookid="'+this_book_id+'"]').empty();
          }
        } 
      });
    });
  });

  
});

function showUserBooks(userId){
  $.ajax({
    method: "GET",
    url: "/api/users/" + userId + "/books"
  }).done((books) => {
    for(book of books) {
      $(".show_books").append('<a data-bookid="'+book.id+'" class="book_link title" href="#">'+book.title+'</a>');
      $(".show_books").append('<div data-bookid="'+book.id+'" class="book_detail"></div>');
    }
  });
}
function showUserInfo(userId){
$.ajax({
    method: "GET",
    url: "/api/users/" + userId
  }).done((users) => {
    for(user of users) {
      $('#info-field').append('<section class="section">\
      <div class="show_users"></div>\
      <p class="book-title centered">Your Books:</p>\
      <div class="show_books">\
      </div>')
      $("<div>").text(user.email).appendTo($(".show_users"));
      $.ajax({
        method: "GET",
        url: "/api/users/" + userId + "/books"
      }).done((books) => {
        for(book of books) {
          $(".show_books").append('<a data-bookid="'+book.id+'" class="book_link" href="#">'+book.title+'</a>');
          $(".show_books").append('<div data-bookid="'+book.id+'" class="book_detail"></div>');
        }
      });
    }
  });
}
