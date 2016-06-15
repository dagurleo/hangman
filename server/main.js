import { Meteor } from 'meteor/meteor';


Meteor.publish('Game', function() {
  return Game.find();
})
Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({

  'createNewGame'(word) {
    word = word.toLowerCase();
    console.log("HElo i got called wow");
    Game.remove({});


    var wordProg = "";
    for(var i = 0; i < word.length; i++) {
      wordProg += '_';
    }
    Game.insert({
        gameId: 1,
        word: word,
        wordProg: wordProg,
        lives: 5
    });
    var obj = Game.find({gameId: 1}).fetch();
    console.log(obj);
  },
  //what the shit are we doing here ????
  'makeMove'(character){
    var obj = Game.findOne({gameId: 1});
    var wordProg = obj.wordProg;
    if(isValid(obj.word, character)) {
      for(var i = 0; i < obj.word.length; i++) {
        if(obj.word[i] == character) {
          if(wordProg[i] == '_') {    //check if already guessed
            wordProg = wordProg.replaceAt(i, character);
            console.log("changed character to " + character);

          } else {
            console.log("already guessed");
            break;
          }
        }
        Game.update({gameId: 1}, {
          $set: {
            wordProg: wordProg,
          }
        });
      }
    }
       else {
        const inArr = Game.findOne({invalidChars: character});
        if(!inArr) {
          const lives = obj.lives - 1;
          Game.update({gameId: 1}, {
            $addToSet: {
              invalidChars: character
            },
            $set: {
              lives: lives
            }
          });
        } else {
          console.log(character + " is already wrong.");
        }


      }
      console.log(Game.findOne({gameId: 1}));
    }

});


function isValid(word, char) {
  for(var i = 0; i < word.length; i++) {
    if(word[i] == char) {
      return true;
    }
  }
  return false;
}

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
