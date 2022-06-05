from typing import Union


class IGetPlaceholderValue:
    def getPlaceholderValue(self, placeholder: str) -> Union[str, None]:
        raise NotImplementedError()
