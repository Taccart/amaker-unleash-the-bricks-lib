from enum import Enum
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class MessageType(Enum):
    # Make sure those are kept aligned with TypeScript counterpart
    TEAM = 0
    INTERCOM = 1
    STATUS = 2
    LOG = 3
    HEARTBEAT = 4
    ACKNOWLEDGE = 5
    COMMAND = 6
    PAYLOAD = 7

class CommandEnum(Enum):
    # Make sure those are kept aligned with TypeScript counterpart
    START = "START"
    STOP = "STOP"
    DANGER = "DANGER"
    OBEYME = "OBEYME"

class RadioMessage:
    # Make sure those are kept aligned with TypeScript counterpart
    MSG_ID_START = 0
    MSG_ID_LEN = 5
    MSG_TYPE_START = MSG_ID_START + MSG_ID_LEN
    MSG_TYPE_LEN = 1
    MSG_PAYLOAD_START = MSG_TYPE_START + MSG_TYPE_LEN
    MSG_PAYLOAD_LEN = 13


    def __init__(self, msg_type:MessageType, payload: str, from_id: str):
        self.msg_type = msg_type
        self.payload = payload
        self.from_id = from_id 
        

    def encode(self):
        # Returns a string in the same format as TypeScript: <from><type><payload>
        return f"{self.from_id}{self.msg_type}{self.payload}"
    
    
    @staticmethod
    def decode(msg: str):
        logging.debug(f"Decoding message: {msg}")
        if len(msg) < RadioMessage.MSG_ID_LEN + RadioMessage.MSG_TYPE_LEN:
            return None
        from_id = msg[:RadioMessage.MSG_ID_LEN]
        try:
            msg_type_int = int(msg[RadioMessage.MSG_ID_LEN:RadioMessage.MSG_ID_LEN + RadioMessage.MSG_TYPE_LEN])
            msg_type = MessageType(msg_type_int)
        except (ValueError, KeyError):
            return None
        payload = msg[RadioMessage.MSG_ID_LEN + RadioMessage.MSG_TYPE_LEN:RadioMessage.MSG_ID_LEN + RadioMessage.MSG_TYPE_LEN + RadioMessage.MSG_PAYLOAD_LEN]
        logging.debug(f"Decoding message: {msg} -> {from_id}, {msg_type.name}, {payload}")
        return RadioMessage(msg_type, payload, from_id)

