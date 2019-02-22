'use strict';

function handleSubmitButton() {
    $('#submit-button').on('click', function(event) { 
        event.preventDefault();
        let userName = $('#username-search-bar').val();
        getGitHubUser(userName);
    });
}

function getGitHubUser(userName) {
    const gitLink = `https://api.github.com/users/${userName}/repos`;
    fetch(gitLink)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => stringAssembler(responseJson))
    .catch(err => renderErrorMessage(err));
}

function renderErrorMessage(err) {
    $('.error').removeClass('hidden').text(`Something went wrong: ${err.message}.`);
    $('.githubRepos').empty('');
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
    $('.error').empty();
}

$(handleSubmitButton);