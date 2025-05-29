/**
 * Custom blocks
 */

enum TournamentActions {
    //% block="Start"
    START,
    //% block="Stop"
    STOP,
    //% block="Safety"
    SAFETY,

}
//% weight=100 color=#0fbc11 icon=""
namespace UnleashTheGeekSlaves {
    //% blockId="log_level" enumName="LogLevel"
    export enum LogLevel {
        //% block="info"
        Info="INF",
        //% block="debug"
        Debug="DBG",
        //% block="warning"
        Warning="WRN",
        //% block="error"
        Error="ERR"
    }

    //% blockId="communication_channel" enumName="CommunicationChannel"
    export enum CommunicationChannel {
        //% block="radio"
        Radio,
        //% block="led"
        Led,
        //% block="serial"
        Serial
    }

    // Constants
    const RADIO_GROUP_MIN = 0
    const RADIO_GROUP_MAX = 16
    const CONTROLLER_UNDEFINED = "undefined"
    const MSG_KEY_HEARTBEAT = "heartbeat"
    const MSG_KEY_ACKNOWLEDGE = "acknowledge"
    const MSG_KEY_LOG = "log"
    const MSG_KEY_STATUS = "status"
    const MSG_KEY_EMITTER = "emitter"

    // Variables
//     let conf_communication_channel: CommunicationChannel = CommunicationChannel.Radio
//     let var_bot_current_status = "undefined status"
//     let var_count_collected = 0
//     let conf_controller_name = CONTROLLER_UNDEFINED
//     let conf_radio_group = RADIO_GROUP_MIN

    /**
     * Initialize configuration and variables.
     */
    //% block="init conf and vars"
//     export function init_conf_and_vars () {
//         conf_communication_channel = CommunicationChannel.Radio
//         conf_controller_name = CONTROLLER_UNDEFINED
//         conf_radio_group = RADIO_GROUP_MIN
//         radio.setGroup(conf_radio_group)
//         var_count_collected = 0
//         var_bot_current_status = "undefined status"
//     }
//
//     /**
//      * Send acknowledgement of message received.
//      * @param message The acknowledgement message to send.
//      */
//     //% block="send acknowledge $message"
//     //% message.defl="OK"
//     export function send_acknowledge (message: string) {
//         emit_message(get_json_string(MSG_KEY_ACKNOWLEDGE, message))
//     }
//
//     /**
//      * Send status message.
//      * @param status The status message to send.
//      */
//     //% block="send status $status"
//     //% status.defl="OK"
//     export function send_status (status: string) {
//         emit_message(get_json_string(MSG_KEY_STATUS, status))
//     }
//
//     /**
//      * Send a log message with a specified level.
//      */
//     //% block="send log level $level message $message"
//     //% level.type="LogLevel"
//     //% level.defl=LogLevel.Info
//     //% message.defl="log message"
//     export function send_log (level: LogLevel, message: string) {
//         emit_message(get_json_string(MSG_KEY_LOG, `{"level":"${level}", "message":"${message}"}`))
//     }
//
//     /**
//      * Send a heartbeat message.
//      */
//     //% block="send heart beat"
//     export function send_heart_beat () {
//         emit_message(get_json_string(MSG_KEY_HEARTBEAT, ""))
//     }
//
//     /**
//      * Register the controller with a given name.
//      */
//     //% block="register controller $name"
//     //% name.defl="controller"
//     export function register_controller (name: string) {
//         if (conf_controller_name === CONTROLLER_UNDEFINED) {
//             conf_controller_name = name
//             emit_message(`{"hearbeat":${get_emitter_json_string()}}`)
//         } else {
//             send_log(LogLevel.Warning, `controller is ${conf_controller_name} : cannot change to ${name}`)
//         }
//     }
//
//     /**
//      * Get the bot information string.
//      */
//     //% block="get bot info string"
//     export function get_bot_info_string (): string {
//         return `{"collected":${var_count_collected},"status":"${var_bot_current_status}"}`
//     }
//
//     /**
//      * Emit a message to the configured communication channel.
//      */
//     //% block="emit message $msg"
//     //% msg.defl="message"
//     export function emit_message (msg: string) {
//         switch (conf_communication_channel) {
//             case CommunicationChannel.Radio:
//                 radio.sendString(msg)
//                 break
//             case CommunicationChannel.Led:
//                 basic.showString(msg)
//                 break
//             case CommunicationChannel.Serial:
//                 serial.writeString(msg)
//                 break
//             default:
//                 basic.showString("WARNING: Invalid message_destination")
//         }
//     }
//
//     /**
//      * Called when a message is received.
//      */
//     //% block="on received message $message"
//     //% message.defl="message"
//     export function on_received_message (message: string) {
//         send_acknowledge(message)
//     }
//
//     /**
//      * Increment the radio group.
//      */
//     //% block="increment radio group $increment"
//     //% increment.defl=1
//     export function increment_radio_group (increment: number) {
//         conf_radio_group += increment
//         if (conf_radio_group > RADIO_GROUP_MAX) {
//             conf_radio_group = RADIO_GROUP_MIN
//         } else if (conf_radio_group < RADIO_GROUP_MIN) {
//             conf_radio_group = RADIO_GROUP_MAX
//         }
//         send_log(LogLevel.Info, `updated radio_group to ${conf_radio_group}`)
//     }
//
//     /**
//      * Tournament safety function.  Add code here to handle safety requests.
//      */
//     //% block="tournament safety"
//     export function tournament_safety () {
//         send_log(LogLevel.Info, "safety! ")
//     }
//
//     /**
//      * Tournament start function.  Add code here to handle start requests.
//      */
//     //% block="tournament start"
//     export function tournament_start () {
//         send_log(LogLevel.Info, "start! ")
//     }
//
//     /**
//      * Tournament stop function.  Add code here to handle stop requests.
//      */
//     //% block="tournament stop"
//     export function tournament_stop () {
//         send_log(LogLevel.Info, "stop! ")
//     }
//
//     /**
//      * internal function: emitter json string
//      */
//     function get_emitter_json_string (): string {
//         return `{"from":"${control.deviceName()}", "at_ms":"${control.millis()}"}`
//     }
//
//     /**
//      * internal function: get json string
//      */
//     function get_json_string (message_key: string, json_payload: string): string {
//         return `{"${message_key}": {"${MSG_KEY_EMITTER}": ${get_emitter_json_string()}${json_payload ? `, "payload": ${json_payload}` : ""}}}`
//     }
// }
//
// // Basic test program
// basic.showIcon(IconNames.SmallSquare)
// UnleashTheGeekSlaves.init_conf_and_vars()
// basic.showIcon(IconNames.Square)
// loops.everyInterval(1000, function () {
//     UnleashTheGeekSlaves.send_heart_beat()
// })
//
// input.onButtonPressed(Button.A, function () {
//     basic.showLeds(`
//         # # # . .
//         # . . # .
//         # # # # .
//         # . # . .
//         # . . # .
//         `)
//     UnleashTheGeekSlaves.increment_radio_group(1)
//     radio.setGroup(UnleashTheGeekSlaves.conf_radio_group)
//     UnleashTheGeekSlaves.send_log(UnleashTheGeekSlaves.LogLevel.Warning, `radio group = ${UnleashTheGeekSlaves.conf_radio_group}`)
//     basic.showNumber(UnleashTheGeekSlaves.conf_radio_group)
// })
//
// radio.onReceivedString(function (receivedString) {
//     UnleashTheGeekSlaves.on_received_message(receivedString)
// })

}
