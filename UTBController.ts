// UTBController.ts
// Library for Amaker Unleash The Bricks contest bot communication and status management
// wrapper for UTBControllerCode to be exposed in https://makecode.microbit.org/

//% color=#300000 weight=1000 icon="\u25a3" groups='["Amaker", "Communication"]'
namespace UTBController {
    //% blockId=utb_controller_on_radio_received_string block="on radio received string %receivedString"
    //% group="Communication"
    //% weight=100
    import MessageType = UTBRadioCode.MessageType;
    import LogLevel = UTBRadioCode.LogLevel;
    export function onRadioReceivedString(receivedString: string): void {
        UTBControllerCode.onRadioReceivedString(receivedString);
    }
    //% blockId=utb_controller_send_action_start block="send action START"
    export function sendActionStart(): void {
       UTBControllerCode.sendActionStart();
    }
    //% blockId=utb_controller_send_action_stop block="send action STOP"
    export function sendActionStop(): void {
        UTBControllerCode.sendActionStop();
    }
    //% blockId=utb_controller_send_action_danger block="send action DANGER"
    export function sendActionDanger(): void {
        UTBControllerCode.sendActionDanger();
    }
}