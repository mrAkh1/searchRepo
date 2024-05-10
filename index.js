const optionsRepo = document.querySelector(".optionsRepo");
const repo_per_page = 5;
const searchInput = document.querySelector(".search");
const repoList = document.querySelector(".repoList");

searchInput.addEventListener("keyup", debounce(searchRepo, 400));

repoList.addEventListener("click", closeCard);

function createRepo(info) {
  const repoElement = document.createElement("li");
  repoElement.classList = "repoElement";
  repoElement.textContent = `${info.name}`;
  optionsRepo.appendChild(repoElement);
  repoElement.addEventListener("click", function () {
    const cardElement = document.createElement("li");
    cardElement.className = "cardElement";
    const cardName = document.createElement("p");
    const cardUser = document.createElement("p");
    const cardStars = document.createElement("p");
    const cardClose = document.createElement("button");
    cardClose.className = "cardClose";

    repoList.appendChild(cardElement);
    cardElement.appendChild(cardName);
    cardElement.appendChild(cardUser);
    cardElement.appendChild(cardStars);
    cardElement.appendChild(cardClose);

    cardName.textContent = `Репозиторий - ${info.name}`;
    cardUser.textContent = `Пользователь - ${info.owner.login}`;
    cardStars.textContent = `Рейтинг - ${info.stargazers_count}`;
    cardClose.textContent = "Закрыть";

    searchInput.value = "";
    clearRepo();
  });
}

async function searchRepo() {
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${searchInput.value}&per_page=${repo_per_page}`
    );
    const data = await response.json();
    clearRepo();
    data.items.forEach((repo) => createRepo(repo));
  } catch (e) {
    console.log("Произошла ошибка", e);
    alert("ОШИБКА СВЯЗИ");
  }
}

function clearRepo() {
  optionsRepo.innerHTML = "";
}

function debounce(fn, debounceTime) {
  let idTime;
  return function (...args) {
    clearTimeout(idTime);
    idTime = setTimeout(() => fn.apply(this, args), debounceTime);
  };
}

function closeCard(e) {
  if (e.target.classList.contains("cardClose")) {
    e.target.parentElement.remove();
  }
}
