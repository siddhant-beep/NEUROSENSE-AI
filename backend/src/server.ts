import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import analyzeRoutes from './routes/analyzeRoutes';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', analyzeRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to NeuroSense API' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});