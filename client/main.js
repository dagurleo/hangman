import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


Template.game.events({
  'submit .newGame'(event) {
    event.preventDefault();
    const word = event.target.word.value;
    Meteor.call('createNewGame', word);
    event.target.word.value = "";
  }
});

Template.game.helpers({
  game() {
    Meteor.subscribe('Game');
    return Game.find();
  }
});

Template.gameInput.events({
  'submit .enterChar'(event) {
    event.preventDefault();
    const char = event.target.char.value;
    if(char.length == 1) {
      Meteor.call('makeMove', char);
    }
    event.target.char.value = "";
  }
});
