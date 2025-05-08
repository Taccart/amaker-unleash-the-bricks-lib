// send acknowledgement of message received
function send_acknowledge (message: string) {
    emit_message(get_json_string(MSG_KEY_ACKNOWLEDGE, message))
}
function get_json_string (message_key: string, json_payload: string) {
    if (json_payload.length > 0) {
        return "{\"" + message_key + "\":{\"" + MSG_KEY_EMITTER + "\":" + get_emitter_json_string() + ", \"payload\":" + json_payload + "}"
    } else {
        return "{\"" + message_key + "\":{\"" + MSG_KEY_EMITTER + "\":" + get_emitter_json_string() + "}"
    }
}
// Send status
function send_status (status: string) {
    emit_message(get_json_string(MSG_KEY_STATUS, status))
}
// Add your code in to handle the SAFETY  request from controller
function tournament_safety () {
    send_log(LOG_LEVEL_INFO, "safety! ")
}
// Send hear tbeat
function send_heart_beat () {
    emit_message(get_json_string(MSG_KEY_HEARTBEAT, ""))
}
// Add your code in to handle the START request from controller
function tournament_start () {
    send_log(LOG_LEVEL_INFO, "start! ")
}
// Button A increments the radio group
input.onButtonPressed(Button.A, function () {
    basic.showNumber(radio_group)
})
// Send log message
function send_log (level: string, message: string) {
    emit_message(get_json_string(MSG_KEY_LOG, "{\"level\":\"" + level + "\",\"message\":\"" + message + "\"}"))
}
radio.onReceivedString(function (receivedString) {
    on_received_message(receivedString)
})
// Button B decrements the radio group
input.onButtonPressed(Button.B, function () {
    increment_radio_group(-1)
    basic.showNumber(radio_group)
})
// Register the controller if no one is registered yet
function register_controller (name: string) {
    if (controller_name == CONTROLLER_UNDEFINED) {
        controller_name = name
        emit_message("{hearbeat\":" + get_emitter_json_string() + "}")
    } else {
    	
    }
}
function get_bot_info_string () {
    return "{ \"collected\":" + ("" + bot_collected) + ", \"distance\" :" + ("" + bot_distance) + ",\"status\":\"" + bot_status + "\"}"
}
// Emits the message to the defined destination.
function emit_message (msg: string) {
    if (message_destination == MESSAGE_DESTINATION_RADIO) {
        radio.sendString(msg)
    } else if (message_destination == MESSAGE_DESTINATION_LEDS) {
        basic.showString(msg)
    } else if (message_destination == MESSAGE_DESTINATION_SERIAL) {
        serial.writeString(msg)
    } else {
        basic.showString("WARNING: Invalid message_destination")
    }
}
function on_received_message (messsage: string) {
    send_log("DEBUG", "acknowledge received message " + "" + messsage)
}
// internal function: emitter json string
function get_emitter_json_string () {
    return "{\"from\":" + control.deviceName() + "\", \"at_ms\":" + ("" + control.millis()) + "}"
}
// You can use message over serial  to test your code
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    on_received_message(serial.readLine())
})
function increment_radio_group (increment: number) {
    radio_group += increment
    if (radio_group > RADIO_GROUP_MAX) {
        radio_group = RADIO_GROUP_MIN
    } else if (radio_group < RADIO_GROUP_MIN) {
        radio_group = RADIO_GROUP_MAX
    }
    send_log("INFO", "updated radio_group to" + ("" + radio_group))
}
// implement your own code here
// Add your code in to handle the STOP req
// Add your code in to handle the STOP request from controller
function tournament_stop () {
    send_log(LOG_LEVEL_INFO, "stop! ")
}
let bot_status = ""
let controller_name = ""
let CONTROLLER_UNDEFINED = ""
let message_destination = ""
let MESSAGE_DESTINATION_SERIAL = ""
let MESSAGE_DESTINATION_LEDS = ""
let MESSAGE_DESTINATION_RADIO = ""
let RADIO_GROUP_MIN = 0
let radio_group = 0
let RADIO_GROUP_MAX = 0
let bot_collected = 0
let bot_distance = 0
let LOG_LEVEL_INFO = ""
let MSG_KEY_EMITTER = ""
let MSG_KEY_STATUS = ""
let MSG_KEY_LOG = ""
let MSG_KEY_ACKNOWLEDGE = ""
let MSG_KEY_HEARTBEAT = ""
MSG_KEY_HEARTBEAT = "heartbeat"
MSG_KEY_ACKNOWLEDGE = "acknowledge"
MSG_KEY_LOG = "acknowledge"
MSG_KEY_STATUS = "status"
MSG_KEY_EMITTER = "emitter"
LOG_LEVEL_INFO = "info"
let LOG_LEVEL_DEBUG = "debug"
let LOG_LEVEL_WARNING = "warning"
let LOG_LEVEL_ERROR = "error"
bot_distance = 0
bot_collected = 0
RADIO_GROUP_MAX = 16
radio_group = RADIO_GROUP_MIN
// The radio group is controlled by button A and B.
radio.setGroup(radio_group)
MESSAGE_DESTINATION_RADIO = "radio"
MESSAGE_DESTINATION_LEDS = "led"
MESSAGE_DESTINATION_SERIAL = "serial"
// Do not change message destination after start.
message_destination = MESSAGE_DESTINATION_RADIO
CONTROLLER_UNDEFINED = "undefined"
// Name of controller. This will be updated by code : do not touch
controller_name = CONTROLLER_UNDEFINED
bot_status = "undefined"
basic.forever(function () {
	
})
// Heart beat loop
control.inBackground(function () {
    while (true) {
        control.waitMicros(1000000)
        send_heart_beat()
    }
})
