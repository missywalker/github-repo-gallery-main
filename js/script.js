//The div where your profile info will appear, woohoo!! 
const overview = document.querySelector(".overview");

//ul that displays the repos list
const repoList = document.querySelector(".repo-list");

//selects the section witha class of "repos" where all your repo info appears
const allRepoInfo = document.querySelector(".repos");

//selects section with a class of "repo-data" where individual repo data appears
const individualRepoInfo = document.querySelector(".repo-data");

//select back to the repo gallery button 
const backToRepoGalleryButton = document.querySelector(".view-repos");

// search by name placeholder  <input type="text" class="filter-repos hide" placeholder="Search by name" />
const filterInput = document.querySelector(".filter-repos");

const username = "missywalker";

const getData = async function ()  {
const response = await fetch (`https://api.github.com/users/${username}`);
const data = await response.json();
console.log(data);
displayData(data);
};
getData();


const displayData = async function (data) {
  const  newDiv = document.createElement("div");
    newDiv.classList.add("user-info");
    newDiv.innerHTML = ` 
     <figure>
    <img alt="user avatar" src=${data.avatar_url} />
     </figure>
    <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> 
    `;
    overview.append(newDiv);
    fetchReposList();
};

const fetchReposList = async function () {
    const fetchRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const reposData = await fetchRepos.json();
    //console.log(reposData);
    reposDisplayInfo(reposData);
};
//fetchReposList();

const reposDisplayInfo = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoLiItem = document.createElement("li");
        repoLiItem.classList.add("repo");
        repoLiItem.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(repoLiItem);
    }
    filterInput.classList.add("filter-repos");
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specificRepoInfo(repoName);

    }
});

const specificRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);


    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
        console.log(languageData);

        const languages= [];
        for (const language in languageData) {
            languages.push(language);
        }
        displaySpecificRepoInfo(repoInfo, languages);
    };

    const displaySpecificRepoInfo = async function (repoInfo, languages) {
        backToRepoGalleryButton.classList.remove("hide");
        individualRepoInfo.innerHTML = "";
        individualRepoInfo.classList.remove("hide");
        allRepoInfo.classList.add("hide");
        const div = document.createElement("div"); 
        div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
        individualRepoInfo.append(div);
       
        
    }


    backToRepoGalleryButton.addEventListener("click", function () {
        //display the section with the class of "repos" 
        allRepoInfo.classList.remove("hide");
        //add "hide" class to the section where indiv repo data will appear
        individualRepoInfo.classList.add("hide");
        //add hide class to the back to repo gallery button itself
        backToRepoGalleryButton.classList.add("hide");
    });

    filterInput.addEventListener("input", function (e) {
        const searchText= e.target.value;
        const repos = document.querySelectorAll(".repo");
        const searchLowercaseText = searchText.toLowerCase();
        for (const repo of repos) {
          const  repoLowercase = repo.innerText.toLowerCase();
            if (repoLowercase.includes(searchLowercaseText)) {
                repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
    });