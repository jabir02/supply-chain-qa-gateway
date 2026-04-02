import { useState } from "react";
import ContractStatus from "./components/ContractStatus";

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<string[]>;
    };
  }
}

export default function App() {
  const [account, setAccount] = useState<string>("");

  const connectMetaMask = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed.");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error("MetaMask connection error:", error);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Supply Chain Quality Assurance Gateway</h1>
      <p>Ethereum and Solidity capstone showcase project</p>

      <button onClick={connectMetaMask}>Connect MetaMask</button>

      {account && (
        <p style={{ marginTop: "1rem" }}>
          Connected account: <strong>{account}</strong>
        </p>
      )}

      <ContractStatus />
    </div>
  );
}