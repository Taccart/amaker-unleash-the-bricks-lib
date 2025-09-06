import serial
import time
from enum import Enum, auto

class IntercomMessage:
    def __init__(self, from_, to, ts, message_type: MessageType, payload: Payload):
        self.from_ = from_
        self.to = to
        self.ts = ts
        self.type = message_type
        self.payload = payload

    def __repr__(self):
        return f"Intercom(from_={self.from_}, to={self.to}, ts={self.ts}, type={self.type}, payload={self.payload})"


class MessageType(str, Enum):
    INTERCOM = "intercom"
    STATUS = "status"
    LOG = "log"
    HEARTBEAT = "heartbeat"
    ACKNOWLEDGE = "acknowledge"

class Payload(str, Enum):
    HEARTBEAT = "Heartbeat"
    START = "Start"
    STOP = "Stop"
    DANGER = "Danger"
    OBEYME = "ObeyMe"
    IOBEY = "IObey"



# Adjust the port and baudrate as needed
ser = serial.Serial('/dev/ttyACM0', 115200, timeout=1)

def send_action(action: PayloadIntercom):
    if  isinstance in [PayloadIntercom.START, PayloadIntercom.STOP, PayloadIntercom.DANGER, PayloadIntercom.OBEYME]:
        ser.write((action.strip() + '\n').encode('utf-8'))
        time.sleep(0.1)  # Give the micro:bit time to process
    else
        raise ValueError("Invalid action type for send_action : {action} is not START, STOP, DANGER or OBEYME")



def parse_message(msg: str) -> dict:
    result = {}
    for part in msg.strip().split('\t'):
        if '=' in part:
            key, value = part.split('=', 1)
            result[key.strip()] = value.strip()
    return result
def parse_intercom(msg: str) -> Intercom:
    fields = parse_message(msg)

    return Intercom(
        from_=fields.get("from"),
        to=fields.get("to"),
        ts=fields.get("ts"),
        type_=fields.get("type"),
        payload=fields.get("payload")
    )
# Example usage: