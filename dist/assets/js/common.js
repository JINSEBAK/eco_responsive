$(window).scroll(function(){
    var top = $(this).scrollTop();
    (top > 10)?$('header').addClass('fixed'):$('header').removeClass('fixed');

    var left = $(this).scrollLeft();
    
    $('header').css('transform','translateX(-'+left+'px)')
})

$(function(){
    AOS.init({
        offset: 300, // offset (in px) from the original trigger point
        duration: 900, // values from 0 to 3000, with step 50ms
        easing: 'ease-out', // default easing for AOS animations
        once: true, // whether animation should happen only once - while scrolling down
    });

    $('header nav>ul>li').hover(
        function() {
            $('.depth', this).stop().slideDown(300);
        },
          function() {
          $('.depth', this).stop().slideUp(300);
        }
    );
})

// GET api 호출
function dataGet(urlval, reqParam, useToken = true, async = true) {
    //console.log(urlval);
  
      return $.ajax({
          url: urlval,
          type: "GET",
          async: async,
          dataType: "",
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          traditional: true,
          data: reqParam,
          beforeSend: function (xhr) {
          },
          complete: function () {},
      }).done(function(resp) {
      });
  }

  function getParameters(paramname) {
    var returnValue;
    var url = location.href;
    var parameters = url.slice(url.indexOf("?") + 1, url.length).split("&");

    for (var param of parameters) {
            var varName = param.split("=")[0];
            if (varName.toUpperCase() == paramname.toUpperCase()) {
                returnValue = param.split("=")[1];
                return decodeURIComponent(returnValue);
            }
    }
}