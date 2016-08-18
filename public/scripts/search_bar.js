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
      removeDim();
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
        var book_condition = book[0].condition;
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
                    $('#info-field').append('<p class="title is-4 content">'+book_title+'</p>');
                    if (author){
                      $('#info-field').append('<p class="subtitle is-5">'+author+'</p>');
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
                    $('#info-field').append('<p>Description: '+book_condition+'</p>');
                    $('#info-field').append('<p><em>'+book_owner+'</em> is the owner of this Book. Message <em>'+book_owner+'</em> to show your interested in the book</p>');
                    $('#info-field').append('<textarea id="message_field"></textarea>');
                    $('#info-field').append('<br><button class="button is-primary" id="message_submit_button">Submit</button>');
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
        var subject = $('#info-field > p').first().text();
        var message_content = {text: message_text, senderId: userId, receiverId: book_owner_id, subject: subject};
        console.log(message_content);
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
          $("#search-field-results").append('<a class="book_select" data-idbook="'+book.id+'">'+book.title+'</a><br>');
        }
      });
}

function removeDim(){
  $('#msg_overlay').remove();
  $('#display_messages').remove();
}


