function start() {
    location.href = "/public/index.html"
}

var selectCategory = document.getElementById('selectCategory')
window.addEventListener('load', category())

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
    var start = document.getElementById('start');
    var category = localStorage.getItem('category');
    var difficulty = localStorage.getItem('difficulty');
    if(category && difficulty) {
        start.disabled = false;
    }else {
        start.disabled = true;
    }
}

function choiceDifficulty(event) {
    localStorage.setItem('difficulty', event.target.value);
    var start = document.getElementById('start');
    var category = localStorage.getItem('category');
    var difficulty = localStorage.getItem('difficulty');
    if(category && difficulty) {
        start.disabled = false;
    }else {
        start.disabled = true;
    }
}

