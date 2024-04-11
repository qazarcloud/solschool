// client.ts
import { edenFetch } from '@elysiajs/eden';
import type { App } from './index';

const tapp = edenFetch<App>('localhost:8080');

const { data } = await tapp('/account/:address', {
    params: {
        address: '81meSJqk6SmbQmxdeHt1YEAKx7UrM8njQq1KyCTofeb1'
    }
})
console.log(data)

// const accountCreate = async () => {
//     try {
//         const account = {
//             address: '123',
//             crypto: 'SOL',
//             network: 'mainnet',
//             metadata: {}
//         };
//         const { data } = await tapp.account.post(account);
//         console.log(data);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };

// accountCreate();

