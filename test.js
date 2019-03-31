var prompts = [
{
    prompt: "What is your favorite warmup?",
    weight: 0.3,
    choices: ["9 vowels","octamolly-dominorky","falsetto","pretentious yawning"],
    shift: [[0,0],[0,0],[0,0],[0,0]],
},
{
    prompt: "How many Cornell songs do you know by heart?",
    weight: 0.3,
    choices: ["none","one","two","more"],
    shift: [[0,0],[0,0],[0,0],[0,0]],
},
{
    prompt: "We are in rehearsal singing off key. You",
    weight: 0.1,
    choices: ["don't notice.","doubt yourself.","tell a neighbor.","correct Robert."],
    shift: [[0,0],[0,0],[0,0],[0,0]],
},
{
    prompt: "Where do you prefer to sit in a large rehearsal?",
    weight: 0.1,
    choices: ["no preference","near a friend","next to a stranger","in front of Robert"],
    shift: [[0,0],[0,0],[0,0],[0,0]],
},
{
    prompt: "Why can't you go to chariot?",
    weight: 0.1,
    choices: ["I don't like it.","I have to work/study/sleep.","I get wasted elsewhere","I'll always go."],
    shift: [[0,0],[0,0],[0,0],[0,0]],
},
{
    prompt: "Holy shit, you run into Robert at a party. You",
    weight: 0.1,
    choices: ["panic.","ignore him.","make small talk.","offer him a drink."],
    shift: [[0,0],[0,0],[0,0],[0,0]],
},]

var x = 0.0;
var y = 0.0;
var n = 0;
var questions = [];

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
        questions.push({id:question_id, answered:0});
        for (var j=0; j<prompts[i].choices.length; j++) {
            var button_text = prompts[i].choices[j];
            var button_ = document.createElement('button');
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

function adjustPersonality(questionNumber,choice,select) {
    if (select) { // move to new spot

    }
    else { // move back

    }
}

window.onload = function() {
    createPrompts();
    var submit = document.getElementById('submit');
    submit.className = 'invisible';

    $('.btn').mousedown (function() {
        var id = $(this).closest('div').prop('id');
        var question_index = questions.findIndex(x => x.id===id);
        if($(this).hasClass('selected')) { // unselect option
            $(this).removeClass('selected');
            questions[question_index].answered=0;
            n--;
            adjustPersonality(question_index,$(this).attr('name'),false)
        }
        else {
            if (questions[question_index].answered==1) { // if answered
                // unselect options
                var buttons = document.getElementById(id).getElementsByTagName('button');
                for (i=0; i<buttons.length; i++) {
                    if($(this).hasClass('selected')) {
                        buttons[i].classList.remove('selected');
                        adjustPersonality(question_index,i,false)
                    }
                }
            }
            else { // if not answered
                // mark answered
                questions[question_index].answered=1;
                n++;
                adjustPersonality(question_index,$(this).attr('name'),true)
            }
            // select option
            $(this).addClass('selected');
        }
    })

    $("#submit").click(function() {
        $('<input type="hidden">').attr({
            name: 'x',
            value: x,
        }).appendTo('#submit');
        $('<input type="hidden">').attr({
            name: 'y',
            value: y,
        }).appendTo($('#submit'));
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
