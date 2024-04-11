from litestar import Litestar
from litestar.plugins.structlog import StructlogPlugin
# from litestar.logging import LoggingConfig
from account import get_account, create_account

app = Litestar([
        get_account, create_account,
        
    ],
    plugins=[StructlogPlugin()]
    # logging_config=LoggingConfig(log_exceptions="always")
)
