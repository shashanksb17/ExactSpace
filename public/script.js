document.addEventListener('DOMContentLoaded', () => {
    const jsonInput = document.getElementById('jsonInput');
    const submitBtn = document.getElementById('submitBtn');
    const jsonResponseElement = document.getElementById('jsonResponse');
    const formResponseElement = document.getElementById('formResponse');
  
    submitBtn.addEventListener('click', async () => {
      const jsonData = jsonInput.value;
  
      try {
        const response = await fetch('http://localhost:3000/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ data: jsonData })
        });
  
        const jsonResponse = await response.json();
        jsonResponseElement.textContent = JSON.stringify(jsonResponse, null, 2);
  
        // Clear previous form response
        formResponseElement.innerHTML = '';
  
        // Generate form elements based on JSON data
        for (const key in jsonResponse) {
          if (jsonResponse.hasOwnProperty(key)) {
            const formRow = document.createElement('div');
            formRow.classList.add('form-row');
  
            const label = document.createElement('div');
            label.classList.add('form-label');
            label.textContent = key;
  
            const input = document.createElement('input');
            input.classList.add('form-input');
            input.type = 'text';
            input.value = jsonResponse[key];
  
            formRow.appendChild(label);
            formRow.appendChild(input);
  
            formResponseElement.appendChild(formRow);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });
  