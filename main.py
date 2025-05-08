# internal function: emitter json string
def get_emitter_json_string():
    return "{\"from\":" + control.device_name() + "\", \"at_ms\":" + ("" + str(control.millis())) + "}"

def get_json_string(message_key: str, json_payload: str):
    if len(json_payload) > 0:
        return "{\"" + message_key + "\":{\"" + MSG_KEY_EMITTER + "\":" + get_emitter_json_string() + ", \"payload\":" + json_payload + "}"
    else:
        return "{\"" + message_key + "\":{\"" + MSG_KEY_EMITTER + "\":" + get_emitter_json_string() + "}"


# send acknowledgement of message received
def send_acknowledge(message: str):
    emit_message(get_json_string(MSG_KEY_ACKNOWLEDGE, message))
# Send status
def send_status(status: str):
    emit_message(get_json_string(MSG_KEY_STATUS, status))
# Send hear tbeat
def send_heart_beat():
    emit_message(get_json_string(MSG_KEY_HEARTBEAT, ""))

# Send log message
def send_log(level: str, message: str):
    emit_message(get_json_string(MSG_KEY_LOG,
            "{\"level\":\"" + level + "\",\"message\":\"" + message + "\"}"))    

# Button A increments the radio group 
def on_button_pressed_a():
    global radio_group
    global radio_group
    basic.show_number(radio_group)

input.on_button_pressed(Button.A, on_button_pressed_a)

# Button B decrements the radio group
def on_button_pressed_b():
    increment_radio_group(-1)
    global radio_group
    basic.show_number(radio_group)

input.on_button_pressed(Button.B, on_button_pressed_b)

# Add your code in to handle the SAFETY  request from controller
def tournament_safety():
    global LOG_LEVEL_INFO
    send_log(LOG_LEVEL_INFO, "safety! ")
# Add your code in to handle the START request from controller
def tournament_start():
    global LOG_LEVEL_INFO
    send_log(LOG_LEVEL_INFO, "start! ")
    # implement your own code here
        
        # Add your code in to handle the STOP req
        
# Add your code in to handle the STOP request from controller
def tournament_stop():
    global LOG_LEVEL_INFO
    send_log(LOG_LEVEL_INFO, "stop! ")    

def on_received_string(receivedString):
    on_received_message(receivedString)
radio.on_received_string(on_received_string)


# Register the controller if no one is registered yet
def register_controller(name: str):
    global controller_name
    if controller_name == CONTROLLER_UNDEFINED:
        controller_name = name
        emit_message("{hearbeat\":" + get_emitter_json_string() + "}")
    else:
        pass
def get_bot_info_string():
    return "{ \"collected\":" + ("" + str(bot_collected)) + ", \"distance\" :" + ("" + str(bot_distance)) + ",\"status\":\"" + bot_status + "\"}"
# Emits the message to the defined destination.
def emit_message(msg: str):
    if message_destination == MESSAGE_DESTINATION_RADIO:
        radio.send_string(msg)
    elif message_destination == MESSAGE_DESTINATION_LEDS:
        basic.show_string(msg)
    elif message_destination == MESSAGE_DESTINATION_SERIAL:
        serial.write_string(msg)
    else:
        basic.show_string("WARNING: Invalid message_destination")
def on_received_message(messsage: str):
    send_log("DEBUG", "acknowledge received message " + "" + messsage)

# You can use message over serial  to test your code

def on_data_received():
    on_received_message(serial.read_line())
serial.on_data_received(serial.delimiters(Delimiters.NEW_LINE), on_data_received)

def increment_radio_group(increment: number):
    global radio_group
    radio_group += increment
    if radio_group > RADIO_GROUP_MAX:
        radio_group = RADIO_GROUP_MIN
    elif radio_group < RADIO_GROUP_MIN:
        radio_group = RADIO_GROUP_MAX
    send_log("INFO", "updated radio_group to" + ("" + str(radio_group)))

bot_status = ""
controller_name = ""
CONTROLLER_UNDEFINED = ""
message_destination = ""
MESSAGE_DESTINATION_SERIAL = ""
MESSAGE_DESTINATION_LEDS = ""
MESSAGE_DESTINATION_RADIO = ""
RADIO_GROUP_MIN = 0
radio_group = 0
RADIO_GROUP_MAX = 0
bot_collected = 0
bot_distance = 0
MSG_KEY_EMITTER = ""
MSG_KEY_STATUS = ""
MSG_KEY_LOG = ""
MSG_KEY_ACKNOWLEDGE = ""
MSG_KEY_HEARTBEAT = ""
MSG_KEY_HEARTBEAT = "heartbeat"
MSG_KEY_ACKNOWLEDGE = "acknowledge"
MSG_KEY_LOG = "acknowledge"
MSG_KEY_STATUS = "status"
MSG_KEY_EMITTER = "emitter"
LOG_LEVEL_INFO="info"
LOG_LEVEL_DEBUG="debug"
LOG_LEVEL_WARNING="warning"
LOG_LEVEL_ERROR="error"
bot_distance = 0
bot_collected = 0
RADIO_GROUP_MAX = 16
radio_group = RADIO_GROUP_MIN
# The radio group is controlled by button A and B.
radio.set_group(radio_group)
MESSAGE_DESTINATION_RADIO = "radio"
MESSAGE_DESTINATION_LEDS = "led"
MESSAGE_DESTINATION_SERIAL = "serial"
# Do not change message destination after start.
message_destination = MESSAGE_DESTINATION_RADIO
CONTROLLER_UNDEFINED = "undefined"
# Name of controller. This will be updated by code : do not touch
controller_name = CONTROLLER_UNDEFINED
bot_status = "undefined"

def on_forever():
    pass
basic.forever(on_forever)

# Heart beat loop

def on_in_background():
    while True:
        control.wait_micros(1000000)
        send_heart_beat()
control.in_background(on_in_background)
