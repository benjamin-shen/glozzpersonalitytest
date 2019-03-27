var prompts = [
{
    prompt: "question1?",
    choices: ["this","this2","that","that2"],
    weight: [[0,0],[0,0],[0,0],[0,0]],
},
{
    prompt: "question2?",
    choices: ["this","this2","that","that2"],
    weight: [[0,0],[0,0],[0,0],[0,0]],
},
{
    prompt: "question3?",
    choices: ["this","this2","that","that2"],
    weight: [[0,0],[0,0],[0,0],[0,0]],
},
{
    prompt: "question4?",
    choices: ["this","this2","that","that2"],
    weight: [[0,0],[0,0],[0,0],[0,0]],
},
{
    prompt: "question5?",
    choices: ["this","this2","that","that2"],
    weight: [[0,0],[0,0],[0,0],[0,0]],
},]

var x = 0;
var y = 0;
var n = prompts.length;
var answers = [];

function shuffle(array) { //https://bost.ocks.org/mike/shuffle/
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}
//// uncomment to shuffle array
// shuffle(prompts);

function createPrompts() {
    // question prompts
    for (var i=0; i<prompts.length; i++) {
        var prompt_li = document.createElement('li');
        var prompt_text = prompts[i].prompt;
        var prompt_textnode = document.createTextNode(prompt_text);
        prompt_li.className = 'question';
        prompt_li.appendChild(prompt_textnode);
        // answer choices
        var choice = document.createElement('div');
        choice.className = 'choice';
        for (var j=0; j<prompts[i].choices.length; j++) {
            var button_ = document.createElement('button');
            var button_text = prompts[i].choices[j];
            var button_textnode = document.createTextNode(button_text);
            button_.className = 'btn';
            button_.title = button_text;
            button_.appendChild(button_textnode);
            choice.appendChild(button_);
            prompt_li.appendChild(choice);
        }
        // add to html
        document.getElementById('prompts').appendChild(prompt_li);
    }
}

window.onload = function(){
    createPrompts();
    
}