var prompts = [
{
    number: 1,
    prompt: "What word best describes GLOZZ?",
    choices: ["annoying","typical","unique","amazing"],
},
{
    number: 2,
    prompt: "What voice part do you want to sing? (You can choose your current part.)",
    choices: ["Soprano","Alto","Tenor","Bass"],
},
{
    number: 3,
    prompt: "Can you whistle?",
    choices: ["not at all","sort of but not really","uh no but actually yes","hell yeah"],
},
{
    number: 4,
    prompt: "Why did you pick this karaoke song?",
    choices: ["Everyone knows it.","I like it personally.","I want to hear someone sing it.","I want to sing it."],
},
{
    number: 5,
    prompt: "What is your favorite warmup?",
    choices: ["9 vowels","octamolly-dominorky","falsetto","other"],
},
{
    number: 6,
    prompt: "How many Cornell songs do you know by heart?",
    choices: ["none","one or two","several","most of them"],
},
{
    number: 7,
    prompt: "We are in rehearsal singing off key. You",
    choices: ["don't care.","don't notice.","tell a neighbor.","bring it up."],
},
{
    number: 8,
    prompt: "Where do you prefer to sit in a large rehearsal?",
    choices: ["by myself","near a friend","with my section","no preference"],
},
{
    number: 9,
    prompt: "Why can't you go to chariot?",
    choices: ["I don't like chariot.","I have to work/study/sleep.","I go to other parties on Wednesday.","Okay fine, I'll go."],
},
{
    number: 10,
    prompt: "You unexpectly run into Robert at a party. You",
    choices: ["panic a little.","ignore him.","make small talk.","throw up on the carpet."],
},]

var x = 0.0;
var y = 0.0;
var n = 9;
var responses = [];

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
// to shuffle array
shuffle(prompts);

function init() {
    createPrompts();

    var submit = document.getElementById('submit');
    submit.className = 'invisible';
}
function createPrompts() {
    // question prompts
    for (var i=0; i<prompts.length; i++) {
        var prompt_text = prompts[i].prompt;
        var prompt_li = document.createElement('li');
        var prompt_textnode = document.createTextNode(prompt_text);
        prompt_li.className = 'question';
        prompt_li.appendChild(prompt_textnode);
        // answer choices
        var question = document.createElement('div');
        var question_id = 'question'+i;
        question.setAttribute('id',question_id);
        responses.push({id:question_id, answered:false});
        for (var j=0; j<prompts[i].choices.length; j++) {
            var button_text = prompts[i].choices[j];
            var button_ = document.createElement('button');
            button_.setAttribute("type", "button");
            button_.className = 'btn';
            button_.name = '' + j;
            var button_textnode = document.createTextNode(button_text);
            button_.title = button_text;
            button_.appendChild(button_textnode);
            question.appendChild(button_);
            prompt_li.appendChild(question);
        }
        // add to html
        document.getElementById('prompts').appendChild(prompt_li);
    }
}

window.onload = function() {
    init();

    $('.btn').mousedown (function() {
        var id = $(this).closest('div').prop('id');
        var question_index = responses.findIndex(x => x.id===id);
        if($(this).hasClass('selected')) { // if option is unselected
            $(this).removeClass('selected');
            responses[question_index].answered=false;
            n--;
        }
        else {
            if (responses[question_index].answered) { // if a choice is already picked
                // unselect options
                var buttons = document.getElementById(id).getElementsByTagName('button');
                for (i=0; i<buttons.length; i++) {
                    if(buttons[i].classList.contains('selected')) {
                        buttons[i].classList.remove('selected');
                    }
                }
            }
            else { // if not answered
                // mark answered
                responses[question_index].answered=true;
                n++;
            }
            // select option
            $(this).addClass('selected');
        }
    })
}

// disable submit button until questions are answered
window.setInterval(function() {
    if (n<prompts.length) {
        submit.classList.add('invisible');
    }
    else {
        submit.classList.remove('invisible');
    }
}, 100)
