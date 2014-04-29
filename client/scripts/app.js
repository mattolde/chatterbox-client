$("#chats").append("<div>asdsdasdsasdasds</div>");
// YOUR CODE HERE:

var app = {
  init: function(){
    // get messages
    app.clearMessages();
    app.fetch();
  },
  send: function(message){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data){
        console.log('chatterbox: Message sent');
        console.log(data);
      },
      error: function(data){
        console.error('chatterbox: Failed to send message: ', data.statusText);
      }
    });
  },
  fetch: function(){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      data: {'order': '-createdAt'},
      contentType: 'application/json',

      success: function(data){
        app.clearMessages();
        // display messages to page

        for(var i = 0; i < data.results.length; i++ ){
          var room = data.results[i].roomname;

          var addRoom = true;

          $('#roomSelect option').each(function() {
            if(room === $(this).text() || room === undefined || room === null || room.length <= 0){
              addRoom = false;
            }
          });

          if(addRoom){
            $('#roomSelect').append($("<option></option>").text(room));
          }

          app.addMessage(data.results[i]);
        }
      },
      error: function(data){
        console.error('chatterbox: Failed to fetch message: ', data.statusText);
      }
    });
  },
  clearMessages: function(){
    // TODO : test with just text
    $('#chats').html('');
  },
  addMessage: function(message){

    var userName = message.username;
    var room = message.roomname;
    var userMessage = message.text;

    $('#chats').append('<div class="userMessage ' + room + '" id=' + message.objectId + '><span class="room"></span> - <span class="userName"><a href="#" class="userNameLink"></a></span> <span class="message"></span></div>');

    $('#' + message.objectId + ' .room').text(room);
    $('#' + message.objectId + ' .userNameLink').text(userName);
    $('#' + message.objectId + ' .message').text(userMessage);

    if(userName === app.friends[userName]){
      $('#' + message.objectId).addClass('friend');
    }

    var room = $("#roomSelect option:selected").text();

    if( room === "All" ){
      $(".userMessage").show();
    } else {
      // hide .userMessage
      $(".userMessage").hide();

      // show room
      $("." + room + "").show();
    }

  },
  addRoom: function(room){
    $('#roomSelect').append('<option>'+ room +'</option>');
  },
  friends: {},
  befriend: function(userName){
    if(!app.friends[userName]){
      app.friends[userName] = userName;
    }
  }
};

app.init();

setInterval(function(){
  app.init();
}, 10000);

// onclick submit sendMessage
$(document).on("click", "#submit", function(e){
  e.preventDefault();

  // get userName
  var userName = $("#userName").val();

  // get room
  var room = $("#room").val();

  // get message
  var userMessage = $("#message").val();

  // create message object
  var message = {
    'username': userName,
    'text': userMessage,
    'roomname': room
  };

  // App.sendMessage
  app.send(message);

  app.fetch();
});

$(document).on("change", "#roomSelect", function(){
  app.fetch();
});

$(document).on("click", ".userNameLink", function(e){
  e.preventDefault();
  app.befriend($(this).text());
  app.fetch();
});
