const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/inventory', (req, res) => {
  res.json({ items: [{ id: 1, name: "Sample item", qty: 10 }] });
});

app.get('/', (req, res) => res.send('Inventory API — branch: feature-api'));
app.listen(port, () => console.log(`Inventory API listening on ${port}`));