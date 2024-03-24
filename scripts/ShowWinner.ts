import { createPublicClient, http, createWalletClient, formatEther, toHex, hexToString, isAddress, getAddress } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import * as dotenv from "dotenv";
import { abi, bytecode } from "../artifacts/contracts/Ballot.sol/Ballot.json";

dotenv.config();

const deployerPrivateKey = process.env.PRIVATE_KEY || "";
const providerApiKey = process.env.ALCHEMY_API_KEY || "";

async function main() {
    const parameters = process.argv.slice(2);
    const publicClient = createPublicClient({
        chain: sepolia,
        transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
        });

        const account = privateKeyToAccount(`0x${deployerPrivateKey}`);
        const chair = createWalletClient({
        account,
        chain: sepolia,
        transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
        });
        console.log("Deployer address:", chair.account.address);

    if (!parameters || parameters.length < 1)
      throw new Error("Parameters not provided");
    const contractAddress = parameters[0] as `0x${string}`;
    if (!contractAddress) throw new Error("Contract address not provided");
    if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress))
      throw new Error("Invalid contract address");

    console.log("Contract selected: ", contractAddress);
    const winnerName = (await publicClient.readContract({
        address: contractAddress,
        abi,
        functionName: "winnerName",
    })) as `0x${string}`;
    console.log("The Winning proposal is", hexToString(winnerName))

    process.exit();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});