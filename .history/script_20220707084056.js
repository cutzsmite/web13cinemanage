let dataMovie = [
  {
    name: 'MichealKenKo'
  },
  {
    name: 'Donchee'
  },
  {
    name: 'THC Farm'
  },
  {
    name: 'D3mon666'
  },
]


//home page section





//purchase ticket section
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const search = document.getElementById('search')
const searchBar = document.getElementById('searchBar')
const searchMovie = document.getElementById('searchMovie')
const renderMovie = document.getElementById('renderMovie')

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}


// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        console.log(seat.classList.add("selected"));
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
    console.log(selectedMovieIndex)
  }
}
console.log(populateUI())
// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("sold")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();

//appear hidden searchBar

search.addEventListener("click", (e) => {
  // if (searchBar.classList.contains('hidden')) {
  //   searchBar.classList.remove('hidden')
  // } else {
  //   searchBar.classList.add('hidden')
  // }

  searchBar.classList.toggle('hidden')
  renderMovie.classList.toggle('hidden')
})

searchBar.addEventListener("click", (e) => {
  e.stopPropagation()
})

//search movie

searchMovie.addEventListener('change', (e) => {
  let data = dataMovie.filter((movie) => movie.name.includes(e.target.value))
  console.log(data)
})