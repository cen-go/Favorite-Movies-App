const startAddMovieButton = document.querySelector("header button");
const addMovieModal = document.getElementById("add-modal");
const backdrop = document.getElementById("backdrop");
const modalCancelButton = addMovieModal.querySelector(".btn--passive");
const modalAddButton = modalCancelButton.nextElementSibling;
const movieInputs = addMovieModal.querySelectorAll("input")
const entryText = document.getElementById("entry-text");
const movieList = document.getElementById("movie-list");
const deleteMovieModal = document.getElementById("delete-modal");

let movies = [];

const updateUI = () => {
  if (movies.length === 0) {
    entryText.style.display = "block";
  } else {
    entryText.style.display = "none";
  }
};

const closeMovieDeletionModal = () => {
  backdrop.classList.remove("visible");
  deleteMovieModal.classList.remove("visible");
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${imageUrl}" alt="${title} image">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `;
  movieList.append(newMovieElement);

  newMovieElement.addEventListener("click", () => {
    deleteMovieModal.classList.add("visible");
    toggleBackdrop();

    const deleteModalCancelButton = deleteMovieModal.querySelector(".btn--passive");
    let deleteModalYesButton = deleteModalCancelButton.nextElementSibling;

    deleteModalYesButton.replaceWith(deleteModalYesButton.cloneNode(true));
    deleteModalYesButton = deleteModalCancelButton.nextElementSibling;
    deleteModalCancelButton.removeEventListener("click", closeMovieDeletionModal);
    deleteModalCancelButton.addEventListener("click", closeMovieDeletionModal);
    deleteModalYesButton.addEventListener("click", () => {
      newMovieElement.remove();
      closeMovieDeletionModal();
      
      for (const movie of movies) {
        if (movie.id === id) {
          movies.splice(movies.indexOf(movie), 1);
          updateUI();
          return;
        }
      }
    });
  });
};

const toggleBackdrop = () => backdrop.classList.toggle("visible"); 

const closeMovieModal = () => {
  addMovieModal.classList.remove("visible");
  backdrop.classList.remove("visible");  
};

const showMovieModal = () => {
  addMovieModal.classList.add("visible")
  toggleBackdrop();
};

const clearMovieInputs = () => {
  for (const input of movieInputs) {
    input.value = "";
  }
};

const cancelHandler = () => {
  closeMovieModal();
  clearMovieInputs();
};

const backdropHandler = () => {
  closeMovieModal();
  closeMovieDeletionModal();
  clearMovieInputs();
};

const addMovieHandler = () => {
  const titleValue = movieInputs[0].value;
  const movieImageValue = movieInputs[1].value;
  const ratingValue = movieInputs[2].value;

  if (
    titleValue.trim() === "" ||
    movieImageValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("Please enter valid input. Rating should be between 1 and 5");
    return;
  }
  const newMovie = {
    id : Math.random().toString(),
    title : titleValue,
    image : movieImageValue,
    rating : ratingValue
  };
  movies.push(newMovie);
  closeMovieModal();
  clearMovieInputs();  
  updateUI();
  renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
};

startAddMovieButton.addEventListener("click", showMovieModal);
modalCancelButton.addEventListener("click", cancelHandler);
backdrop.addEventListener("click", backdropHandler);
modalAddButton.addEventListener("click", addMovieHandler);
