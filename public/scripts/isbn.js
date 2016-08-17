$(() => {
    var args = {
        beep: '/vendor/webcodecamjs/audio/beep.mp3',
        decoderWorker: '/vendor/webcodecamjs/js/DecoderWorker.js',
        autoBrightnessValue: 100,
        resultFunction: function(res) {
            var verifyIsbn = confirm('Your ISBN is: ' + res.code +". Is that correct?");
            if (verifyIsbn) {
               $('#submit-isbn').val(res.code); 
               fillForm(res.code);    
            }
        },
    };
    var decoder = new WebCodeCamJS("#cam");
    decoder.buildSelectMenu("#camera-select").init(args);
  
    decoder.getOptimalZoom();

    $('#play').on('click', () => {
        decoder.pause();
        setTimeout(function() {
          decoder.play();
        }, 150)
    }); 
    $('#stop').on('click', () => {
     decoder.stop();

    });
});

function fillForm(isbn){
$.ajax({
      url: "https://www.googleapis.com/books/v1/volumes?q=isbn:"+isbn, 
      method: "get",
      dataType: "json",
      success: function (book_info)  {
        results = book_info.items[0].volumeInfo;
        book_title = results.title;
        author = results.authors; //array
        page_count = results.pageCount;
        image = results.imageLinks.thumbnail; //smallThumbnail also available, both are URL links
        genre = results.categories[0]; //array 
        $("#submit-title").val(book_title);
        $("#author").val(author);
        $("#submit-genre").val(genre);
      }
    });
}