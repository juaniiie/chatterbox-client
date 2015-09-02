// YOUR CODE HERE:

var app = {
  init: function() {
    $(document).ready(function() {
      
      $('#submit').on('click', function()  {
        var message = {
          username: location.search.split('').slice(10).join(''),
          text: $('textarea').val(),
          roomname: $('input').val()
        };

        app.send(message);
        app.clearMessages();
        app.fetch();
        event.preventDefault();
      });

      $('#refresh').on('click', function() {
        app.clearMessages();
        app.fetch();
        event.preventDefault();
      });

      $('#chatroom').on('click', function() { 
        $('#chats').children().show();
        app.displayChatroom($('select').val());
        event.preventDefault();
      });

      $('button').on('click', function() {
        $('#chats').children().show();
        app.displayFriends($(this));
        event.preventDefault();
      });

      app.fetch();
    });
  },

  send: function(message) {
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
    });
  },

  fetch: function() {
    $.ajax({
      url:'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      success: function(data) {
        app.displayMessages(data);
        app.displayChatroomsMenu(data);
        console.log(data['results']);
      },
      error: function(data) {
      }
    })
  },

  clearMessages: function() {
    $('#chats').children().remove();
  },

  displayMessages: function(data) {
    data.results.forEach(function(userData) {
      $(document.createElement('div')).attr("roomname", userData.roomname)
      .attr('username', userData.username)
      .text("username: " + userData['username'] + " text:" + userData['text'] +
        " room:"+userData['roomname']).appendTo($('#chats'));
    });
  },

  displayChatroomsMenu: function(data)  {
    $('select').children().remove();
    var rooms = _.uniq(_.map(data.results, function(userData){
      return userData.roomname;
    }));
    _.each(rooms, function(room) {
      $('select').append('<option value=' + room + '>' + room + '</option>');
    }) 
  },

  displayChatroom: function(room) {  
    _.each($('#chats').children(), function(div) {
      if ($(div).attr("roomname") !== room) {
        $(div).hide();
      }
    });
  },

  // displayFriends: function()  {

  //   $('#chats').children().forEach( function(div) {
  //     $(div).append('<button></button>');

  //     // on('click', function() {
  //     //   // $('#chats').children().show();
  //     //   if ($(div).attr("username") !== $(this).attr("username")) {
  //     //     $(div).hide();
  //   });
  // }
};

app.init();