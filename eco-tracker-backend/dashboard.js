document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dataEntryForm');
    form.addEventListener('submit', async (e) => {
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
          form.reset(); // Clear form fields after successful submission
          fetchData(); // Refresh displayed data
        } else {
          const errorData = await response.json();
          console.error('Failed to submit data entry:', errorData.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
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
        tableBody.innerHTML = '';
  
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
  
    fetchData(); // Fetch data on page load
  });
  