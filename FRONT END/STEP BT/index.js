document.addEventListener('DOMContentLoaded',function(){
    menu = document.querySelector('.menu')

    var trangthai ="lon300";
    window.addEventListener('scroll',function(){

        if(window.pageYOffset>300){
            if(trangthai == "lon300"){
                menu.classList.add('nholai')
                trangthai ="nho"
            }
        
        }else if(window.pageYOffset<=300){
            if(trangthai == "nho"){
                menu.classList.remove('nholai')
                trangthai ="lon300"
            }
        }
    })
},false);