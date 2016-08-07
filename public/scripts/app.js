$(() => {
  var userId = $('#user-id').val();
  $.ajax({
    method: "GET",
    url: "/api/users/" + userId + "/books"
  }).done((books) => {
    for(book of books) {
      $(".show_books").append('<a data-bookid="'+book.id+'" class="book_link" href="http://www.google.com">'+book.title+'</a>');
      $(".show_books").append('<div data-bookid="'+book.id+'" class="book_detail"></div>');
    }
  });

  $(".show_books").on("click", ".book_link",function(event){
        event.preventDefault();
        var this_book_id = $(this).data("bookid");
        $.ajax({
          method: "GET",
          url: "/api/books/"+this_book_id
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
                $('div').filter('[data-bookid="'+this_book_id+'"]').append('<p>'+book_title+'</p>');
                if (author){
                $('div').filter('[data-bookid="'+this_book_id+'"]').append('<p>'+author+'</p>');
                }
                if(image){
                  $('div').filter('[data-bookid="'+this_book_id+'"]').append('<img src="'+image+'">');
                } else{
                  $('div').filter('[data-bookid="'+this_book_id+'"]').append('<p>&nbsp no image</p>');
                }
                $('div').filter('[data-bookid="'+this_book_id+'"]').append('<p>Genre: '+genre+'</p>');
                if(page_count){
                $('div').filter('[data-bookid="'+this_book_id+'"]').append('<p>Pages: '+page_count+'</p>');
                }
              } else{
                $('div').filter('[data-bookid="'+this_book_id+'"]').empty();
              }
            } 
          });
      });
  });
  
  


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
