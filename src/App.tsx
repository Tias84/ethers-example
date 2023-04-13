import { ethers } from "ethers";
import { useState } from "react";

declare global {
  interface Window {
    ethereum: ethers.Eip1193Provider;
  }
}
const provider = new ethers.BrowserProvider(window.ethereum);

function App() {
  const [signer, setSigner] = useState<ethers.JsonRpcSigner>();
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [amount, setAmount] = useState("");

  const connectWallet = async () => {
    const response = await provider.getSigner();

    setSigner(response);
    setAddress(response.address);
  };

  const getBalance = async () => {
    const respone = await provider.getBalance(address);

    setBalance(respone.toString());
  };

  const sendTransaction = async () => {
    if (signer) {
      const txn = await signer.sendTransaction({
        to: beneficiary,
        value: amount,
      });

      await txn.wait();
      console.log(txn);
    }
  };

  return (
    <div className="App">
      <button onClick={connectWallet}>Collega address</button>
      <button onClick={getBalance}>Balance</button>
      <p>Address: {address}</p>
      {balance ? (
        <p>Balance: {ethers.formatEther(balance)}</p>
      ) : (
        "Clicca su Balance"
      )}

      <div>
        <h1>Send transaction</h1>
        <input
          type="text"
          placeholder="To address"
          name="beneficiary"
          value={beneficiary}
          onChange={(e) => setBeneficiary(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={sendTransaction}>Send</button>
      </div>
    </div>
  );
}

export default App;
