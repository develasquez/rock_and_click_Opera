var iA = 0; //imagenActual
var iT = 0; //Total de Imagenes
var iTPlayer = 0 ;
var iAPlayer=0;
var albumActual= 3;
var myWidth = 240;
var myHeiht = 400;
var verTodas = false;
var jsonPosts = {};
var jsonElPost = {};
var jsonGaleria= {};
var jsonGaleriaPlayer = {}
var jsonDescarga = {};
var galeriaSeleccionada = 0;
var mostroSplash = false;
var twitterUrl = "";
var faceUrl = "";
var networkState = "";
var nombreGaleria = "";
var imageList={};
var videoList={};
var arrow = "down";
var mainGalery = true;

var iniciado = false;
buscaId = function(titulo){
    var theId = 0 ;
    I=0;
    $.each(jsonPosts,function(i,e){

        if(jsonPosts.posts[I].title == titulo)
        {
            theId = jsonPosts.posts[I].id;
        }
        I++;
    });
    return theId;
}
traePost = function (){

    $.getJSON('http://rockandclick.cl?json=get_recent_posts',function(data){

        jsonPosts = data;
        nombreGaleria = jsonPosts.posts[0].slug
   
        traeGaleria(imageList[jsonPosts.posts[0].id])

        nombreGaleria = jsonPosts.posts[0].id;

        text = jsonPosts.posts[0].title +  "| Rock and Click - Radio Futuro 88.9 "
    $("#p_text").html(jsonPosts.posts[0].content);
    });
    
}

traeElPost = function (idPost){

   
     $.getJSON('http://rockandclick.cl?json=get_post&post_id=' + idPost,function(data){
        jsonElPosts = data;
        nombreGaleria = jsonElPosts.post.slug;
         url = jsonElPosts.post.url;
        $("#p_text").html(jsonElPosts.post.content);
        return jsonElPosts.post.content
    });
}
traeTextPost = function (idPost){

   
     $.getJSON('http://rockandclick.cl?json=get_post&post_id=' + idPost,function(data){
        jsonElPosts = data;
        nombreGaleria = jsonElPosts.post.slug;
         url = jsonElPosts.post.url;
        return jsonElPosts.post.content
    });
}

compartir = function (){
    $.mobile.changePage("#share");
}

traeGaleria = function(idGaleria){
    var params= {
        action:'get_galeryImages',
        gallery: idGaleria
    }

    $.get('http://rockandclick.cl/wp-admin/admin-ajax.php',params,function(data){
    
        jsonGaleriaPlayer = JSON.parse(data);
        iTPlayer = jsonGaleriaPlayer.gallery.length;
        $("#tv").css("background-image","url("+jsonGaleriaPlayer.gallery[0].image+")")
        iAPlayer=1;
        //cambiaImagen();
        botonera.play()


    });

}

traeGaleriaPlayer = function(idGaleria){
    var params= {
        action:'get_galeryImages',
        gallery:imageList[ idGaleria]
    }

    traeElPost(idGaleria);
    $.get('http://rockandclick.cl/wp-admin/admin-ajax.php',params,function(data){

        jsonGaleriaPlayer = JSON.parse(data);

        
        iTPlayer = jsonGaleriaPlayer.gallery.length;

        $("#tv").css("background-image","url("+jsonGaleriaPlayer.gallery[0].image+")")

       botonera.cambiaImagen()
    });

}


traeGalerias = function(){

    var params= {
        action:'get_galleries',
        page:1
    }
    $.get('http://rockandclick.cl/wp-admin/admin-ajax.php',params,function(data){

        $("#galeriaInside").html("");
        var newGall = $("<div/>").attr("id","contenedorGalerias"); 


        $.each($(data).find(".title"),function(i,div){
            newGall.append(
                $("<a/>").addClass("bloqueGaleria").attr({"id":"galeria" + i , "href":"#"})
                .append(
                    $("<h1>").addClass("titulo_galeria").text(
                        $(div).text()
                        )
                    )
                );
        })
        $.each($(data).find(".images"),function(i,div){
            var imagesDiv = $(div);
            var gal = i
            $.each(imagesDiv.children(),function(i,a){
    
                  if(i<4){
                    data = {
                        id:buscaId($(newGall).children("#galeria"+gal).children("h1").text())
                        }
                        
                    $(newGall).children("#galeria"+gal).data("data",data).append(
                        $("<img/>").addClass("img_galeria").addClass("no-seleccionable")
                        .attr("src",$(a).children()
                            .attr("src")
                            ))
                }

            })



        })

        $("#galeriaInside").html("");
        $("#galeriaInside").append($(newGall));
$(".bloqueGaleria").mouseover(function(){
  var idGaleriaSelect = parseInt($(this).attr("id").replace("galeria",""))
  var thisWidth = $(this).width()

    $("#contenedorGalerias").css("left", -( thisWidth * idGaleriaSelect )+ 200 + "px")
})
        $(".bloqueGaleria").click(function(){
            galeriaSeleccionada = $(this).data().data.id;
            //$.mobile.changePage("#detalle_galeria");

            traeGaleriaPlayer(galeriaSeleccionada)
            mainGalery= false;
            $("#galeriaInside").html();
            $("#galerias").hide();
        })
        
    });

} 


