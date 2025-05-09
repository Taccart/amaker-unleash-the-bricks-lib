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
    basic.showLeds(`
        . # # . .
        # . . # .
        # # # # .
        # . . # .
        # . . # .
        `)
    increment_radio_group(1)
    basic.showNumber(conf_radio_group)
})
function init_constants () {
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
}
// Send log message
function send_log (level: string, message2: string) {
    emit_message(get_json_string(MSG_KEY_LOG, "{\"level\":\"" + level + "\",\"message\":\"" + message2 + "\"}"))
}
input.onButtonPressed(Button.AB, function () {
    basic.showString("radio group =" + ("" + conf_radio_group))
    // The radio group is controlled by button A and B.
    radio.setGroup(conf_radio_group)
    basic.showIcon(IconNames.Yes)
    send_log(LOG_LEVEL_WARNING, "radio group =" + ("" + conf_radio_group))
})
radio.onReceivedString(function (receivedString) {
    if (conf_communication_channel == COMMUNICATION_CHANNEL_SERIAL) {
        on_received_message(receivedString)
    } else {
        send_log(LOG_LEVEL_ERROR, "Communication channel is " + " but a message is received on  " + COMMUNICATION_CHANNEL_SERIAL + "")
    }
})
// Button B decrements the radio group
input.onButtonPressed(Button.B, function () {
    basic.showLeds(`
        # # # . .
        # . . # .
        # # # . .
        # . . # .
        # # # . .
        `)
    increment_radio_group(-1)
    basic.showNumber(conf_radio_group)
})
// Register the controller if no one is registered yet
function register_controller (name: string) {
    if (conf_controller_name == CONTROLLER_UNDEFINED) {
        conf_controller_name = name
        emit_message("{hearbeat\":" + get_emitter_json_string() + "}")
    } else {
    	
    }
}
function get_bot_info_string () {
    return "{ \"collected\":" + ("" + var_count_collected) + ", \"distance\" :" + ("" + var_bot_travelled_distance) + ",\"status\":\"" + var_bot_current_status + "\"}"
}
// Emits the message to the defined destination.
function emit_message (msg: string) {
    if (conf_communication_channel == COMMUNICATION_CHANNEL_RADIO) {
        radio.sendString(msg)
    } else if (conf_communication_channel == COMMUNICATION_CHANNEL_NONE) {
        basic.showString(msg)
    } else if (conf_communication_channel == COMMUNICATION_CHANNEL_SERIAL) {
        serial.writeString(msg)
    } else {
        basic.showString("WARNING: Invalid message_destination")
    }
}
function on_received_message (message: string) {
    send_acknowledge(message)
}
// internal function: emitter json string
function get_emitter_json_string () {
    return "{\"from\":" + control.deviceName() + "\", \"at_ms\":" + ("" + control.millis()) + "}"
}
// You can use message over serial  to test your code
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    if (conf_communication_channel == COMMUNICATION_CHANNEL_SERIAL) {
        on_received_message(serial.readLine())
    } else {
        send_log(LOG_LEVEL_ERROR, "Communication channel is " + " but a message is received on  " + COMMUNICATION_CHANNEL_SERIAL + "")
    }
})
function increment_radio_group (increment: number) {
    conf_radio_group += increment
    if (conf_radio_group > RADIO_GROUP_MAX) {
        conf_radio_group = RADIO_GROUP_MIN
    } else if (conf_radio_group < RADIO_GROUP_MIN) {
        conf_radio_group = RADIO_GROUP_MAX
    }
    send_log("INFO", "updated radio_group to" + ("" + conf_radio_group))
}
function init_conf_and_vars () {
    // Do not change message destination after start.
    conf_communication_channel = COMMUNICATION_CHANNEL_RADIO
    // Name of controller. This will be updated by code : do not touch
    conf_controller_name = CONTROLLER_UNDEFINED
    conf_radio_group = RADIO_GROUP_MIN
    radio.setGroup(conf_radio_group)
    var_bot_travelled_distance = 0
    var_count_collected = 0
    var_bot_current_status = "undefined status"
}
// implement your own code here
// Add your code in to handle the STOP req
// Add your code in to handle the STOP request from controller
function tournament_stop () {
    send_log(LOG_LEVEL_INFO, "stop! ")
}
let RADIO_GROUP_MIN = 0
let var_bot_current_status = ""
let var_bot_travelled_distance = 0
let var_count_collected = 0
let conf_controller_name = ""
let conf_communication_channel = ""
let COMMUNICATION_CHANNEL_SERIAL = ""
let COMMUNICATION_CHANNEL_NONE = ""
let COMMUNICATION_CHANNEL_RADIO = ""
let CONTROLLER_UNDEFINED = ""
let LOG_LEVEL_ERROR = ""
let LOG_LEVEL_WARNING = ""
let LOG_LEVEL_DEBUG = ""
let MSG_KEY_LOG = ""
let RADIO_GROUP_MAX = 0
let conf_radio_group = 0
let MSG_KEY_HEARTBEAT = ""
let LOG_LEVEL_INFO = ""
let MSG_KEY_STATUS = ""
let MSG_KEY_EMITTER = ""
let MSG_KEY_ACKNOWLEDGE = ""
function on_received_string(receivedString: any) {
    
}
basic.showIcon(IconNames.SmallSquare)
init_constants()
init_conf_and_vars()
basic.showIcon(IconNames.Square)
loops.everyInterval(1000, function () {
    send_heart_beat()
})
