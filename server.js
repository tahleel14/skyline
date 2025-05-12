const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const admissionsFile = path.join(__dirname, 'admissions.json');

// Helper function to read admissions data
function readAdmissions() {
  try {
    if (!fs.existsSync(admissionsFile)) {
      fs.writeFileSync(admissionsFile, JSON.stringify([]));
    }
    const data = fs.readFileSync(admissionsFile);
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading admissions file:', err);
    return [];
  }
}

// Helper function to write admissions data
function writeAdmissions(data) {
  try {
    fs.writeFileSync(admissionsFile, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing admissions file:', err);
  }
}

// API endpoint to receive admission form submissions
app.post('/api/admissions', (req, res) => {
  const { fullName, email, phone, course } = req.body;

  if (!fullName || !email || !phone || !course) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const admissions = readAdmissions();

  const newAdmission = {
    id: admissions.length + 1,
    fullName,
    email,
    phone,
    course,
    submittedAt: new Date().toISOString(),
  };

  admissions.push(newAdmission);
  writeAdmissions(admissions);

  res.status(201).json({ message: 'Admission submitted successfully.', admission: newAdmission });
});

// Serve static files (frontend)
app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
