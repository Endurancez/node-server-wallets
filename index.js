import express from 'express';
import cors from 'cors';
import walletsRoutes from './routes/wallets.js';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/wallets', walletsRoutes);

// Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
