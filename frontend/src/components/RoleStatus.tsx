import { useAccount, useReadContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../config/contract";

export default function RoleStatus() {
  const { address, isConnected } = useAccount();

  const buyerRole = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "BUYER_ROLE",
  });

  const supplierRole = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "SUPPLIER_ROLE",
  });

  const warehouseRole = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "WAREHOUSE_MANAGER_ROLE",
  });

  const adminRole = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "DEFAULT_ADMIN_ROLE",
  });

  const hasBuyerRole = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "hasRole",
    args:
      address && buyerRole.data
        ? [buyerRole.data as `0x${string}`, address]
        : undefined,
    query: { enabled: !!address && !!buyerRole.data },
  });

  const hasSupplierRole = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "hasRole",
    args:
      address && supplierRole.data
        ? [supplierRole.data as `0x${string}`, address]
        : undefined,
    query: { enabled: !!address && !!supplierRole.data },
  });

  const hasWarehouseRole = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "hasRole",
    args:
      address && warehouseRole.data
        ? [warehouseRole.data as `0x${string}`, address]
        : undefined,
    query: { enabled: !!address && !!warehouseRole.data },
  });

  const hasAdminRole = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "hasRole",
    args:
      address && adminRole.data
        ? [adminRole.data as `0x${string}`, address]
        : undefined,
    query: { enabled: !!address && !!adminRole.data },
  });

  if (!isConnected) {
    return <p>Connect MetaMask first.</p>;
  }

  return (
    <div style={{ marginTop: "2rem", border: "1px solid #555", padding: "1rem" }}>
      <h3>Role Status</h3>
      <p><strong>Admin:</strong> {String(hasAdminRole.data)}</p>
      <p><strong>Buyer:</strong> {String(hasBuyerRole.data)}</p>
      <p><strong>Supplier:</strong> {String(hasSupplierRole.data)}</p>
      <p><strong>Warehouse Manager:</strong> {String(hasWarehouseRole.data)}</p>
    </div>
  );
}