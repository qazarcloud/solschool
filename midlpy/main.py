# from litestar import Litestar, get
from gql import gql, Client
from gql.transport.httpx import HTTPXAsyncTransport
import asyncio

transport = HTTPXAsyncTransport(
    url="https://solschool.hasura.app/v1/graphql",
    headers={
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.8',
        'content-type': 'application/json',
        'origin': 'https://cloud.hasura.io',
        'referer': 'https://cloud.hasura.io/',
        'sec-ch-ua': '"Brave";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'sec-gpc': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'x-hasura-admin-secret': 'cj0Ondu0kPfqUi86mfh826X5ZmdEv6ybFPvR5GCFQD5ILIiikfw5hFeDimjf6Qsg',
    }
)

async def main():
    async with Client(
        transport=transport,
        # fetch_schema_from_transport=True,
    ) as session:
        # Execute single query
        print(session)
        query = gql(
            """
            query Account($address: String!) {
                account(where: { address: { _eq: $address } }) {
                    address
                    crypto
                    id
                    metadata
                    network
                    uuid
                }
            }
            """
        )
        result = await session.execute(query, variable_values={'address': '81meSJqk6SmbQmxdeHt1YEAKx7UrM8njQq1KyCTofeb1'})
        print(result)
        return {"account": result}


asyncio.run(main())