from httpx import AsyncClient
import asyncio
import json
URL='http://localhost:8000'

async def get_account(cli, address):
    return await cli.get(
        f"{URL}/get-account/{address}",
    )

async def create_account(cli):
    return await cli.post(
        f"{URL}/create-account",
        data=json.dumps(dict(
            address='123',
            crypto='SOL',
            network='mainnet',
            metadata=dict(one=1)
        )),
        headers={"Content-Type": "application/json"},
    )

async def main():
    # async with AsyncClient() as cli:
    #     getted_account = await get_account(cli, '81meSJqk6SmbQmxdeHt1YEAKx7UrM8njQq1KyCTofeb1')
    #     print(f"getted_account={getted_account.json()}")
    async with AsyncClient() as cli:        
        account_created = await create_account(cli)
        print(f"account_created={account_created.json()}")

if __name__ == "__main__":
    asyncio.run(main())