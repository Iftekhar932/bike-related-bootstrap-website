// "index.html" elements
const bikesContainerBoxID = document.getElementById("bikesContainerBox");
const form = document.getElementById("userInfoForm");
// signup info input element
const firstNameBox = document.getElementById("signupInputFirstName1");
const lastNameBox = document.getElementById("signupInputLastName1");
const passwordBox = document.getElementById("signupInputPassword1");
const emailBox = document.getElementById("signupInputEmail1");

// login info input element
const loginPasswordBox = document.getElementById("loginInputPassword1");
const loginEmailBox = document.getElementById("loginInputEmail1");

const searchBox = document.querySelector('[aria-label="Search"]'); // in "bikeDisplay.html"
const bikeSearchForm = document.getElementById("bikeSearchFormID"); // in "bikeDisplay.html"
const bikeSearchButton = document.getElementById("bikeSearchButtonID"); // in "bikeDisplay.html"

/* submitting userInfo for account creation */
async function sendInfo(flag) {
  try {
    if (flag === "register") {
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
      })
        .then((res) => res.json())
        .then((data) => console.log(data, "login.script"));
    } else if (flag === "login") {
      await fetch("http://localhost:4001/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        // credentials: "include",
        body: JSON.stringify({
          email: loginEmailBox.value.toLowerCase(),
          password: loginPasswordBox.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("✨ 🌟  .then  tokenValue:", data);
        });
    }
  } catch (error) {
    console.log("✨ 🌟  sendInfo function  script.js line 57 error:", error);
  }
}

/* searching for bikes with provided input value */
async function bikeSearcher() {
  await fetch("http://localhost:4001/allBikes")
    .then((res) => res.json())
    .then((data) => {
      console.log("✨ 🌟  .then  data:", data);
      const searchedFor = data.filter((bike) => {
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

/*  if user pressed "Enter" button for submission */
let pressed;
searchBox?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let pressed = "submit";
    return pressed;
  }
});

/* function on form submission  */
bikeSearchForm?.addEventListener("submit" || pressed, (e) => {
  e.preventDefault();
  bikeSearcher();
});

// getting and displaying bike information
function displayIndividualBike(bikeInfo) {
  let bikeInfoToDisplay = bikeInfo;

  bikeInfoToDisplay.map((singleBikeInfo) => {
    const { id, brand, model, type, engine, price, color, description, image } =
      singleBikeInfo;

    // displaying information in individual boxes
    const singleBikeBox = `
              <img
                class="card-img-top"
                src="${image}"
                alt="${brand}"
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

    const boxToAppend = document.createElement("div");
    boxToAppend.setAttribute(
      "class",
      "card p-2 shadow-sm col-sm-4 col-md-4 col-lg-3"
    );
    // boxToAppend.setAttribute("style", "min-width:100%");
    boxToAppend.innerHTML = singleBikeBox;
    bikesContainerBoxID.append(boxToAppend);
  });
}
