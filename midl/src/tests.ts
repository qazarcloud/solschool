// client.ts
import { edenFetch } from '@elysiajs/eden';
import type { App } from './account';

const tapp = edenFetch<App>('localhost:8080');
var data = null
data = await tapp('/account/:address', {
    params: {
        address: '81meSJqk6SmbQmxdeHt1YEAKx7UrM8njQq1KyCTofeb1'
    }
})
console.log(data.data)

data = await tapp('/account', {
    method: 'POST',
    // headers: {
    //     'x-affiliation': 'Arius'
    // },
    // query: {}
    body: {
        address: '81meSJqk6SmbQmxdeHt1YEAKx7UrM8njQq1KyCTofeb1',
        crypto: 'SOL',
        network: 'mainnet',
        metadata: {}
    }
})
console.log(data.data)

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

