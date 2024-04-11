from httpx import AsyncClient
import asyncio

URL='http://localhost:8000'

async def create_account(cli):
    return await cli.post(
        f"{URL}/account",
        json=dict(
            address='123',
            crypto='SOL',
            network='mainnet',
            metadata=dict(one=1)
        )
    )

async def main():
    async with AsyncClient() as cli:
        account_created = await create_account(cli)
        print(account_created)

if __name__ == "__main__":
    asyncio.run(main())