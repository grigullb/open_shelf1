$(function(){
  console.log('ready');
  var results;
  var book_title;
  var author;
  var page_count;
  var image;
  var genre;
    $(".book-submit-test").on('click', function(){
      $('#submit-title').val(book_title);
      $('#submit-author').val(author);
      $('#submit-genre').val(genre);
  });

  $.ajax({
    url: "https://www.googleapis.com/books/v1/volumes?q=isbn:1408855925", 
    method: "get",
    dataType: "json",
    success: function (book_info)  {
      results = book_info.items[0].volumeInfo;
      book_title = results.title;
      author = results.authors; //array
      page_count = results.pageCount;
      image = results.imageLinks.thumbnail; //smallThumbnail also available, both are URL links
      genre = results.categories[0]; //array 
      $(".book-title").text(book_title);
      $(".book-author").text(author);
      $(".book-image").attr("src", image);
      $(".page-count").text(page_count);
      $(".genre").text(genre);
    }
  });

});
