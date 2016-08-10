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
          $("#search-field").append('<p>'+book.title+'</p>');
        }
      });
    });
});