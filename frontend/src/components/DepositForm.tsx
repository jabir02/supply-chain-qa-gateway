import { useState } from "react";
import { parseEther } from "viem";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../config/contract";

export default function DepositForm() {
  const [amount, setAmount] = useState("0.0001");

  const {
    data: hash,
    writeContract,
    isPending,
    error,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleDeposit = () => {
    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: "depositFunds",
        value: parseEther(amount),
        gas: 100000n,
      });
    } catch (err) {
      console.error("Deposit error:", err);
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Deposit Funds</h3>

      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in ETH"
        style={{ padding: "0.5rem", marginRight: "0.5rem" }}
      />

      <button onClick={handleDeposit} disabled={isPending}>
        {isPending ? "Confirm in MetaMask..." : "Deposit"}
      </button>

      {hash && (
        <p style={{ marginTop: "0.75rem" }}>
          Transaction submitted: <code>{hash}</code>
        </p>
      )}

      {isConfirming && <p>Waiting for transaction confirmation...</p>}

      {isSuccess && <p>Deposit successful.</p>}

      {error && (
        <p style={{ color: "red" }}>
          Error: {error.message}
        </p>
      )}
    </div>
  );
}