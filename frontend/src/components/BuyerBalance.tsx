import { formatEther } from "viem";
import { useAccount, useReadContract, useBlockNumber } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../config/contract";

export default function BuyerBalance() {
  const { address, isConnected } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const { data, isLoading, error, refetch } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "getBuyerAvailableBalance",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isConnected,
    },
  });

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Buyer Available Balance</h3>

      {!isConnected && <p>Connect MetaMask first.</p>}

      {isConnected && (
        <p>
          <strong>Reading for address:</strong> {address}
        </p>
      )}

      {isConnected && isLoading && <p>Loading balance...</p>}

      {error && (
        <p style={{ color: "red" }}>
          Error reading balance: {error.message}
        </p>
      )}

      {isConnected && !isLoading && !error && (
        <p>
          Available Balance:{" "}
          <strong>{data ? formatEther(data as bigint) : "0"} ETH</strong>
        </p>
      )}

      <button onClick={() => refetch()} style={{ marginTop: "0.5rem" }}>
        Refresh Balance
      </button>

      {blockNumber && (
        <p style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
          Latest block: {blockNumber.toString()}
        </p>
      )}
    </div>
  );
}