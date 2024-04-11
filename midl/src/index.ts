import { Elysia, t } from 'elysia'
import { Client, cacheExchange, fetchExchange, gql } from '@urql/core';

const client = new Client({
  url: 'https://solschool.hasura.app/v1/graphql',
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => {
	const token = 'cj0Ondu0kPfqUi86mfh826X5ZmdEv6ybFPvR5GCFQD5ILIiikfw5hFeDimjf6Qsg'
    return {
      headers: { 'x-hasura-admin-secret': token ? `${token}` : '' },
    };
  },
});
const t1 = performance.now()

const loggerPlugin = new Elysia()
	.decorate('log', () => 'A')
	.decorate('date', () => new Date())
	.state('fromPlugin', 'From Logger')
	.use((app) => app.state('abc', 'abc'))

const app = new Elysia()
	.onRequest(({ set }) => {
		set.headers = {
			'Access-Control-Allow-Origin': '*'
		}
	})
	.use(loggerPlugin)
	.get(
		'/account/:address', 
		({ params: { address } }) => {
			const GetAccount = gql`
				query GetAccount($address: String!) {
					account(where: {address: {_eq: $address}}) {
						address
						crypto
						id
						metadata
						network
						uuid
					}
				}			  
			`;
			console.log(GetAccount)
			const account = client
			.query(GetAccount, { address: address })
			.toPromise()
			.then((result) => {
			  console.log(result.data.account[0]);
			  return result.data.account[0];
			});
			return account
		},{
			params: t.Object({
				address: t.String()
			}),
			// body: t.Object({
			// 	address: t.String(),
			// 	crypto: t.String(),
			// 	network: t.String(),
			// 	metadata: t.Unknown()
			// })
		})
	.post('/account', async ({ body }) => body, {
		body: t.Object({
			address: t.String(),
			crypto: t.String(),
			network: t.String(),
			metadata: t.Unknown()
		})
	})
	.onError(({ code, error, set }) => {
		if (code === 'NOT_FOUND') {
			set.status = 404

			return 'Not Found :('
		}
	})
	.listen(8080, ({ hostname, port }) => {
		console.log(`🦊 Elysia is running at http://${hostname}:${port}`)
	})

const t2 = performance.now()

console.log('took', t2 - t1, 'ms')

export type App = typeof app