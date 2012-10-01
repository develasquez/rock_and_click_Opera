<?php 
header('Access-Control-Allow-Origin: *');

 ?>
<!doctype html>

<html  lang="en">
    <head>
     <meta charset="utf-8">
        <title>Rock and Click - TV</title>
        <link rel="stylesheet" href="css/style.css">
   </head>
   <!--[if gte IE 9]>
          <style type="text/css">
           .gradient {
              filter: none;
           }
        </style>
    <![endif]-->

    <body onkeyup="displayunicode(event);">
        <div id="tv">
            <div id="panel_lateral">
                <img id="logo_rac" class="no-seleccionable" src="img/logo_rac.png">
                <ul>
                    <li class="gradient"><a href="#" id="menuGaleria">Galería</a></li>
                    <!-- <li class="gradient"><a href="#">Wallpapers</a></li> -->
                    <li class="gradient"><a href="#" id="menuVideo">Videos&nbsp;</a></li>
                    <!-- <li class="gradient"><a href="#">Contacto&nbsp;&nbsp;&nbsp;</a></li> -->
                </ul>
              <div class="botonera">
                <a href="#" onClick="botonera.back(this)"><img src="img/atras.png" class="icono" ></a>
                <a href="#" onClick="botonera.play(this)"><img  src="img/pausa.png" class="icono play" ></a>
                <a href="#" onClick="botonera.next(this)"><img src="img/siguiente.png" class="icono" ></a>
              </div>
            </div>
            <div id="div_text">
              <a href="#" id="expandText"> <img id="expandText" src="img/down.png" alt=""></a>
              <p id="p_text"></p>
            </div>
            <img src="img/logo_sony.png" id="logo_sony">
            <div id="videos" >
              <a href="#" id="closeVideo"> <img class="close" src="img/close.png" alt=""></a>
              <div id="videosInside">
                <div id="contenedorVideos">


                </div>
              </div>
            </div>
             <div id="galerias" >
              <a href="#" id="closeGalerias"> 
                <img class="close" src="img/close.png" alt=""></a>
                <div id="galeriaInside">
                  
                </div>
            </div>
        </div>
        <script src="js/libs/jquery-1.7.1.min.js"></script>
        <script src="js/script.js"></script>
   </body>
</html>
