document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('dataEntryForm').addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const dataType = document.getElementById('dataType').value;
      const value = document.getElementById('value').value;
      const timestamp = document.getElementById('timestamp').value;
  
      try {
        const response = await fetch('http://localhost:5000/api/data-entry', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
          body: JSON.stringify({ dataType, value, timestamp }),
        });
  
        if (response.ok) {
          alert('Data entry successful');
          fetchData(); // Refresh data table after successful entry
        } else {
          console.error('Failed to submit data entry');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  
    // Fetch and display data initially on page load
    fetchData();
  });
  
  async function fetchData() {
    try {
      const response = await fetch('http://localhost:5000/api/data', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      });
      const data = await response.json();
  
      const tableBody = document.getElementById('dataTable').querySelector('tbody');
      tableBody.innerHTML = ''; // Clear existing table data
  
      data.forEach((entry) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${entry.dataType}</td>
          <td>${entry.value}</td>
          <td>${new Date(entry.timestamp).toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  