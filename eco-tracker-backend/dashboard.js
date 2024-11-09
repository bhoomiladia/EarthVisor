
// dashboard.js
// dashboard.js

document.addEventListener("DOMContentLoaded", () => {
  const userCount = document.querySelector(".card p");
  const companyCount = document.querySelectorAll(".card p")[1];
  const progressUpdates = document.querySelectorAll(".card p")[2];

  // Sample data
  userCount.textContent = "123";
  companyCount.textContent = "45";
  progressUpdates.textContent = "678";

  // Initialize Charts
  initUserGrowthChart();
  initProgressUpdatesChart();

  // Logout functionality (example)
  document.querySelector(".logout-btn").addEventListener("click", () => {
    alert("Logging out...");
  });
});

function initUserGrowthChart() {
  const ctx = document.getElementById('userGrowthChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Months or other time units
      datasets: [{
        label: 'User Growth',
        data: [10, 20, 30, 40, 50, 60], // Replace with actual data
        borderColor: '#007bff',
        fill: false,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'User Growth Over Time'
        }
      }
    }
  });
}

function initProgressUpdatesChart() {
  const ctx = document.getElementById('progressUpdatesChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Metric 1', 'Metric 2', 'Metric 3', 'Metric 4'], // Replace with actual metric names
      datasets: [{
        label: 'Progress Updates',
        data: [15, 30, 45, 60], // Replace with actual data
        backgroundColor: '#28a745',
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Progress Updates by Metric'
        }
      }
    }
  });
}

// Example: Update stats dynamically
document.addEventListener("DOMContentLoaded", () => {
    const userCount = document.querySelector(".card p");
    const companyCount = document.querySelectorAll(".card p")[1];
    const progressUpdates = document.querySelectorAll(".card p")[2];
  
    // Here you can add fetch requests to update these counts with data from your backend API
    userCount.textContent = "123"; // Sample data
    companyCount.textContent = "45";
    progressUpdates.textContent = "678";
  
    // Example logout button click event
    document.querySelector(".logout-btn").addEventListener("click", () => {
      alert("Logging out...");
      // Here you can add code to clear tokens or session storage for logout functionality
    });
  });
  