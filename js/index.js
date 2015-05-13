$(function() {
  var refreshIntervalIds = [];
  var timeoutIds = [];
  $(".js-start-emulation").click(function(){
    $('.js-stop-emulation').prop('disabled', false);
    $(".js-start-emulation").prop('disabled', true);
    var numUsers = $("#numUsers").val();
    $("#activity-log-container").empty();
    var divSize = 12/numUsers;
    var divclass = "col-sm-"+divSize;
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
          logData = genRandLog(numUser);
          var request = new XMLHttpRequest();
          request.open('POST', 'http://localhost:3000/api/logs', true);
          request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
          request.send(JSON.stringify(logData));
          var userId = "#"+logData['username'];
          $(userId+"> ul").append("<li>"+JSON.stringify(logData, null, ' ')+"</li>");
        }, 5000);
        refreshIntervalIds.push(refreshIntervalId);
      }, numUser*2000);
      timeoutIds.push(timeoutId);
    }

    function genRandLog(numUser){
      var username = "user-"+numUser;
      var d = new Date();
      var time = d.getTime();
      var eventName = 'Event '+(Math.floor(Math.random()*2)+1);
      var extravalue1 = 'Extra Value '+(Math.floor(Math.random()*2)+1);
      var parametervalue1 = 'Parameter Value '+(Math.floor(Math.random()*2)+1);
      var data = {
        'session':'demo_session',
        'username':username,
        'time':time,
        'application':'DemoApp',
        'activity': 'DemoActivity',
        'event':eventName,
        'parameters':{
          'parameter1':parametervalue1
        },
        'extrakey1':extravalue1
      };
      return data;
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
    refreshIntervalIds = [];
    timeoutIds = [];
  });

});
