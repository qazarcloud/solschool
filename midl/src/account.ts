import { Elysia, mergeObjectArray, t } from 'elysia'
import { Client, cacheExchange, fetchExchange, gql } from '@urql/core';
import { Surreal } from 'surrealdb.js';

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

const db = new Surreal();

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



	// account
	.get(
		'/account/:address', async ({ params: { address } }) => {
			await db.connect('http://127.0.0.1:8000/rpc', {
				namespace: 'test',
				database: 'test',
			});
			return await db.select(`account:${address}`)
		},{
			params: t.Object({
				address: t.String()
			}),
	})


	.post('/account', async ({ body }) => {
		await db.connect('http://127.0.0.1:8000/rpc', {
			namespace: 'test',
			database: 'test',
		});
		const account = await db.create('account', {
			id: body.address, // PK
			address: body.address,
			crypto: body.crypto,
			metadata: body.metadata,
			network: body.network,
		});
		return account
		},{
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