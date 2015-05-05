$(function() {
  $(".js-submit-query").click(function(){
    var numUsers = $("#numUsers").val();
    $("#activity-log-container").empty();
    var divSize = 12/numUsers;
    var divclass = "col-sm-"+divSize
    for (var i=0; i<numUsers; i++){
      // Add a div for each user's activity
      var divid = "user-"+i
      $("#activity-log-container").append(
        "<div class='"+divclass+"' id='"+divid+"'>"+
          "<h4>"+
            "User "+(i+1)+" Activity"+
          "</h4>"+
        "</div>"
      )
      // Start random activity for the user
      activityGenerator(i);
    }

  function activityGenerator(numUser){
    setInterval(function(){
      var userId = "#user-"+numUser;
      $(userId).append("<p>Hello</p>");
    }, 5000);
  }

  });
});
