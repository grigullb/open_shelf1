$(() => {
    var args = {
        beep: '/vendor/webcodecamjs/audio/beep.mp3',
        decoderWorker: '/vendor/webcodecamjs/js/DecoderWorker.js',
        //autoBrightnessValue: 100,
        resultFunction: function(res) {
            
            alert(res.code);
            //scannedImg.src = res.imgData;

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