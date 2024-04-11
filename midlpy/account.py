from litestar import get, post
from litestar.dto import DataclassDTO, DTOConfig
from typing import Optional
from hasura import account
from pydantic import BaseModel

from dataclasses import dataclass
import structlog
log = structlog.get_logger()

@dataclass
class Account:
    address: str
    crypto: str
    # id: Optional[int]
    metadata: dict
    network: str
    # uuid: Optional[str]

# GET account >>> 

class ReadDTOGetAccount(DataclassDTO[Account]):
    # config = DTOConfig(exclude={"address", "crypto", "metadata", "network"})
    config = DTOConfig()


@get("/account/{address:str}", return_dto=ReadDTOGetAccount)
async def get_account(address: str) -> Account:
    return Account(**await account(address))

# POST account

class DTOCreateAccount(DataclassDTO[Account]):
    # config = DTOConfig(exclude={"address", "crypto", "metadata", "network"})
    config = DTOConfig()


@post("/account/", dto=DTOCreateAccount, return_dto=ReadDTOGetAccount)
async def create_account(account: Account) -> Account:
    existing_account = Account(**await account(account.get('address')))
    log.info('account.create_account', existing_account=existing_account)
    # return await account(account)
    return dict()

