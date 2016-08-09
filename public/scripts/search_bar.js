$(() => {
    $(".input").on("keyup change", function() {
        search_term = this.value;
    });
    $(".is-success").on("click",function(){
        var filter = $('.filter').val();
        console.log(filter);
      $.ajax({
      method: "GET",
      url: "/api/books/search/" + filter +"/"+ search_term
      }).done((books) => {
        for(book of books) {
          $(".show_books").append('<a data-bookid="'+book.id+'" class="book_link" href="http://www.google.com">'+book.title+'</a>');
          $(".show_books").append('<div data-bookid="'+book.id+'" class="book_detail"></div>');
        }
      });
    });
});