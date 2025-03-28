// input elements in 'bikeDisplay.html'
const bikesContainerBoxID = document.getElementById("bikesContainerBox");

// "index.html" elements
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

/* submitting userInfo for account */
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
        .then((d) => console.log(d));
    } else if (flag === "login") {
      await fetch("http://localhost:4001/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: emailBox.value.toLowerCase(),
          password: passwordBox.value,
        }),
      })
        .then(async (res) => await res.json())
        .then((data) => {
          cookieRecordEraser();
          document.cookie = `accessToken=${data.accessToken}`;
        });
    }
  } catch (error) {
    console.error("✨ 🌟  sendInfo function  script.js line 57 error:", error);
  }
}

const accessTokenModified = document.cookie.replace("accessToken=", "");

// function to erase previously set cookie
function cookieRecordEraser() {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"; // setting past time so that the cookie gets cleared
  }
}

/* searching for bikes with provided input value */
async function bikeSearcher() {
  try {
    await fetch("http://localhost:4001/allBikes", {
      headers: {
        Authorization: `Bearer ${accessTokenModified}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✨ 🌟  bikeSearcher:", data);
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
  } catch (error) {
    console.error("Error in bikeSearcher:", error);
  }
}

/* if user pressed "Enter" button for submission */
let pressed;
searchBox?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    pressed = "submit";
    console.log("Enter pressed");
    return pressed;
  }
});

/* function on form submission  */
bikeSearchForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  bikeSearcher();
  console.log("Form submitted");
});

// getting and displaying bike information
function displayIndividualBike(bikeInfo) {
  let bikeInfoToDisplay = bikeInfo;

  bikesContainerBoxID.innerHTML = ""; // Clear previous results
  console.log(
    "displayIndividualBike called, length:",
    bikeInfoToDisplay.length
  );

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
                <span href="#" class="text-decoration-underline">$ ${price}</span>
                </div>`;

    const boxToAppend = document.createElement("div");
    boxToAppend.setAttribute(
      "class",
      "card p-2 shadow-sm col-sm-4 col-md-4 col-lg-3"
    );
    boxToAppend.innerHTML = singleBikeBox;
    bikesContainerBoxID.append(boxToAppend);
  });
}
