const firstNameBox = document.getElementById("exampleInputFirstName1");
const lastNameBox = document.getElementById("exampleInputLastName1");
const passwordBox = document.getElementById("exampleInputPassword1");
const emailBox = document.getElementById("exampleInputEmail1");
const form = document.getElementById("userInfoForm");
const searchBox = document.querySelector('[aria-label="Search"]'); // in navbar
const bikeSearchForm = document.getElementById("bikeSearchFormID");
const bikeSearchButton = document.getElementById("bikeSearchButtonID");

function sendInfo() {
  fetch("http://localhost:4001/register", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      firstName: firstNameBox.value,
      lastName: lastNameBox.value,
      email: emailBox.value.toLowerCase(),
      password: passwordBox.value,
    }),
  })
    .then((res) => res.json())
    .then((d) => console.log(d))
    .catch((err) => console.log(err));
}

async function bikeSearcher() {
  await fetch(`../data/bikeData.json`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.motorbikes);
      const searchedFor = data.motorbikes.filter((bike) => {
        return bike.brand.toLowerCase() == searchBox.value.toLowerCase();
      });
      console.log(searchedFor);
    });
}

searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") return bikeSearcher();
});

bikeSearchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  return bikeSearcher();
});

// bikeSearchButton.addEventListener("click", async function (e) {
//   e.preventDefault();
//   console.log(e.target.value);
//   /*   fetch(`../data/bikeData.json/${searchText}`)
//     .then((res) => res.json())
//     .then((data) => console.log(data.motorbikes)); */
// });
