import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Supply Chain QA Gateway",
  projectId: "71b4adf30d1c281c27f74c50b33950eb",
  chains: [sepolia],
  ssr: false,
});