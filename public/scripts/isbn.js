$(() => {
    var args = {
        beep: '/vendor/webcodecamjs/audio/beep.mp3',
        decoderWorker: '/vendor/webcodecamjs/js/DecoderWorker.js',
        autoBrightnessValue: 100,
        resultFunction: function(res) {
            var verifyIsbn = confirm('Your ISBN is: ' + res.code +". Is that correct?");
            if (verifyIsbn) {
               $('#submit-isbn').val(res.code);     
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

