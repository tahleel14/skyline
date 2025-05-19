document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('paymentForm');
  const paymentDetails = document.getElementById('paymentDetails');
  const printReceiptBtn = document.getElementById('printReceiptBtn');
  const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
  const upiLink = document.getElementById('upiLink');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const amount = form.amount.value.trim();

    if (!name || !phone || !amount || isNaN(amount) || Number(amount) <= 0) {
      alert('Please fill in all fields with valid values.');
      return;
    }

    // Show payment details section
    paymentDetails.style.display = 'block';

    // Store payment info for receipt
    paymentDetails.dataset.name = name;
    paymentDetails.dataset.phone = phone;
    paymentDetails.dataset.amount = amount;

    // Update the UPI link href to open Google Pay app with UPI ID and amount
    const upiId = 'tahleelnisar@okhhdfcbank';
    const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&am=${encodeURIComponent(amount)}&cu=INR`;
    upiLink.href = upiUrl;

    // Show confirm payment button and disable print receipt button
    confirmPaymentBtn.style.display = 'inline-block';
    printReceiptBtn.disabled = true;
  });

  confirmPaymentBtn.addEventListener('click', () => {
    // Enable print receipt button after payment confirmation
    printReceiptBtn.disabled = false;
    // Hide confirm payment button
    confirmPaymentBtn.style.display = 'none';
  });

  printReceiptBtn.addEventListener('click', () => {
    const name = paymentDetails.dataset.name;
    const phone = paymentDetails.dataset.phone;
    const amount = paymentDetails.dataset.amount;
    const upiId = 'tahleelnisar@okhhdfcbank';

    const receiptContent = `
      <html>
      <head>
        <title>Payment Receipt</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h2 { color: #2c3e50; }
          p { font-size: 16px; }
          .receipt-box {
            border: 1px solid #ccc;
            padding: 20px;
            max-width: 400px;
            margin: auto;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
        </style>
      </head>
      <body>
        <div class="receipt-box">
          <h2>Payment Receipt</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone Number:</strong> ${phone}</p>
          <p><strong>Amount Paid:</strong> ₹${amount}</p>
          <p><strong>UPI ID:</strong> ${upiId}</p>
          <p>Thank you for your payment!</p>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '', 'width=500,height=600');
    printWindow.document.write(receiptContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  });
});

