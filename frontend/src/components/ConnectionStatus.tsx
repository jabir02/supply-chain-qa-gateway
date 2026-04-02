import { useAccount, useChainId } from "wagmi";

export default function ConnectionStatus() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  return (
    <div style={{ marginTop: "1rem" }}>
      <p><strong>Connected:</strong> {isConnected ? "Yes" : "No"}</p>
      <p><strong>Address:</strong> {address || "Not connected"}</p>
      <p><strong>Chain ID:</strong> {chainId || "Unknown"}</p>
      <p>
        <strong>Network:</strong>{" "}
        {chainId === 11155111 ? "Sepolia" : "Please switch to Sepolia"}
      </p>
    </div>
  );
}
