document.addEventListener('DOMContentLoaded', () => {
    const jsonInput = document.getElementById('jsonInput');
    const submitBtn = document.getElementById('submitBtn');
    const jsonResponseElement = document.getElementById('jsonResponse');
    const formResponseElement = document.getElementById('formResponse');
  
    const showLoader = (element) => {
      element.innerHTML = '<div class="spinner"></div>';
    };
  
    const hideLoader = (element, content) => {
      element.innerHTML = content;
    };
  
    submitBtn.addEventListener('click', async () => {
      const jsonData = jsonInput.value;
  
      try {
        const response = await fetch('https://json-form-app.onrender.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ data: jsonData })
        });
  
        const jsonResponse = await response.json();
        jsonResponseElement.textContent = JSON.stringify(jsonResponse, null, 2);
        formResponseElement.innerHTML = ''; // Clear previous form response
  
        showLoader(formResponseElement);
  
        const formResponse = await fetch('https://json-form-app.onrender.com/latest');
        const formData = await formResponse.json();
  
        hideLoader(formResponseElement, ''); // Clear loader
  
        for (const key in formData) {
          if (formData.hasOwnProperty(key)) {
            const formRow = document.createElement('div');
            formRow.classList.add('form-row');
  
            const label = document.createElement('div');
            label.classList.add('form-label');
            label.textContent = key;
  
            const input = document.createElement('input');
            input.classList.add('form-input');
            input.type = 'text';
            input.value = formData[key];
  
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
  