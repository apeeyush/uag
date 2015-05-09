$(function() {
  var refreshIntervalIds = []
  var timeoutIds = []
  $(".js-start-emulation").click(function(){
    $('.js-stop-emulation').prop('disabled', false);
    $(".js-start-emulation").prop('disabled', true);
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
          "<ul></ul>"+
        "</div>"
      )
      // Start random activity for the user
      activityGenerator(i);
    }

    function activityGenerator(numUser){
      var timeoutId = setTimeout(function(){
        var refreshIntervalId = setInterval(function(){
          var userId = "#user-"+numUser;
          var d = new Date();
          var time = d.getTime();
          var data = {"session":"demo_session","username":userId,"time":time,"application":"DemoApp","activity": "DemoActivity","event":"Testing API","parameters":{"parameter1":"value1"} , "extrakey1":"extravalue1"};
          var request = new XMLHttpRequest();
          request.open('POST', 'http://localhost:3000/api/logs', true);
          request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
          request.send(JSON.stringify(data));
          $(userId+"> ul").append("<li>"+JSON.stringify(data, null, ' ')+"</li>");
        }, 5000);
        refreshIntervalIds.push(refreshIntervalId);
      }, numUser*1000);
      timeoutIds.push(timeoutId)
    }
  });

  $(".js-stop-emulation").click(function(){
    $('.js-stop-emulation').prop('disabled', true);
    $(".js-start-emulation").prop('disabled', false);
    for(var i=0; i<refreshIntervalIds.length; i++){
      clearInterval(refreshIntervalIds[i]);
    }
    for(var i=0; i<timeoutIds.length; i++){
      clearTimeout(timeoutIds[i]);
    }
    refreshIntervalIds = []
    timeoutIds = []
  });

});
