document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('admissionForm');
  const formMessage = document.getElementById('formMessage');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    formMessage.textContent = '';
    formMessage.style.color = '';

    const formData = {
      fullName: form.fullName.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      course: form.course.value.trim(),
      aadhar: form.aadhar.value.trim(),
    };

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.course || !formData.aadhar) {
      formMessage.textContent = 'Please fill in all fields.';
      formMessage.style.color = 'red';
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/admissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        formMessage.textContent = 'Admission submitted successfully!';
        formMessage.style.color = 'green';
        form.reset();
      } else {
        const errorData = await response.json();
        formMessage.textContent = errorData.error || 'Failed to submit admission.';
        formMessage.style.color = 'red';
      }
    } catch (error) {
      formMessage.textContent = 'Error submitting admission. Please try again later.';
      formMessage.style.color = 'red';
      console.error('Error:', error);
    }
  });
});
