import fs from 'fs';

// json file with the data
const data = fs.readFileSync('./data/wallets.json');
const wallets = JSON.parse(data);

export const getWallets = (req, res) => {
  res.send(wallets);
};

export const createWallet = (req, res) => {
  const walletName = req.body.name;

  const errorMsg = {
    status: 'error',
    error: {
      message: `The ${walletName} property does not respect the format`,
    },
  };

  if (
    !walletName.match(/^([a-zA-Z0-9]{1,16}\S+)$/) ||
    wallets.some((wallet) => wallet.name === walletName)
  ) {
    return res.status(400).send(errorMsg);
  }

  const wallet = {
    id: wallets.length + 1,
    name: walletName,
    balance: 0,
    transactions: [],
    transcationsTotal: 0,
  };

  wallets.push(wallet);
  const data = JSON.stringify(wallets, null, 2);

  fs.writeFile('./data/wallets.json', data, finished);

  function finished(err) {
    console.log(err);
  }

  res.send({ status: 'success' });
};

export const addTransaction = (req, res) => {
  const walletName = req.body.walletName;
  const transaction = {
    reference: req.body.reference,
    amount: req.body.amount,
  };
  const wallet = wallets.find((wallet) => wallet.name === walletName);

  if (!wallet) res.status(404).send('The wallet does not exist');

  wallet.transactions.push(transaction);

  wallet.transcationsTotal += transaction.amount;

  const data = JSON.stringify(wallets, null, 2);

  fs.writeFile('./data/wallets.json', data, finished);

  function finished(err) {
    console.log(err);
  }


  res.send({ status: 'success' });
};
