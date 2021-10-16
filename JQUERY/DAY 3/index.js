document.addEventListener('DOMContentLoaded',function(){
    var menutren = document.querySelector('.menutren')
    window.addEventListener('scroll',function(){
        var status ="lonhon";
        if(window.pageYOffset>100){
            if(status=="lonhon"){
                menutren.classList.add('menu-scroll')
                status ="nhhon"
            }
        }else{
            menutren.classList.remove('menu-scroll')
                status ="lonhon"
        }
    })
})