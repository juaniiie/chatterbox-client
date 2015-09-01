// YOUR CODE HERE:

var app = {
  init: function() {
    $(document).ready(function() {
      
      $('#submit').on('click', function()  {
        var message = {
          username: 'shawndrost',
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
        console.log('ad');
        event.preventDefault();

      });
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

  addMessage: function(message) {
    // $(document.createElement('div')).text(message).appendTo($('#chats'));
    this.form
  },


  displayMessages: function(data) {
    data.results.forEach(function(userData) {
      $(document.createElement('div')).attr("roomname", userData.roomname).text("text:" + userData['text'] +"room:"+userData['roomname']).appendTo($('#chats'));
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
  }
};

app.init();
app.fetch();