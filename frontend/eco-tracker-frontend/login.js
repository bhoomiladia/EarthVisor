// Assuming you're using Fetch API to send the login request
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    // Sending the POST request to the backend API
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Successfully logged in, store the token (usually in localStorage or sessionStorage)
      localStorage.setItem('token', data.token);
      alert('Login successful!'); // You can redirect to another page
      window.location.href = '/dashboard.html'; // Example redirect
    } else {
      // Handle errors (e.g., invalid credentials)
      alert(data.message || 'Login failed');
    }
  } catch (err) {
    console.error('Error:', err);
    alert('Something went wrong. Please try again.');
  }
});
