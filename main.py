# send acknowledgement of message received
def send_acknowledge(message: str):
    emit_message(get_json_string(MSG_KEY_ACKNOWLEDGE, message))
def get_json_string(message_key: str, json_payload: str):
    if len(json_payload) > 0:
        return "{\"" + message_key + "\":{\"" + MSG_KEY_EMITTER + "\":" + get_emitter_json_string() + ", \"payload\":" + json_payload + "}"
    else:
        return "{\"" + message_key + "\":{\"" + MSG_KEY_EMITTER + "\":" + get_emitter_json_string() + "}"
# Send status
def send_status(status: str):
    emit_message(get_json_string(MSG_KEY_STATUS, status))
# Add your code in to handle the SAFETY  request from controller
def tournament_safety():
    send_log(LOG_LEVEL_INFO, "safety! ")
# Send hear tbeat
def send_heart_beat():
    emit_message(get_json_string(MSG_KEY_HEARTBEAT, ""))
# Add your code in to handle the START request from controller
def tournament_start():
    send_log(LOG_LEVEL_INFO, "start! ")
# Button A increments the radio group

def on_button_pressed_a():
    basic.show_leds("""
        . # # . .
        # . . # .
        # # # # .
        # . . # .
        # . . # .
        """)
    increment_radio_group(1)
    basic.show_number(conf_radio_group)
input.on_button_pressed(Button.A, on_button_pressed_a)

def init_constants():
    global RADIO_GROUP_MAX, MSG_KEY_HEARTBEAT, MSG_KEY_ACKNOWLEDGE, MSG_KEY_LOG, MSG_KEY_STATUS, MSG_KEY_EMITTER, LOG_LEVEL_INFO, LOG_LEVEL_DEBUG, LOG_LEVEL_WARNING, LOG_LEVEL_ERROR, CONTROLLER_UNDEFINED, COMMUNICATION_CHANNEL_RADIO, COMMUNICATION_CHANNEL_NONE, COMMUNICATION_CHANNEL_SERIAL
    RADIO_GROUP_MAX = 16
    MSG_KEY_HEARTBEAT = "heartbeat"
    MSG_KEY_ACKNOWLEDGE = "acknowledge"
    MSG_KEY_LOG = "acknowledge"
    MSG_KEY_STATUS = "status"
    MSG_KEY_EMITTER = "emitter"
    LOG_LEVEL_INFO = "info"
    LOG_LEVEL_DEBUG = "debug"
    LOG_LEVEL_WARNING = "warning"
    LOG_LEVEL_ERROR = "error"
    CONTROLLER_UNDEFINED = "undefined"
    COMMUNICATION_CHANNEL_RADIO = "radio"
    COMMUNICATION_CHANNEL_NONE = "led"
    COMMUNICATION_CHANNEL_SERIAL = "serial"
# Send log message
def send_log(level: str, message2: str):
    emit_message(get_json_string(MSG_KEY_LOG,
            "{\"level\":\"" + level + "\",\"message\":\"" + message2 + "\"}"))

def on_button_pressed_ab():
    basic.show_string("radio group =" + str(conf_radio_group))
    # The radio group is controlled by button A and B.
    radio.set_group(conf_radio_group)
    basic.show_icon(IconNames.YES)
    send_log(LOG_LEVEL_WARNING, "radio group =" + str(conf_radio_group))
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_received_string(receivedString):
   pass

def on_received_radio(receivedString):
    if conf_communication_channel == COMMUNICATION_CHANNEL_SERIAL:
        on_received_message(receivedString)
    else:
        send_log(LOG_LEVEL_ERROR,"Communication channel is "+conf_communication_channel" but a message is received on  "+COMMUNICATION_CHANNEL_SERIAL+ "")

radio.on_received_string(on_received_radio)

# Button B decrements the radio group

def on_button_pressed_b():
    basic.show_leds("""
        # # # . .
        # . . # .
        # # # . .
        # . . # .
        # # # . .
        """)
    increment_radio_group(-1)
    basic.show_number(conf_radio_group)
input.on_button_pressed(Button.B, on_button_pressed_b)

