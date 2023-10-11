const firstNameBox = document.getElementById("exampleInputFirstName1");
const lastNameBox = document.getElementById("exampleInputLastName1");
const passwordBox = document.getElementById("exampleInputPassword1");
const emailBox = document.getElementById("exampleInputEmail1");
const form = document.getElementById("userInfoForm");

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
