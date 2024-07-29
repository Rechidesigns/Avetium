
const Baseurl = "http://127.0.0.1:8000/api/";

// Fetch data from the API
async function getDaata() {
  try {
    let dat = await fetch(Baseurl + "list-users/");
    let response = await dat.json();
    console.log("Data fetched: ", response);
    return response;
  } catch (error) {
    console.log("Error logged is: ", error);
    return [];
  }
}

// Render the table with fetched data
async function renderTable() {
  const tbody = document.getElementById("reports-table-body");
  tbody.innerHTML = "";
  const datas = await getDaata();

  await datas.forEach((item, index) => {
    console.log(item.id);
    // let i = 
    const row = document.createElement("tr");

    row.innerHTML = `
      <td><input type="checkbox"></td>
      <td>${index + 1}</td>
      <td>${item.full_name}</td>
      <td>${item.organization_name}</td>
      <td>${item.email}</td>
      <td>${item.organization_id}</td>
      <td>
        <button onclick="edit('${item.id}')">✏️</button>
        <button onclick="deleteRow('${item.id}')">🗑️</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", () => renderTable());

let ids;
let state = "login";

const loginButton = document.getElementById("loginbut");
const section = document.getElementById("first");
const login = document.getElementById("login");
const report = document.getElementById("reports");
const signInbutton = document.getElementById("signin");
const label = document.querySelector(".labels");

loginButton.addEventListener("click", () => {
  section.classList.add("hidden");
  login.classList.remove("hidden");
  report.classList.add("hidden");
});

function edit(id) {
  console.log(id);
  signInbutton.textContent = "Edit";
  label.textContent = "Edit";
  section.classList.add("hidden");
  login.classList.remove("hidden");
  report.classList.add("hidden");
  ids = id;
  state = "edit";
}

async function editRow(id) {
  const fullName = document.getElementById("fullname").value;
  const organizationName = document.getElementById("organizationname").value;
  const organizationId = document.getElementById("organizationid").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: fullName,
        organization_name: organizationName,
        email: email,
        organization_id: organizationId,
        password: password,
      }),
    };
    let url = Baseurl + "edit-users/" + id+"/";
    const data = await fetch(url, options);
    const res = await data.json();
    if (data.ok) {
      alert("Successfully edited the data");
      await renderTable();
      section.classList.add("hidden");
      login.classList.add("hidden");
      report.classList.remove("hidden");
    } else {
      alert("Unable to edit data with id " + id);
    }
  } catch (error) {
    console.log(error);
    alert("Unable to edit data with id " + id);
  }
}

async function deleteRow(id) {
  if (confirm("Are you sure?")) {
    try {
      let url = Baseurl + "delete-users/" + id+"/";
      const data = await fetch(url, { method: "DELETE" });
      if (data.ok) {
        alert("Successfully deleted");
        await renderTable();
      } else {
        alert("Unable to delete data with id " + id);
      }
    } catch (error) {
      console.log(error);
      alert("Unable to delete data with id " + id);
    }
  }
}

async function signInUser() {
  const fullName = document.getElementById("fullname").value;
  const organizationName = document.getElementById("organizationname").value;
  const organizationId = document.getElementById("organizationid").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm").value;

  if (state === "edit") {
    return editRow(ids);
  }
  try {
    if (password === confirmPassword) {
      const options = {
        email: email,
        organization_name: organizationName,
        full_name: fullName,
        organization_id: organizationId,
        password: password,
      };
      const response = await fetch(Baseurl + "create-users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      });
      let data = await response.json();
      if (response.ok) {
        alert("Successfully created a user");
        await renderTable();
        section.classList.add("hidden");
        login.classList.add("hidden");
        report.classList.remove("hidden");
      } else {
        alert("Unsuccessfully created a user");
      }
    } else {
      alert("Passwords do not match");
    }
  } catch (error) {
    alert("Unsuccessfully created a user");
    console.error(error);
  }
}

signInbutton.addEventListener("click", signInUser);








