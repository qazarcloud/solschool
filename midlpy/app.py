from litestar import Litestar, get, Request
from litestar.plugins.structlog import StructlogPlugin

from hasura import account

@get("/account/{address:str}")
async def get_account(address: str) -> dict:
    return await account(address)

app = Litestar([get_account], plugins=[StructlogPlugin()])