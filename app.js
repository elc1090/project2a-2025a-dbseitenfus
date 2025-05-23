// Get the GitHub username input form
const gitHubForm = document.getElementById('gitHubForm');

// Listen for submissions on GitHub username input form
gitHubForm.addEventListener('submit', (e) => {

    // Prevent default form submission action
    e.preventDefault();

    // Get the GitHub username input field on the DOM
    let usernameInput = document.getElementById('usernameInput');
    let repositoryNameInput = document.getElementById('repositoryNameInput');

    // Get the value of the GitHub username input field
    let gitHubUsername = usernameInput.value;
    let repositoryName = repositoryNameInput.value;

    // Run GitHub API function, passing in the GitHub username
    requestUserRepos(gitHubUsername, repositoryName)
        .then(response => response.json()) // parse response into json
        .then(data => {
            console.log(data)
            // update html with data from github
            for (let commit of data) {
                // Get the ul with id of userRepos

                if (data.message === "Not Found") {
                    let ul = document.getElementById('userRepos');

                    // Create variable that will create li's to be added to ul
                    let li = document.createElement('li');

                    // Add Bootstrap list item class to each li
                    li.classList.add('list-group-item')
                    // Create the html markup for each li
                    li.innerHTML = (`
                <p><strong>No account exists with username:</strong> ${gitHubUsername}</p>`);
                    // Append each li to the ul
                    ul.appendChild(li);

                } else {

                    const ul = document.getElementById('userRepos');
                    ul.innerHTML = ''; // limpa resultados anteriores
                
                    for (let commit of data) {
                        const li = document.createElement('li');
                        li.classList.add('list-group-item', 'border-0', 'p-0'); // remove bordas e padding do list item
                
                        const login = commit.author ? commit.author.login : "Autor não disponível";
                        const message = commit.commit.message;
                        const date = new Date(commit.commit.committer.date).toLocaleString();
                
                        li.innerHTML = `
                            <div class="card shadow-sm mb-4 bg-primary text-white">
                                <div class="card-body">
                                    <h5 class="card-title mb-2"><strong>Autor:</strong> ${login}</h5>
                                    <p class="card-text mb-1"><strong>Mensagem:</strong> ${message}</p>
                                    <p class="card-text"><strong>Data:</strong> ${date}</p>
                                </div>
                            </div>
                        `;
                
                        ul.appendChild(li);
                    }
                }
            }
        })
})

function requestUserRepos(username, repo) {
    // create a variable to hold the `Promise` returned from `fetch`
    return Promise.resolve(fetch(`https://api.github.com/repos/${username}/${repo}/commits`));
}
