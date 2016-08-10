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
    if(e.keyCode == 27){
      $('#msg_overlay').remove();
      $('#search_book_info').remove();
    }
    })
    $(".is-success").on("click",function(){
        runSearch(search_term);
    });
    $(document).on("click", ".book_select",function(event){
      $('#search_book_info').remove();
      $('<div id="msg_overlay">').css({
      "width" : "100%"
    , "height" : "100%"
    , "background" : "#000"
    , "position" : "fixed"
    , "top" : "0"
    , "left" : "0"
    , "z-index" : 2
    , "MsFilter" : "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)"
    , "filter" : "alpha(opacity=60)"
    , "MozOpacity" : 0.6
    , "KhtmlOpacity" : 0.6
    , "opacity" : 0.6
    }).appendTo(document.body);
    $('<div id="search_book_info" class="card">').css({
      "width" : "50%"
    , "height" : "50%"
    , "background" : "#ffffff"
    , "position" : "fixed"
    , "top" : "50%"
    , "left" : "50%"
    , "z-index" : 3
    ,'-webkit-transform': 'translate(-50%, -50%)'
    }).appendTo(document.body);
    });
    $(document).on("click", "#msg_overlay",function(event){
      $('#msg_overlay').remove();
      $('#search_book_info').css('position', 'absolute').css('top', '60%');
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
          console.log(book);
          $("#search-field-results").append('<a class="book_select" data-idbook="'+book.id+'">'+book.title+'</a>');
        }
      });
}