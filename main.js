'use strict';

function handleSubmitButton() {
    $('#submit-button').on('click', function(event) { 
        event.preventDefault();
        let userName = $('#username-search-bar').val();
        console.log($('#username-search-bar').val());
        getGitHubUser(userName);
    });
}

function getGitHubUser(userName) {
    //Creating fetch url 
    const gitLink = `https://api.github.com/users/${userName}/repos`;
    fetch(gitLink)
    .then(response => response.json())
    .then(responseJson => stringAssembler(responseJson));
    .catch(err =>  )
}

function stringAssembler(responseJson) {
    const results = [];
    for(let i = 0; i < responseJson.length; i++) {
        let repoName = responseJson[i].name;  
        let repoUrl = responseJson[i].html_url;
        results.push(`<li><a href="${repoUrl}"><h2>${repoName}</h2></a></li>`);
    }
    results.join('');
    renderSearchResults(results);
}

function renderSearchResults(results) {
    $('.githubRepos').empty('').append(results);
    $('.search-results').removeClass('hidden');
}

$(handleSubmitButton);