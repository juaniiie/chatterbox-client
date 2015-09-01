// YOUR CODE HERE:

var app = {
  init: function(argument) {
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
    $(document.createElement('div')).text(message).appendTo($('#chats'));
  },


  displayMessages: function(data) {
    data.results.forEach(function(userData) {
      app.addMessage(userData['text']);
    });
  }
};

app.fetch();