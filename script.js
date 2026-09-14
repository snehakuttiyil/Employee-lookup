async function searchEmployee() {

    const name = document.getElementById("employeeName").value.trim();
    const result = document.getElementById("result");

    if (name === "") {
        result.innerHTML = "Please enter an employee name to search.";
        return;
    }

    result.innerHTML = "Searching...";

    try {

        const url = `https://dummyjson.com/users/search?q=${encodeURIComponent(name)}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch employee data");
        }

        const data = await response.json();

        if (data.users.length === 0) {
            result.innerHTML = "Employee not found.";
            return;
        }

        const employee = data.users[0];

        result.innerHTML = `
            <h2>${employee.firstName} ${employee.lastName}</h2>
            <p><strong>ID:</strong> ${employee.id}</p>
            <p><strong>Email:</strong> ${employee.email}</p>
            <p><strong>Phone:</strong> ${employee.phone}</p>
            <p><strong>Age:</strong> ${employee.age}</p>
            <p><strong>Department:</strong> ${employee.company.department}</p>
            <p><strong>Job Title:</strong> ${employee.company.title}</p>
        `;

    } catch (error) {

        result.innerHTML = "Error: Unable to get employee data.";
        console.error(error);

    }
}
