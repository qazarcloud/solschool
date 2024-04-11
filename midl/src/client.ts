// client.ts
import { treaty } from '@elysiajs/eden';
import type { App } from './index';

const tapp = treaty<App>('localhost:8080');

const account = {
    address: '123',
    crypto: 'SOL',
    network: 'mainnet',
    metadata: {}
};

// Use async/await to handle the asynchronous nature of the request
const postData = async () => {
    try {
        // Send a POST request to the server with the account data
        const { data } = await tapp.json.post(account);

        // Log the response data
        console.log(data);
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error:', error);
    }
};

// Call the postData function to initiate the request
postData();

