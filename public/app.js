var answerCorrect = '';
var arrConfirm = [];
var btnNext = document.getElementById('next');

const container = document.getElementById('all-container')

window.addEventListener('load', getApi())


function getApi() {
    arrConfirm = [];
    const articleRequest = new XMLHttpRequest();

    articleRequest.onreadystatechange = function () {
        if (articleRequest.readyState === 4 && articleRequest.status === 200) {
            const data = JSON.parse(this.responseText);
            const response = data.results;
            var incorrectAnswers = response[0].incorrect_answers;
            var correctAnswer = response[0].correct_answer;
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
            var divQuestion = document.createElement('h5')
            divQuestion.setAttribute('id', 'question')
            container.appendChild(divQuestion);
            divQuestion.innerHTML = response[0].question;
            spanOne.innerHTML = response[0].category;
            spanTwo.innerHTML = response[0].difficulty;
            answerCorrect = correctAnswer;
            
            var optionsAnswer = shuffleArr(incorrectAnswers, correctAnswer);
            console.log(optionsAnswer)
            var list = document.createElement('ul');
            var containerAnswer = document.createElement('div')
            containerAnswer.setAttribute('id', 'container-options')
            container.appendChild(containerAnswer);
            list.setAttribute('class', 'list-unstyled')
            var result = document.createElement('h5');
            result.setAttribute('id', 'result')
            var resultCorrect = document.createElement('h6');
            resultCorrect.setAttribute('id', 'result-correct')
            container.appendChild(result);
            container.appendChild(resultCorrect);
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
    };
    articleRequest.open('GET', `https://opentdb.com/api.php?amount=1`);
    articleRequest.send();

}

function handleError() {
    console.log('Se ha presentado un error');
}

function shuffleArr(arr, correct) {
    console.log(arr, correct)
    var options = arr;
    options.push(correct)
    // console.log('normal',options)

    for (var i = options.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = options[i];
        options[i] = options[j];
        options[j] = temp;
    }
    return options
}

if (arrConfirm.length > 0) {

}


function choice(event) {
    var result = document.getElementById('result');
    var resultCorrect = document.getElementById('result-correct')
    console.log(event.target.textContent)
    console.log(answerCorrect);
    var element = event.target.parentNode
    console.log(element)
    console.log(element)
    console.log(arrConfirm.length)
    btnNext.style.display = 'block';
    btnNext.style.backgroundColor = '#3a8cde';
    btnNext.style.color = 'white';
    if (arrConfirm.length > 0) {

    } else {
        if (event.target.textContent === answerCorrect) {
            element.style.backgroundColor = '#65c063';
            element.style.color = 'white';
            result.style.color = '#65c063'
            result.innerHTML = 'Correcto!!'
            arrConfirm.push('1')

        } else {
            element.style.backgroundColor = '#ea634f';
            element.style.color = 'white';
            result.style.color = '#ea634f'
            result.innerHTML = 'Incorrecto!!'
            resultCorrect.innerHTML = 'La respuesta correcta es: ' + answerCorrect
            arrConfirm.push('1')
        }
    }

}

function nextQuestion() {
    console.log(container.childElementCount)
    // container.remove();

    // var containerAll = document.createElement('div');
    // containerAll.setAttribute('id', 'all-container')
    console.log(container.childElementCount)
    let i = 0;
    while (container.childElementCount != 0) {
        container.childNodes[0].remove();
        
    }

    btnNext.style.display = 'none';

    // debugger



    getApi();
}