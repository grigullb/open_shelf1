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
      var this_book_id = $(this).data("idbook");
      $('#info-field').empty();
      $("#search-field-results").empty();
      $.ajax({
      method: "GET",
      url: "/api/books/user_books/"+this_book_id
      }).done((book) => {
        var this_isbn = book[0].isbn;
        $.ajax({
          method: "GET",
          url: "/api/users/books/"+this_book_id
          }).done((users) => {
            for(user of users){
              var book_owner = user.firstname;
              book_owner_id = user.id;
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
                  if($('#info-field').is(':empty')){
                    $('#info-field').append('<p>'+book_title+'</p>');
                    if (author){
                      $('#info-field').append('<p>'+author+'</p>');
                    }
                    if(image){
                      $('#info-field').append('<img src="'+image+'">');
                    } else{
                      $('#info-field').append('<p>&nbsp no image</p>');
                    }
                    $('#info-field').append('<p>Genre: '+genre+'</p>');
                    if(page_count){
                      $('#info-field').append('<p>Pages: '+page_count+'</p>');
                    }
                    $('#info-field').append('<p><em>'+book_owner+'</em> is the owner of this Book. Message <em>'+book_owner+'</em> to show your interested in the book</p>');
                    $('#info-field').append('<textarea id="message_field"></textarea>');
                    $('#info-field').append('<button id="message_submit_button">Submit</button>');
                  } else {
                    $('#info-field').empty();
                  }

                 } 
              });
            }
          });
        });
     });


    $(document).on("click", "#msg_overlay",function(event){
      removeDim();
    });
    $(document).on("click", "#message_submit_button", function() {
        var message_text = $("#message_field").val();
        var userId = $('#user-id').val();
        var message_content = {text: message_text, senderId: userId, receiverId: book_owner_id};
        $.ajax({
        type: "POST",
        url: "/api/messages",
        data: message_content,
        success: (data)=>{
          console.log(data);
        }
      });
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
function addDim(){
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
}

function addPopup(){
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
}

function removeDim(){
  $('#msg_overlay').remove();
  $('#search_book_info').css('position', 'absolute').css('top', '65%');
}


