(function(){
  $(function(){
  
    var populateForm = function(){
      $(".book-submit-test").on('click', function(){
        $('#submit-title').val(book_title);
        $('#author').val(author);
        $('#submit-genre').val(genre);
      });
    }

    $('.book-submit-form').on('submit', () => {
      var form_data = $('.book-submit-form').serialize();
      $.ajax({
        type: "POST",
        url: "/api/books",
        data: form_data,
        success: (data)=>{
          console.log(data);
        }
      });
    });

    $.ajax({
      url: "https://www.googleapis.com/books/v1/volumes?q=isbn:1408855925", 
      method: "get",
      dataType: "json",
      success: function (book_info)  {
        var results = book_info.items[0].volumeInfo;
        var book_title = results.title;
        var author = results.authors; //array
        var page_count = results.pageCount;
        var image = results.imageLinks.thumbnail; //smallThumbnail also available, both are URL links
        var genre = results.categories[0]; //array 
        $(".book-title").text(book_title);
        $(".author").text(author);
        $(".book-image").attr("src", image);
        $(".page-count").text(page_count);
        $(".genre").text(genre);
      }
    });

    populateForm();
  });
})();


