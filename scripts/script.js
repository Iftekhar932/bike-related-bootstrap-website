const bikesContainerBoxID = document.getElementById("bikesContainerBox");
const firstNameBox = document.getElementById("exampleInputFirstName1");
const lastNameBox = document.getElementById("exampleInputLastName1");
const passwordBox = document.getElementById("exampleInputPassword1");
const emailBox = document.getElementById("exampleInputEmail1");
const form = document.getElementById("userInfoForm");
const searchBox = document.querySelector('[aria-label="Search"]'); // in "bikeDisplay.html"
const bikeSearchForm = document.getElementById("bikeSearchFormID"); // in "bikeDisplay.html"
const bikeSearchButton = document.getElementById("bikeSearchButtonID"); // in "bikeDisplay.html"

async function sendInfo() {
  await fetch("http://localhost:4001/register", {
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
  }).then((res) => res.json());
}

async function bikeSearcher() {
  await fetch("../data/bikeData.json")
    .then((res) => res.json())
    .then((data) => {
      const searchedFor = data.motorbikes.filter((bike) => {
        return (
          bike.brand.toLowerCase().includes(searchBox.value.toLowerCase()) ||
          bike.type.toLowerCase() == searchBox.value.toLowerCase() ||
          bike.model.toLowerCase().includes(searchBox.value.toLowerCase()) ||
          bike.color.toLowerCase().includes(searchBox.value.toLowerCase()) ||
          bike.engine.toLowerCase().includes(searchBox.value.toLowerCase())
        );
      });
      if (searchedFor) return displayIndividualBike(searchedFor);
    });
}

searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    withOrWithout(false);
    return bikeSearcher();
  }
});

function withOrWithout(flag) {
  if (flag === false) return;
  return function (e) {
    e.preventDefault();
    if (flag) return;
    console.log("eta");
    return bikeSearcher();
  };
}

bikeSearchForm.addEventListener("submit", withOrWithout());

function displayIndividualBike(bikeInfo) {
  let bikeInfoToDisplay = bikeInfo;

  bikeInfoToDisplay.map((singleBikeInfo) => {
    const { id, brand, model, type, engine, price, color, description, image } =
      singleBikeInfo;

    const singleBikeBox = `
              <img
                class="card-img-top"
                src="${image}"
                alt="${brand}"
                height="auto" width="auto"
              />
              <div class="card-body">
                <h5 class="card-title">Brand: ${brand}</h5>
                <h6 class="card-title">Color: ${color}, Model:${model} with Engine: ${engine}</h6>
                <h6 class="card-title">Type: ${type}</h6>
                <p class="card-text">
               ${description}
                </p>
                <span href="#" class="btn btn-primary">$ ${price}</span>
                </div>`;
    //
    const boxToAppend = document.createElement("div");
    boxToAppend.setAttribute("class", "card p-2 shadow-sm col-3");
    boxToAppend.innerHTML = singleBikeBox;
    bikesContainerBoxID.append(boxToAppend);
  });
}