# Register the controller if no one is registered yet
def register_controller(name: str):
    global conf_controller_name
    if conf_controller_name == CONTROLLER_UNDEFINED:
        conf_controller_name = name
        emit_message("{hearbeat\":" + get_emitter_json_string() + "}")
    else:
        pass
def get_bot_info_string():
    return "{ \"collected\":" + ("" + str(var_count_collected)) + ", \"distance\" :" + ("" + str(var_bot_travelled_distance)) + ",\"status\":\"" + var_bot_current_status + "\"}"
# Emits the message to the defined destination.
def emit_message(msg: str):
    if conf_communication_channel == COMMUNICATION_CHANNEL_RADIO:
        radio.send_string(msg)
    elif conf_communication_channel == COMMUNICATION_CHANNEL_NONE:
        basic.show_string(msg)
    elif conf_communication_channel == COMMUNICATION_CHANNEL_SERIAL:
        serial.write_string(msg)
    else:
        basic.show_string("WARNING: Invalid message_destination")
def on_received_message(message: str):
    send_acknowledge(message)
# internal function: emitter json string
def get_emitter_json_string():
    return "{\"from\":" + control.device_name() + "\", \"at_ms\":" + ("" + str(control.millis())) + "}"
# You can use message over serial  to test your code

def on_received_serial():
    if conf_communication_channel == COMMUNICATION_CHANNEL_SERIAL:
        on_received_message(serial.read_line())
    else:
        send_log(LOG_LEVEL_ERROR,"Communication channel is "+conf_communication_channel" but a message is received on  "+COMMUNICATION_CHANNEL_SERIAL+ "")

serial.on_data_received(serial.delimiters(Delimiters.NEW_LINE), on_received_serial)

def increment_radio_group(increment: number):
    global conf_radio_group
    conf_radio_group += increment
    if conf_radio_group > RADIO_GROUP_MAX:
        conf_radio_group = RADIO_GROUP_MIN
    elif conf_radio_group < RADIO_GROUP_MIN:
        conf_radio_group = RADIO_GROUP_MAX
    send_log("INFO",
        "updated radio_group to" + ("" + str(conf_radio_group)))
def init_conf_and_vars():
    global conf_communication_channel, conf_controller_name, conf_radio_group, var_bot_travelled_distance, var_count_collected, var_bot_current_status
    # Do not change message destination after start.
    conf_communication_channel = COMMUNICATION_CHANNEL_RADIO
    # Name of controller. This will be updated by code : do not touch
    conf_controller_name = CONTROLLER_UNDEFINED
    conf_radio_group = RADIO_GROUP_MIN
    radio.set_group(conf_radio_group)
    var_bot_travelled_distance = 0
    var_count_collected = 0
    var_bot_current_status = "undefined status"
# implement your own code here
# Add your code in to handle the STOP req
# Add your code in to handle the STOP request from controller
def tournament_stop():
    send_log(LOG_LEVEL_INFO, "stop! ")
RADIO_GROUP_MIN = 0
var_bot_current_status = ""
var_bot_travelled_distance = 0
var_count_collected = 0
conf_controller_name = ""
conf_communication_channel = ""
COMMUNICATION_CHANNEL_SERIAL = ""
COMMUNICATION_CHANNEL_NONE = ""
COMMUNICATION_CHANNEL_RADIO = ""
CONTROLLER_UNDEFINED = ""
LOG_LEVEL_ERROR = ""
LOG_LEVEL_WARNING = ""
LOG_LEVEL_DEBUG = ""
MSG_KEY_LOG = ""
RADIO_GROUP_MAX = 0
conf_radio_group = 0
MSG_KEY_HEARTBEAT = ""
LOG_LEVEL_INFO = ""
MSG_KEY_STATUS = ""
MSG_KEY_EMITTER = ""
MSG_KEY_ACKNOWLEDGE = ""
basic.show_icon(IconNames.SMALL_SQUARE)
init_constants()
init_conf_and_vars()
basic.show_icon(IconNames.SQUARE)

def on_every_interval():
    send_heart_beat()
loops.every_interval(1000, on_every_interval)
