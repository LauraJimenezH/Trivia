function start() {
    location.href = "view/home.html"
}

var boxName = document.getElementById('nombreUser');
var selectCategory = document.getElementById('selectCategory')
var userName = document.getElementById('userName');
var cantQuestions = document.getElementById('cantQuestions');
var alert = document.getElementById('alert');
window.addEventListener('load', category())
userName.focus();



console.log(userName.value)

function category() {

    localStorage.clear();
    const articleRequest = new XMLHttpRequest();

    articleRequest.onreadystatechange = function () {
        if (articleRequest.readyState === 4 && articleRequest.status === 200) {
            const data = JSON.parse(this.responseText);
            for (let i = 0; i < data.trivia_categories.length; i++) {
                var option = document.createElement('option');
                option.setAttribute('value', data.trivia_categories[i].id)
                option.innerText = data.trivia_categories[i].name
                selectCategory.appendChild(option)
            }
        } else {
            articleRequest.onerror = handleError;
        }
    };
    articleRequest.open('GET', `https://opentdb.com/api_category.php`);
    articleRequest.send();
}

function handleError() {
    console.log('Se ha presentado un error');
}

function choiceCategory(event) {
    localStorage.setItem('category', event.target.value);
    startActive();
}

function choiceDifficulty(event) {
    localStorage.setItem('difficulty', event.target.value);
    startActive();
}

function choiceType(event) {
    localStorage.setItem('type', event.target.value);
    startActive();
}

function startActive() {
    var start = document.getElementById('start');
    var category = localStorage.getItem('category');
    var difficulty = localStorage.getItem('difficulty');
    var type = localStorage.getItem('type');
    if (category && difficulty && type) {
        start.disabled = false;
    } else {
        start.disabled = true;
    }
}

function nameInput(event) {
    localStorage.setItem('nameUser', event.target.value);
    saveActive();
}

function cantInput(event) {
    localStorage.setItem('cantQuestions', event.target.value);
    saveActive();
}

function saveActive() {
    var btnSave = document.getElementById('saveDatos');
    if (localStorage.getItem('nameUser') && localStorage.getItem('cantQuestions')) {
        btnSave.disabled = false;
    } else {
        btnSave.disabled = true;
    }
}

function saveDatos() {
    alert.style.display = 'none';
    boxName.textContent = localStorage.getItem('nameUser');
}