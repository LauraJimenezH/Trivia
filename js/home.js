var answerCorrect = '';
var arrConfirm = [];
var btnNext = document.getElementById('next');
var arrGet = [];
var correctas = 0;
var incorrectas = 0;
var boxCorrectas = document.getElementById('correctas')
var boxIncorrectas = document.getElementById('incorrectas')
var boxName = document.getElementById('nombreUser');


const container = document.getElementById('all-container')
var alert = document.getElementById('alert');


window.addEventListener('load', getApi())
console.log(arrGet);


function getApi() {
    arrConfirm = [];
    const articleRequest = new XMLHttpRequest();
    var category = localStorage.getItem('category');
    var difficulty = localStorage.getItem('difficulty');
    var type = localStorage.getItem('type');
    // var amount = localStorage.getItem('cantQuestions')
    articleRequest.onreadystatechange = function () {
        if (articleRequest.readyState === 4 && articleRequest.status === 200) {
            const data = JSON.parse(this.responseText);
            const response = data.results;
            console.log(data)
            var divInfo = document.createElement('div')
            var infoOne = document.createElement('p');
            var infoTwo = document.createElement('p');
            var spanOne = document.createElement('span')
            var spanTwo = document.createElement('span')
            infoOne.textContent = 'Category: '
            infoTwo.textContent = 'Difficulty: '
            spanOne.setAttribute('id', 'category');
            spanTwo.setAttribute('id', 'difficulty')
            infoOne.appendChild(spanOne)
            infoTwo.appendChild(spanTwo)
            divInfo.appendChild(infoOne)
            divInfo.appendChild(infoTwo)
            divInfo.setAttribute('class', 'info');
            container.appendChild(divInfo);
            var containerQuestion = document.createElement('div');
            var incorrectAnswers = response[0].incorrect_answers;
            var correctAnswer = response[0].correct_answer;
            var divQuestion = document.createElement('h5')
            divQuestion.setAttribute('id', 'question')
            containerQuestion.appendChild(divQuestion);
            divQuestion.innerHTML = response[0].question;
            spanOne.innerHTML = response[0].category;
            spanTwo.innerHTML = response[0].difficulty;
            answerCorrect = correctAnswer;
            var optionsAnswer = shuffleArr(incorrectAnswers, correctAnswer);
            var list = document.createElement('ul');
            var containerAnswer = document.createElement('div')
            containerAnswer.setAttribute('id', 'container-options')
            containerQuestion.appendChild(containerAnswer);
            list.setAttribute('class', 'list-unstyled')
            var result = document.createElement('h5');
            result.setAttribute('id', 'result')
            var resultCorrect = document.createElement('h6');
            resultCorrect.setAttribute('id', 'result-correct')
            containerQuestion.appendChild(result);
            containerQuestion.appendChild(resultCorrect);
            container.appendChild(containerQuestion);
            optionsAnswer.forEach(element => {
                var elementList = document.createElement('li');
                elementList.setAttribute('class', 'list-group-item-action')
                var option = document.createElement('p');
                containerAnswer.appendChild(list);
                list.appendChild(elementList);
                elementList.appendChild(option);
                option.innerHTML = element;
                elementList.setAttribute('onCLick', 'choice(event)')
            });
        } else {
            articleRequest.onerror = handleError;
        }
        console.log(arrGet);

    };
    articleRequest.open('GET', `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=${type}`);
    articleRequest.send();
}

function handleError() {
    console.log('Se ha presentado un error');
}

function shuffleArr(arr, correct) {
    var options = arr;
    options.push(correct)

    for (var i = options.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = options[i];
        options[i] = options[j];
        options[j] = temp;
    }
    return options
}

function choice(event) {
    var result = document.getElementById('result');
    var resultCorrect = document.getElementById('result-correct')
    var element = event.target.parentNode
    btnNext.style.display = 'block';
    btnNext.style.backgroundColor = '#559fe9';
    btnNext.style.color = 'white';
    if (arrConfirm.length > 0) {

    } else {
        if (event.target.textContent === answerCorrect) {
            element.style.backgroundColor = '#65c063';
            element.style.color = 'white';
            result.style.color = '#65c063'
            result.innerHTML = 'Correcto!!'
            arrConfirm.push('1')
            correctas++

        } else {
            element.style.backgroundColor = '#ea634f';
            element.style.color = 'white';
            result.style.color = '#ea634f'
            result.innerHTML = 'Incorrecto!!'
            resultCorrect.innerHTML = 'La respuesta correcta es: ' + answerCorrect
            arrConfirm.push('1')
            incorrectas++
        }
    }
}

function nextQuestion() {
    let i = 0;
    while (container.childElementCount != 0) {
        container.childNodes[0].remove();
    }
    btnNext.style.display = 'none';
    console.log(arrGet);

    arrGet.push(1)
    console.log(arrGet);
    var nombre = localStorage.getItem('nameUser'); 
    if (arrGet.length == localStorage.getItem('cantQuestions')) {
        localStorage.clear();
        alert.style.display = 'block'
        boxName.textContent = nombre

        console.log(correctas, incorrectas)

        boxCorrectas.innerHTML = correctas.toString();
        boxIncorrectas.innerHTML = incorrectas.toString();

    } else {
        getApi();
    }
}

function back() {
    location.href = "../index.html"
}

function fin() {
    location.href = "../index.html"

}