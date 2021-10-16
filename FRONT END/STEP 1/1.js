// title = document.getElementsByClassName('card-title')
// decription = document.getElementsByClassName('card-text')
// for(var i=0; i<decription.length; i++){
//     title[i].innerHTML = 'Tiêu đề change by js',
//     decription[i].innerHTML ='Mô tả'
// }
// var a =  document.querySelectorAll('.card .card-blockquote')
// for(var i=0; i<a.length; i++){
//     a[i].innerHTML ='<button type="button" class="btn btn-primary">Add</button>'
// }
// var b = document.querySelectorAll('[data-thongbao]')
// console.log(b[0]);
// var nut = document.querySelectorAll('.btn')


// function Xuly(){
//     console.log('da click');
//     nut[0].classList.add('btn-warning')
// }
// document.addEventListener('DOMContentLoaded',function(){
//     var nut = document.getElementById('nut');
//     var khoi = document.querySelectorAll('.card')
//     var lan = 1;
//     nut.onclick = function(){
//         if(lan == 1){
//             khoi[0].classList.add('quaday')
//             khoi[0].classList.remove('dixuong')
//             lan = 2
//         }else if (lan ==2){
//             khoi[0].classList.remove('quaday');
//             khoi[0].classList.add('dixuong')

//         }else{
//             lan=1
//         }
//     }

// },false)

// document.addEventListener('DOMContentLoaded',function(){
//     // var nut = document.getElementsByClassName('tamgiac');
//     // var nut = nut[0]
//     // var danhsach = document.getElementsByClassName('danhsach');
//     // var danhsach = danhsach[0];
//     // nut.onclick = function(){
//     //     nut.classList.toggle('tamgiactrang')
//     //     danhsach.classList.toggle('ra')
//     // }
//     nuttongquat= document.getElementsByClassName('nuttongquat')
//     nuttongquat[0].onclick = function(){
//        console.log(this.getAttribute('data-matkhau')); 
//     }
// })
document.addEventListener('DOMContentLoaded', function () {
    nut = document.getElementsByClassName('dehienthi');
    danhsach = document.getElementsByClassName('danhsach');

    for (var i = 0; i < nut.length; i++) {
        nut[i].onclick = function () {
            if (this.classList[1] == 'mautrang') {
                this.classList.remove('mautrang');
                var nd = this.getAttribute('data-hienlen')
                var tt = document.getElementById(nd)
                tt.classList.remove('hienra');
            } else {
                for (var j = 0; j < nut.length; j++) {
                    nut[j].classList.remove('mautrang');
                }
                this.classList.toggle('mautrang')


                var nd = this.getAttribute('data-hienlen')
                var tt = document.getElementById(nd)

                for (var i = 0; i < danhsach.length; i++) {

                    danhsach[i].classList.remove('hienra')
                }

                tt.classList.toggle('hienra');
            }


        }

    }


}, false)