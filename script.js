// DOM Reference Elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const employeeList = document.getElementById("employeeList");
const statusMessage = document.getElementById("statusMessage");

let debounceTimer;

// Fetch Employees from DummyJSON API
async function fetchEmployees(name = "") {
  showStatus("Loading employees...");

  try {
    // API URL using encodeURIComponent as requested
    const url = `https://dummyjson.com/users/search?q=${encodeURIComponent(name)}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }

    const data = await response.json();
    renderEmployees(data.users);
  } catch (error) {
    console.error("Fetch Error:", error);
    showStatus("Failed to load employees. Please try again.", true);
  }
}

// Render Results to DOM
function renderEmployees(users) {
  employeeList.innerHTML = "";

  if (!users || users.length === 0) {
    showStatus("No matching employees found.");
    return;
  }

  showStatus(`Found ${users.length} employee(s).`);

  users.forEach(user => {
    const card = document.createElement("div");
    card.className = "employee-card";

    // Extract relevant job & company details provided by DummyJSON
    const jobTitle = user.company?.title || "Employee";
    const department = user.company?.department || "General";
    const companyName = user.company?.name || "Company";

    card.innerHTML = `
      <img src="${user.image}" alt="${user.firstName} ${user.lastName}">
      <div class="employee-info">
        <h3>${user.firstName} ${user.lastName}</h3>
        <p class="company-title">${jobTitle} — ${department} (${companyName})</p>
        <p><strong>Email:</strong> ${user.email} | <strong>Phone:</strong> ${user.phone}</p>
      </div>
    `;

    employeeList.appendChild(card);
  });
}

// Display Loading/Error Status
function showStatus(text, isError = false) {
  statusMessage.textContent = text;
  statusMessage.style.color = isError ? "#e74c3c" : "#7f8c8d";
}

// Debounce input to avoid spamming the API on every keypress
searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    fetchEmployees(searchInput.value);
  }, 300); // 300ms delay
});

// Manual Search Button Trigger
searchBtn.addEventListener("click", () => {
  fetchEmployees(searchInput.value);
});

// Initial Fetch on Page Load
fetchEmployees();