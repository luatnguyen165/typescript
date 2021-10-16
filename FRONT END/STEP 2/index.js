document.addEventListener('DOMContentLoaded',function(){

    nut = document.querySelector('.btn');
    menutrai = document.querySelector('.menutrai')
    den = document.querySelector('.den')
   
    nut.onclick = function(){
        den.classList.add('len')
        menutrai.classList.add('dichphai')
    }
    den.onclick = function(){
        den.classList.remove('len')
        menutrai.classList.remove('dichphai')
    }
},false);