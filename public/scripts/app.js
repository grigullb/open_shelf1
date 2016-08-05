$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;

  $.ajax({
    url: "https://www.googleapis.com/books/v1/volumes?q=isbn:1408855925", 
    method: "get",
    dataType: "json",
    success: function (book_info)  {
      console.log(book_info);
      var results = book_info.items[0].volumeInfo;
      var book_title = results.title;
      var author = results.authors; //array
      var page_count = results.pageCount;
      var image = results.imageLinks.thumbnail; //smallThumbnail also available, both are URL links
      var genre = results.categories[0]; //array 
      $(".book-title").text(book_title);
      $(".book-author").text(author);
      $(".book-image").attr("src", image);
      $(".page-count").text(page_count);
      $(".genre").text(genre);
    }
  });

});
