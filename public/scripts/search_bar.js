$(() => {
    $(".input").on("keyup change", function() {
        search_term = this.value;
    });
    $(document).keyup(function (e){
    if (e.keyCode == 13) {
      if($("#search-field-results").is(':empty')){
        runSearch(search_term);
      } else{
        $("#search-field-results").empty();
        runSearch(search_term);
      }
    }
    })
    $(".is-success").on("click",function(){
        runSearch(search_term);
    });
});

function runSearch(search_term){
      var filter = $('.filter').val();
      console.log(filter);
      $.ajax({
      method: "GET",
      url: "/api/books/search/" + filter +"/"+ search_term
      }).done((books) => {
        for(book of books) {
          $("#search-field-results").append('<p>'+book.title+'</p>');
        }
      });
}