// UTBController.ts
// Library for Amaker Unleash The Bricks contest bot communication and status management
// wrapper for UTBControllerCode to be exposed in https://makecode.microbit.org/

//% color=#ff504d weight=1000 icon="\u16E4" name="amaker Controller"
namespace UTBController {

    //% group="for controller"
    //% blockId=utb_controller_init_as_controller block="Initialize as controller"

    export function initAsController (): void {
        UTBControllerCode.initialize();
    }

    //% group="for controller"
    //% blockId=utb_controller_on_radio_received_string block="on radio received string %receivedString"
    //% advanced=true
    export function onRadioReceivedString(receivedString: string): void {
        UTBControllerCode.onRadioReceivedString(receivedString);
    }
    //% group="for controller"
    //% blockId=utb_controller_send_action_start block="send intercom START"
    export function sendActionStart(): void {
       UTBControllerCode.sendActionStart();
    }
    //% group="for controller"
    //% blockId=utb_controller_send_action_stop block="send intercom STOP"
    export function sendActionStop(): void {
        UTBControllerCode.sendActionStop();
    }
    //% group="for controller"
    //% blockId=utb_controller_send_action_danger block="send intercom DANGER"
    export function sendActionDanger(): void {
        UTBControllerCode.sendActionDanger();
    }

    //% group="for controller"
    //% blockId=utb_controller_send_obey_me block="send intercom OBEY ME"
    export function sendObeyMe () :void {
        UTBControllerCode.sendObeyMe();
    }
}