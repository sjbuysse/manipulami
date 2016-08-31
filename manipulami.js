var manipulami = ( function(){
    var c = document.querySelector('canvas');
    var ctx = c.getContext("2d");
    var imgData, numPixels;
    var exports = {};

    exports.paintGreen = function(){
        for(var i = 0; i < numPixels; i ++){
            if(i % 10 === 0){
                imgData.data[4 * i + 1] = 255;
                imgData.data[4 * i + 3] = 255;
            }
        }
        ctx.putImageData(imgData, 0, 0);
    };

    exports.grayScale = function(){
        var r, g, b, gray;
        for(var i = 0; i < numPixels; i++){
            r = imgData.data[i*4];
            g = imgData.data[i*4 +1];
            b = imgData.data[i*4 +2];

            gray = (0.3*r + 0.59*g + 0.11*b);

            imgData.data[i*4] = 
            imgData.data[i*4 +1] =  
            imgData.data[i*4 +2] = gray;
        }
        ctx.putImageData(imgData, 0, 0);
    };

    function fileHandler(evt){
        var file = evt.target.files[0];

        var reader = new FileReader();
            //when a file has been read execute following function
            reader.onload = function(evt){
                var data = reader.result;

                var image = new Image();
                image.onload = function(){
                    var r = this.width / c.width;
                    var nh = this.height / r; 
                    c.setAttribute("height", nh);
                    ctx.drawImage(this, 0,0, c.width, nh);
                    imgData = ctx.getImageData(0,0,c.width,c.height);
                    numPixels = imgData.data.length / 4;
                }
                image.src = data;
            }
        reader.readAsDataURL(file);
    }
    document.getElementById('file').addEventListener('change', fileHandler);

    return exports;
} )();
