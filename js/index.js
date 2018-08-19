 // coded by @ChaituVR
var projectName = 'portfolio';
localStorage.setItem('example_project', 'Personal Portfolio');

var last = 2;
var first = true;
var hovered = false;

$(window).scroll(function (event) {
  var scroll = $(window).scrollTop();
  console.log(scroll);

  if (scroll <= 1) {
    $(".navlist").css({ "opacity": "0", "transition": "1s" });
    $("nav ul").css({ "opacity": "0", "transition": "1s", "top": "-100px" });
  } else
  if (first == true && scroll >= 1) {
    $(".navlist").css({ "opacity": "1", "transition": "1s" });
    $("nav ul").css({ "opacity": "1", "transition": "1s", "top": "0px" });
    setTimeout(function () {
      first = false;
      $(".navlist").css({ "opacity": "0", "transition": "1s" });
      $("#menuButton").css({ "opacity": "1" });
      $("nav ul").css({ "opacity": "0", "transition": "1s", "top": "-100px" });}, 5000);
  }
});

$("#menuButton").click(function () {
  if (hovered == false) {
    hovered = true;
    console.log(hovered);
    $(".navlist").css({ "opacity": "1", "pointer-events": "auto" });
    $(".navlinks").css({ "pointer-events": "auto" });
    $("nav ul").css({ "opacity": "1", "pointer-events": "auto", "top": "0px" });
    $("#menuButton").css({ "opacity": "0" });
    setTimeout(function () {
      $(".navlist").css({ "opacity": "0", "pointer-events": "none" });
      $("nav ul").css({ "opacity": "0", "pointer-events": "none", "top": "-100px" });
      $(".navlinks").css({ "pointer-events": "none" });
      $("#menuButton").css({ "opacity": "1" });
      hovered = false;
      console.log(hovered);
    }, 3000);
  }

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
});
$(".navlinks").click(function(){
   $(".navlist").css({ "opacity": "0", "pointer-events": "none" });
      $("nav ul").css({ "opacity": "0", "pointer-events": "none", "top": "-100px" });
      $(".navlinks").css({ "pointer-events": "none" });
      $("#menuButton").css({ "opacity": "1" });
      hovered = false;
    });