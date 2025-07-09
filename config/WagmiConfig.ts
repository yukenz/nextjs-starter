import {createConfig, http} from 'wagmi';
import {injected} from 'wagmi/connectors';
import {type Chain} from 'viem'
import {monadTestnet} from "viem/chains";


declare module 'wagmi' {
    interface Register {
        config: typeof config
    }
}

const localhost = {
    id: 31337,
    name: 'HardHat',
    nativeCurrency: {name: 'Ether', symbol: 'ETH', decimals: 18},
    rpcUrls: {
        default: {http: ['http://localhost:8545']},
    }
} as const satisfies Chain


export const config = createConfig({
    chains: [
        localhost,monadTestnet
    ],
    connectors: [injected()],
    transports: {
        [localhost.id]: http(),
        [monadTestnet.id]: http(),
    },
});