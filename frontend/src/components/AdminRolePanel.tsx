import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../config/contract";

export default function AdminRolePanel() {
  const { address, isConnected } = useAccount();

  const [targetAddress, setTargetAddress] = useState("");
  const [lastAction, setLastAction] = useState("");

  const {
    data: hash,
    writeContract,
    isPending,
    error,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(targetAddress);

  const grantBuyerRole = () => {
    setLastAction("Grant Buyer Role");
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: "grantBuyerRole",
      args: [targetAddress as `0x${string}`],
    });
  };

  const grantSupplierRole = () => {
    setLastAction("Grant Supplier Role");
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: "grantSupplierRole",
      args: [targetAddress as `0x${string}`],
    });
  };

  const grantWarehouseManagerRole = () => {
    setLastAction("Grant Warehouse Manager Role");
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: "grantWarehouseManagerRole",
      args: [targetAddress as `0x${string}`],
    });
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Admin Role Grant Panel</h3>

      {!isConnected && <p>Connect MetaMask first.</p>}

      {isConnected && (
        <>
          <p>
            <strong>Connected Account::</strong> {address}
          </p>

          <input
            type="text"
            value={targetAddress}
            onChange={(e) => setTargetAddress(e.target.value)}
            placeholder="Enter wallet address"
            style={{ padding: "0.5rem", width: "420px", maxWidth: "100%" }}
          />

          <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button
              onClick={grantBuyerRole}
              disabled={!isValidAddress || isPending}
            >
              Grant Buyer Role
            </button>

            <button
              onClick={grantSupplierRole}
              disabled={!isValidAddress || isPending}
            >
              Grant Supplier Role
            </button>

            <button
              onClick={grantWarehouseManagerRole}
              disabled={!isValidAddress || isPending}
            >
              Grant Warehouse Manager Role
            </button>
          </div>

          {hash && (
            <p style={{ marginTop: "1rem" }}>
              <strong>{lastAction}</strong> transaction submitted:
              <br />
              <code>{hash}</code>
            </p>
          )}

          {isConfirming && <p>Waiting for transaction confirmation...</p>}
          {isSuccess && <p>{lastAction} successful.</p>}

          {error && (
            <p style={{ color: "red" }}>
              Error: {error.message}
            </p>
          )}
        </>
      )}
    </div>
  );
}