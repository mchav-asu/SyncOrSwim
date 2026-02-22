const express = require('express');
const path = require('path');
const fs = require('fs');
const open = require('open');
const app = express();
const PORT = 5000;
app.use(express.json());

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  next();
});

app.use('/login', express.static(path.join(__dirname, 'Login & Dashboard')));
app.use('/project', express.static(path.join(__dirname, 'ProjectTemplate')));

app.get('/', (req, res) => {
  res.redirect('/project/survey-prompt.html');
});

app.get('/home', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Project Template</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      background: #D3D3D3;
      display: flex;
      height: 100vh;
      align-items: center;
      justify-content: center;
      margin: 0;
    }
    .container {
      background: #035272;
      color: #FF9B51;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.2);
      text-align: center;
      max-width: 600px;
      width: 90%;
    }
    h1 { margin-top: 0; }
    .links {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-top: 30px;
    }
    a {
      display: block;
      background: #FF9B51;
      color: white;
      text-decoration: none;
      padding: 15px 20px;
      border-radius: 10px;
      font-size: 18px;
      font-weight: bold;
      transition: opacity 0.2s;
    }
    a:hover { opacity: 0.85; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Project Template</h1>
    <p>Select a page to view:</p>
    <div class="links">
      <a href="/login/login.html">Admin Login / Dashboard</a>
      <a href="/project/index.html">Project Services Test</a>
      <a href="/project/company-happenings.html">Company Happenings</a>
    </div>
  </div>
</body>
</html>`);
});

const DATA_PATH = path.join(__dirname, 'questions', 'questions.json');

// Get Current Questions
app.get('/api/questions',( req, res) => {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    res.json(JSON.parse(raw));
  } catch (err) {
    res.status(500).json({error: 'Failed to read questions.json'});
  }
});

// Save Questions
app.post('/api/questions', (req, res) => {
  const {questions} = req.body;

  if (!Array.isArray(questions) || questions.some(q => typeof q !== 'string')) {
    return res.status(400).json({error: 'Questions must be an Array of Strings'});
  }

  try  {
    fs.writeFileSync(DATA_PATH, JSON.stringify({questions}, null, 2), 'utf-8')
    res.json({ok:true});
  } catch (err) {
    res.status(500).json({error: 'Failed to write questions.json'});
  }
});

app.listen(PORT, '0.0.0.0', async () => {
  console.log('Server running on port ' + PORT);
  console.log(`Open: http://localhost:${PORT}/login/login.html`)
  }
);
