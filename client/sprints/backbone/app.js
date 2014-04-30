(function (){
  window.App = {
    Models: {},
    Collections: {},
    Views: {}
  };

  App.Models.Message = Backbone.Model.extend({
    defaults: {
      username: 'anonymous',
      room: 'lobby'
    },

    initialize: function(message){
      // this.set({
      //   username: message.username,
      //   text: message.text,
      //   room: message.room
      // });

      // return this;
    },

    send: function(){
      console.log('Just sent');
    },

    receive: function(){
      console.log('Just received');
    },
  });

  App.Collections.Messages = Backbone.Collection.extend({});
  App.Collections.Room = Backbone.Collection.extend({});

  App.Views.Rooms = Backbone.View.extend({});
  App.Views.Messages = Backbone.View.extend({});
  App.Views.Message = Backbone.View.extend({});

}());




  // App.Models.User = Backbone.Model.extend({});
  // App.Models.Room = Backbone.Model.extend({});

  // App.Collections.User = Backbone.Collection.extend({});
