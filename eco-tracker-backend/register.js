document.getElementById('registerForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const companyId = document.getElementById('companyId').value;

  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, companyId })
    });

    const data = await response.json();
    if (response.ok) {
      alert('Registration successful!');
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error('Error registering user:', error);
    alert('Failed to register');
  }
});
