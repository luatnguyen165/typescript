document.addEventListener('DOMContentLoaded',function(){
  var  menu = document.querySelector('.menu');
  var vitrikhoivang = document.querySelector('.vitrikhoivang');
    
    var vitri =vitrikhoivang.offsetTop
    col = document.querySelector('.col-md-4')
    window.addEventListener('scroll',function(){
        var trangthai = "lonhon100"
        if(window.pageYOffset>=100){
            
            if(trangthai =="lonhon100"){
               menu.classList.add('menu-scroll');
            }
        }else if(window.pageYOffset<100){
            menu.classList.remove('menu-scroll');
        }
        if(window.pageYOffset >=vitri){
           col.classList.add('vang')
        }else{
            col.classList.remove('vang')
        }
        
    })
},false);