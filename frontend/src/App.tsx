import ContractStatus from "./components/ContractStatus";
import DepositForm from "./components/DepositForm";
import BuyerBalance from "./components/BuyerBalance";
import SimpleConnect from "./components/SimpleConnect";
import AdminRolePanel from "./components/AdminRolePanel";
import RoleStatus from "./components/RoleStatus";

export default function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Supply Chain Quality Assurance Gateway</h1>
      <p>Ethereum and Solidity capstone showcase project</p>

      <SimpleConnect />
      <ContractStatus />
      <RoleStatus />
      <AdminRolePanel />
      <DepositForm />
      <BuyerBalance />
    </div>
  );
}