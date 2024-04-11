from litestar import get, post
from litestar.dto import DataclassDTO, DTOConfig
from typing import Optional
from hasura import account, create_account
# from pydantic import BaseModel

from dataclasses import dataclass
import structlog
log = structlog.get_logger()


@dataclass
class Account:
    address: str
    crypto: str
    id: Optional[int]
    metadata: dict
    network: str
    uuid: Optional[str]

# DTO for the input dataclass
class DTOAccount(DataclassDTO[Account]):
    config = DTOConfig()

# GET account >>> 

@get("/get-account/{address:str}", name=1)
async def get_account(address: str) -> Account:
    return await account(address)

# POST account

@post("/create-account", dto=DTOAccount, response_model=DTOAccount, name=2)
async def create_account(acc: Account) -> Account:
    log.info('account.creation_account', acc=acc)
    # existing_account = await account(acc.address)
    # log.info('account.create_account', existing_account=existing_account)

    # if existing_account:
    #     return existing_account
    # else:
    #     return await create_account(dict)
