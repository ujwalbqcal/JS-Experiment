let background_Image = new Image(),
    stop_Image = new Image(),
    base_Image = new Image();

    background_Image.src = "./images/background.png";
    stop_Image.src = "./images/stopScreen.png";
    base_Image.src = "./images/base.png";


    backgroundImage = ()=>{
      ctx.beginPath();
      ctx.drawImage(background_Image,0 ,0,canvas.width,canvas.height);

    }

    groundBaseImage = ()=>{
      ctx.beginPath();
      ctx.drawImage(base_Image,0,canvas.height - GROUNDHEIGHT ,canvas.width, GROUNDHEIGHT);
    }
