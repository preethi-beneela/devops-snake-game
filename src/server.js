const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/health', (req, res) => res.json({ status: 'ok' }));
const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}
module.exports = app;