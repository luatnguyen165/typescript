$(function() {
    $('.ndmotkhoi').slideUp();
    $('.title').click(function(){
        $('.ndmotkhoi').slideUp();
        $(this).next().slideToggle();
      
    })
})