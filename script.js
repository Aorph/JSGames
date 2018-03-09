var usrChoice;
var IAResult;
var score = 0;
$(document).ready(function() {
  $('[data-action="launchGame"]').on('click', function() {
    if (document.getElementById('mainDiv').style.display != "flex") {
      $.get('http://192.168.33.76:3000/init', function(data) {
        document.getElementById('mainDiv').style.display = "flex";
      });
    } else {
      location.reload();
    }
  });
  $('.clickable').on('click', turn);
  function turn() {
    $('.div').off();
    usrChoice = this.dataset.name;
    console.log("data usrChoice = " + usrChoice);
    $.post('http://192.168.33.76:3000/turn', {'usrChoice': usrChoice})
    .done(function(data) {
      $( ".winner" ).html("Winner : " + data.victory);
      if (data.victory == "user") {
        score++;
      } else if (data.victory == "computer") {
        score--;
      }
      $( ".score" ).html("Score : " + score);
      IAResult = data.IAchoice;
      console.log("data IAChoice = " + data.IAchoice);
      console.log("data Victory = " + data.victory);
      battleCSS();
    });
  }
  function battleCSS() {
    $("#ally").css("background-image", "url('./imgs/" + usrChoice + ".png')");
    $("#ally").css("background-size", "50%");
    $("#ally").css("background-repeat", "no-repeat");
    $("#ally").css("background-position", "left");
    $("#enemy").css("background-image", "url('./imgs/" + IAResult + ".png')");
    $("#enemy").css("background-size", "50%");
    $("#enemy").css("background-repeat", "no-repeat");
    $("#enemy").css("background-position", "right");
  }
});
