//The div where your profile info will appear, woohoo!! 
const overview = document.querySelector(".overview");

//ul that displays the repos list
const repoList = document.querySelector(".repo-list");


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

fetchReposList = async function () {
    const fetchRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const reposData = await fetchRepos.json();
    //console.log(reposData);
    reposDisplayInfo(reposData);
};
//fetchReposList();

reposDisplayInfo = function (repos) {
    for (const repo of repos) {
        const repoLiItem = document.createElement("li");
        repoLiItem.classList.add("repo");
        repoLiItem.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(repoLiItem);
    }
};