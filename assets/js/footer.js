var  details_elem = document.querySelectorAll(".footer_top-sub_container details");
fotter_menu_resize();
window.onresize = function(){
    fotter_menu_resize();
}
function fotter_menu_resize(){
    details_elem.forEach(element => {
        if(window.outerWidth >= 1000){
            element.addEventListener("click", toogle);
            element.setAttribute("open",true);
        }else{
            element.removeEventListener("click",toogle);
            element.removeAttribute("open");
        }
    });
}
function toogle(event){
    event.preventDefault();
}

// screen.addEventListener("orientationchange", () => {
//         if(300 <= window.outerWidth <= 1000){
//             screen.orientation.lock();
//         }else{
//             screen.orientation.unlock();
//         }
//         console.log('test');
//   });