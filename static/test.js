let prompts = [
  {
    number: 1,
    prompt: "What word best describes GLOZZ?",
    choices: ["annoying", "typical", "unique", "amazing"],
  },
  {
    number: 2,
    prompt:
      "What voice part do you want to sing? (You can choose your current part.)",
    choices: ["Soprano", "Alto", "Tenor", "Bass"],
  },
  {
    number: 3,
    prompt: "Can you whistle?",
    choices: [
      "not at all",
      "sort of but not really",
      "uh no but actually yes",
      "hell yeah",
    ],
  },
  {
    number: 4,
    prompt: "Why did you pick this karaoke song?",
    choices: [
      "Everyone knows it.",
      "I like it personally.",
      "I want to hear someone sing it.",
      "I want to sing it.",
    ],
  },
  {
    number: 5,
    prompt: "What is your favorite warmup?",
    choices: ["9 vowels", "octamolly-dominorky", "falsetto", "other"],
  },
  {
    number: 6,
    prompt: "How many Cornell songs do you know by heart?",
    choices: ["none", "one or two", "several", "most of them"],
  },
  {
    number: 7,
    prompt: "We are in rehearsal singing off key. You",
    choices: [
      "don't care.",
      "don't notice.",
      "tell a neighbor.",
      "bring it up.",
    ],
  },
  {
    number: 8,
    prompt: "Where do you prefer to sit in a large rehearsal?",
    choices: ["by myself", "near a friend", "with my section", "no preference"],
  },
  {
    number: 9,
    prompt: "Why can't you go to chariot?",
    choices: [
      "I don't like chariot.",
      "I have to work/study/sleep.",
      "I go to other parties on Wednesday.",
      "Okay fine, I'll go.",
    ],
  },
  {
    number: 10,
    prompt: "You unexpectly run into Robert at a party. You",
    choices: [
      "panic a little.",
      "ignore him.",
      "make small talk.",
      "throw up on the carpet.",
    ],
  },
];

let x = 0.0;
let y = 0.0;
let n = 0;
let responses = [];

function shuffle(array) {
  //https://bost.ocks.org/mike/shuffle/
  let m = array.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}
// to shuffle array
// shuffle(prompts);

function init() {
  createPrompts();

  let submit = document.getElementById("submit");
  submit.className = "invisible";
}
function createPrompts() {
  // question prompts
  for (let i = 0; i < prompts.length; i++) {
    let prompt_text = prompts[i].prompt;
    let prompt_li = document.createElement("li");
    let prompt_textnode = document.createTextNode(prompt_text);
    prompt_li.className = "question";
    prompt_li.appendChild(prompt_textnode);
    // answer choices
    let question = document.createElement("div");
    let question_id = "question" + i;
    question.setAttribute("id", question_id);
    responses.push({ id: question_id, answered: false });
    for (let j = 0; j < prompts[i].choices.length; j++) {
      let button_text = prompts[i].choices[j];
      let button_ = document.createElement("button");
      button_.setAttribute("type", "button");
      button_.className = "btn";
      button_.name = question_id;
      button_.value = "" + (j + 1);
      let button_textnode = document.createTextNode(button_text);
      button_.title = button_text;
      button_.appendChild(button_textnode);
      question.appendChild(button_);
      prompt_li.appendChild(question);
    }
    // add to html
    document.getElementById("prompts").appendChild(prompt_li);
  }
}

let choices = {};

window.onload = function () {
  init();

  $(".btn").mousedown(function () {
    let id = $(this).closest("div").prop("id");
    let question_index = responses.findIndex((x) => x.id === id);
    const choice = $(this).prop("value");
    if ($(this).hasClass("selected")) {
      // if option is unselected
      $(this).removeClass("selected");
      responses[question_index].answered = false;
      n--;
      delete choices[question_index];
    } else {
      if (responses[question_index].answered) {
        // if a choice is already picked
        // unselect options
        let buttons = document
          .getElementById(id)
          .getElementsByTagName("button");
        for (i = 0; i < buttons.length; i++) {
          if (buttons[i].classList.contains("selected")) {
            buttons[i].classList.remove("selected");
          }
        }
      } else {
        // if not answered
        // mark answered
        responses[question_index].answered = true;
        n++;
      }
      // select option
      $(this).addClass("selected");
      choices[question_index] = choice;
    }
  });

  $("#submit").mousedown(function () {
    const data = encodeURIComponent(JSON.stringify(choices));
    $("#data").prop("value", data);
  });
};

// disable submit button until questions are answered
window.setInterval(function () {
  if (n < prompts.length) {
    submit.classList.add("invisible");
  } else {
    submit.classList.remove("invisible");
  }
}, 100);
