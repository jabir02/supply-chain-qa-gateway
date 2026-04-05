import { formatEther } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../config/contract";

export default function DebugPanel() {
  const { address, isConnected } = useAccount();

  const buyerRole = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "BUYER_ROLE",
  });

  const hasBuyerRole = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "hasRole",
    args:
      address && buyerRole.data
        ? [buyerRole.data as `0x${string}`, address]
        : undefined,
    query: {
      enabled: !!address && !!buyerRole.data,
    },
  });

  const availableBalance = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "getBuyerAvailableBalance",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isConnected,
    },
  });

  const contractBalance = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "getContractBalance",
  });

  return (
    <div style={{ marginTop: "2rem", border: "1px solid #555", padding: "1rem" }}>
      <h3>Debug Panel</h3>

      <p><strong>Connected:</strong> {isConnected ? "Yes" : "No"}</p>
      <p><strong>Address:</strong> {address || "Not connected"}</p>
      <p><strong>Has Buyer Role:</strong> {String(hasBuyerRole.data)}</p>
      <p>
        <strong>Buyer Available Balance:</strong>{" "}
        {availableBalance.data ? formatEther(availableBalance.data as bigint) : "0"} ETH
      </p>
      <p>
        <strong>Contract Balance:</strong>{" "}
        {contractBalance.data ? formatEther(contractBalance.data as bigint) : "0"} ETH
      </p>
    </div>
  );
}