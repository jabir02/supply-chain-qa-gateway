import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

export default function SimpleConnect() {
  const { address, isConnected } = useAccount();
  const { connect, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div style={{ marginTop: "1rem" }}>
      {!isConnected ? (
        <button
          onClick={() =>
            connect({
              connector: injected(),
            })
          }
        >
          {isPending ? "Connecting..." : "Connect MetaMask"}
        </button>
      ) : (
        <div>
          <p>
            Connected account: <strong>{address}</strong>
          </p>
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      )}

      {error && (
        <p style={{ color: "red" }}>
          Error: {error.message}
        </p>
      )}
    </div>
  );
}