import express from 'express';
import { getWallets, createWallet, addTransaction } from '../controllers/wallets.js';

const router = express.Router();

router.get('/', getWallets);

router.post('/', createWallet);

router.put('/', addTransaction);

export default router;
