// UTBRadio.ts
// Library for Amaker Unleash The Bricks contest radio communication
// wrapper for UTBRadioCode to be exposed in https://makecode.microbit.org/

//% color=#000835 weight=1000 icon="\u16C9"
namespace UTBRadio {
   
    let _initialized: boolean = false;

    //% group="Common"
    //% blockId=utb_init block="Initialize radio with custom message %onReceiveHandler and group %radioGroup"
    //% advanced=true
    export function init(onReceiveHandler: (v: string) => void, radioGroup: number = 1): void {
        UTBRadioCode.init(onReceiveHandler, radioGroup);
    }

    //% group="Communication"
    //% blockId=contest_emit_log block="Emit log with message $message (19 char max)." 
    export function emitLog( message: string) {
        UTBRadioCode.emitLog( message);
    }
    
    //% group="Communication"
    //% blockId=contest_emit_heart_beat block="Emit heart beat" 
    //% advanced=true
    export function emitHeartBeat() {
        UTBRadioCode.emitHeartBeat();
    }   


    //% group="Common"
    //% blockId=utb_set_radio_group block="increment radio %group"
    //% weight=90
    export function incrementRadioGroup(): void {
        UTBRadioCode.incrementRadioGroup();
    }

    //% group="Common"
    //% blockId=utb_get_radio_group block="get radio group" advanced=true
    //% weight=90
    export function getRadioGroup(): number {
        return UTBRadioCode.getRadioGroup();
    }
    //% group="Communication"
    //% blockId=utb_get_device_id block="get device id" advanced=true
    export function getDeviceId(): string {
        return UTBRadioCode.deviceId;
    }
}
