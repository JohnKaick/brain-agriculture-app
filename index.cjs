import path from 'path';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(process.cwd(), 'dist')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});