
var projectName = 'portfolio';
localStorage.setItem('example_project', 'Personal Portfolio');

var last = 2;
var first = true;
var timerID;
var buttonTimerID;
var hovered = false

function buttonFade(){
  buttonTimerID = setTimeout(function () {
    $("#menuButton").css({ "opacity": "0.5" });
    }, 3000);
}
function menuFade(){
  window.clearTimeout(timerID);
  window.clearTimeout(buttonTimerID);
  $(".navlist").css({ "opacity": "0", "transition": "1s" });
  $("nav ul").css({ "opacity": "0", "transition": "1s", "top": "-150px" });
  $("#menuButton").css({ "opacity": "1" , "transition": "1s"});
  buttonFade();  
}
function menuAppear(){
  window.clearTimeout(timerID);
  window.clearTimeout(buttonTimerID);
  $(".navlist").css({ "opacity": "1", "transition": "1s" });
    $("nav ul").css({ "opacity": "1", "transition": "1s", "top": "0px" });
    $("#menuButton").css({ "opacity": "0" });
  timerID = setTimeout(function () {
    $(".navlist").css({ "opacity": "0", "transition": "1s" });
    $("#menuButton").css({ "opacity": "1" });
    $("nav ul").css({ "opacity": "0", "transition": "1s", "top": "-150px" });
    buttonFade();
  }, 3000);
}  
  

$(window).scroll(function (event) {
  var scroll = $(window).scrollTop();
  if (first == true ) 
  {
    menuAppear();
    setTimeout(function () {
    first=false;
    }, 3000);

  }
  else if (first == false && scroll <= 1) 
  {
    menuAppear();
  }
  else if(first == false && scroll >= 1)
  {
    menuFade();
  }
});

$("#menuButton").click(function () {
  /*if (hovered == false) {*/
    /*hovered = true;*/
    menuAppear();
      /*hovered = false;
  }*/
});

$(".navlinks").click(function(){
  menuFade();
  first = false;
  /*hovered = false;*/
});
  /*$("#menuButton").hover(function(){
      if (hovered == false){
      hovered = true;
      console.log(hovered)
      $(".navlist").css({"opacity":"1","pointer-events":"auto"});
      $(".navlinks").css({"pointer-events":"auto"});
      $("nav ul").css({"opacity":"1","pointer-events":"auto"});
      $("#menuButton").css({"opacity":"0"});
      setTimeout(function(){ 
        $(".navlist").css({"opacity":"0","pointer-events":"none"});
        $("nav ul").css({"opacity":"0","pointer-events":"none"});
        $(".navlinks").css({"pointer-events":"none"});
        $("#menuButton").css({"opacity":"1"});
        hovered = false;
        console.log(hovered)
      }, 3000);
      }
    
    
    else{
      $(".navlist").removeAttr('style');
    }
    console.log(first)
    setInterval(function(){ first = false; }, 3000);
    
    
    if(scroll < last){
      $(".navlist").css({"opacity":"0","transition":"1s"});
      $("nav ul").css({"opacity":"0","transition":"1s"});
    }else if (scroll > last){
      $(".navlist").css({"opacity":"1","transition":"1s"});
      $("nav ul").css({"opacity":"1","transition":"1s"});
    }
    last = scroll;
    
    var fader = $("#work-header");
    var faderOffset = fader.offset();
    console.log(faderOffset);
    
    if(scroll > faderOffset.top){
      $(".navlist").css({"opacity":"0","transition":"1s"});
      $("nav ul").css({"opacity":"0","transition":"1s"});*/