traeWallpapers = function (){
   
    $.getJSON('http://rockandclick.cl/wallpapers/?json=1',function(data){
  
        jsonWallpapers = data;
        var newWall = $("<div/>");  
        $("#lista_walpapers").html("");
         $.each(jsonWallpapers.page.attachments, function(i,e){
              $(newWall).append( $("<img/>").on("click",function(){
                var obj= $(this).data().data;
                $.mobile.changePage("#wallpaperDownload");
                $("#wall_img_principal").data("data", obj)
                .attr("src",obj.images.thumbnail.url)
                .addClass("wall_img_principal")
                .width("90%")
               // $("#liHD").text("HD - " + obj.images.full.width + " X " + obj.images.full.height)
               // $("#liSD").text("SD - " + obj.images.medium.width + " X " + obj.images.medium.height)                       
            })
            .addClass("img_wallpaper")
            .attr("src", e.images.thumbnail.url ).data("data",e))

        })
 
        $("#lista_walpapers").append($(newWall));


    

    });

}

 iniciaPanel = function(){
    $(".img_menu").on('vmousedown',function(){
        $(this).addClass("img_menu_hover");
    })
    $(".img_menu").on('vmouseup',function(){
        $(this).removeClass("img_menu_hover");
        $('.menu_flotante').slideToggle('fast', function() {});
    })
}



botonera={
reproduce:true,
play:function(This){
    mainGalery=false; 
 if(botonera.reproduce == false){
botonera.reproduce = true
botonera.cambiaImagen()
$(".play").attr("src","img/pausa.png")
 }else{
    botonera.reproduce = false
    $(".play").attr("src","img/play.png")

 }
},
pause:function(){
},
back:function(){
    mainGalery=false;
try{
        if(iAPlayer >= iTPlayer)
        {
            iAPlayer=0;
        }else{
            iAPlayer--;
        }

         $("#tv").css("background-image","url("+jsonGaleriaPlayer.gallery[iAPlayer].image+")")
        //ajustaImagen();
      }catch(e){
 
    }
},
next:function(){
    mainGalery=false;
try{

        if(iAPlayer >= iTPlayer)
        {
            iAPlayer=0;
        }else{
            iAPlayer++;
        }

        $("#tv").css("background-image","url("+jsonGaleriaPlayer.gallery[iAPlayer].image+")")
        //ajustaImagen();
      }catch(e){
 
    }
},
cambiaImagen: function(){
 
if(botonera.reproduce){
 
    try{
        if(iAPlayer >= iTPlayer)
        {
            iAPlayer=0;
        }else{
            
            iAPlayer++;
        }
        $("#tv").css("background-image","url("+jsonGaleriaPlayer.gallery[iAPlayer].image+")")

      }catch(e){
 
    }
    
    setTimeout("botonera.cambiaImagen()", 6000);
  }
}

}



$(function(){



$("#expandText").click(function(){
    $("#div_text").toggleClass("expandido")
    if(arrow == "up"){
      $("#expandText img").attr("src","img/down.png")
      arrow = "down" ; 
  }else{
    $("#expandText img").attr("src","img/up.png")
      arrow = "up" ;
  }
    
})


$("#closeGalerias").click(function(){
    $("#galerias").hide();
    $("#galeriaInside").html("");
})
$("#menuGaleria").click(function(){
    $("#galerias").show();

    traeGalerias();
})

$("#closeVideo").click(function(){
    $("#videos").hide();
    $("#contenedorVideos").html("");
})
$("#menuVideo").click(function(){
    $("#videos").show();
    $("#contenedorVideos").load("http://106.187.55.9/RockNclick/assets/www/wsRac.php?metodo=getListaVideos")
})

$("#panel_lateral").height($(document).height());
$("#panel_lateral ul li").mouseover(function(){

$(this).removeClass("puntahide");
$(this).addClass("punta");
})  

$("#panel_lateral ul li").mouseout(function(){

$(this).removeClass("punta");
$(this).addClass("puntahide");
})  
     var params = {
    
    metodo : "getListaImagenes"
    }
  $.post('http://106.187.55.9/RockNclick/assets/www/wsRac.php',params,function(data){
    
        imageList = JSON.parse(data);

         traePost();
    });
  

    
 

    $("body").on("pagebeforeload", function(){
        iniciaPanel();
          $.mobile.showPageLoadingMsg();

        $(".ui-btn").on('vmousedown',function(){
            $(this).removeClass("ui-btn-up-a");

            $(this).addClass("ui-btn-hove-a");
        });
        $(".ui-btn").on('vmouseup',function(){
            $(this).addClass("ui-btn-up-a");
            $(this).removeClass("ui-btn-hove-a");
        });  
        
    })





    $(document).bind( "pageshow", function( e, data ) {
        $(".ui-content").css("min-height",$(window).height())
    })

    $("#galeria_img_full").css("display","none")
    $(".post_img_principal2")
      .click(function(){
          $("#galeria_img_full").attr("src",$(".post_img_principal2").attr("src"))
          .fadeIn()
          .width($(window).width())
          .height($(window).height())
          .click(function(){
              $(this).fadeOut();
          })
      }) 


})
function init(){
  
    $(".menu_flotante").css("display","none")
    myPrincipalWidth = $('.post_img_principal').width();
    myPrincipalHeiht = $('.post_img_principal').height();
    myContentHeight  = $(".post_div_principal").height();
    myGaleryWidth    = $('.img_carrusel').width();
    myGaleryHeight   = $('.img_carrusel').height();

    
    if (!iniciado){
        iniciado = true;
        iniciaPanel()
    }

}


function cambiaImagen(){

if(mainGalery == true){
    try{
        if(iAPlayer >= iTPlayer)
        {
            iAPlayer=0;
        }else{
            iAPlayer++;
        }

          $("#tv").css("background-image","url("+jsonGaleriaPlayer.gallery[iAPlayer].image+")")
      }catch(e){
 
    }
    setTimeout("cambiaImagen()", 6000);
}
}

 


