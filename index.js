function getRepositories() {
  const req = new XMLHttpRequest();

  // line below is part of the response part after we make a response
  req.addEventListener('load', showRepositories);

  req.open('GET', 'https://api.github.com/users/octocat/repos');
  req.send();
}

// callback function that will handle the response
function showRepositories() {

  // line below tells the interpreter that we're working with JSON. we are parsing the responseText
  var repos = JSON.parse(this.responseText);
  // console log the parsed object

  console.log(repos);
  //this is set to the XMLHttpRequest object (req) that fired the event
  // console.log(this.responseText);

  // listing the repositories names
  // let repoList = '<ul>';
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        r.name +
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join('')}</ul>`;

  // for (var i = 0; i < this.responseText.length; i++) {
  //     repoList += '<li>' + this.responseText[i]['name'] + '</li>';
  //   }
  //   repoList += '</ul>';
    document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener('load', showCommits);
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits');
  req.send();
}

function showCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.author.login +
        '</strong> - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('commits').innerHTML = commitsList;
}
