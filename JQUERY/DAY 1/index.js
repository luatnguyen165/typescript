$(document).ready(function(){
  
   

   $('.nutso2').click(function(){
    $('.dangky').animate({opacity:0,marginLeft:-100})
    $('.dangnhap').animate({opacity:1,marginLeft:0})
   })
   $('.nutso1').click(function(){
    $('.dangky').animate({opacity:1,marginLeft:0})
    $('.dangnhap').animate({opacity:0,marginLeft:-100})
   })
})