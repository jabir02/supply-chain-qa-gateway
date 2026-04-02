import { useReadContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../config/contract";

export default function ContractStatus() {
  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "paused",
  });

  return (
    <div style={{ marginTop: "1rem" }}>
      <h3>Contract Status</h3>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error reading contract</p>}
      {!isLoading && !error && <p>Paused: {String(data)}</p>}
    </div>
  );
}