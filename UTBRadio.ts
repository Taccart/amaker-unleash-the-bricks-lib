// UTBRadio.ts
// Library for Amaker Unleash The Bricks contest radio communication
// wrapper for UTBRadioCode to be exposed in https://makecode.microbit.org/

//% color=#000835 weight=1000 icon="\u16C9"
namespace UTBRadio {
   
    let _initialized: boolean = false;

    //% group="Communication"
    //% blockId=utb_increment_radio_group block="increment radio group by %inc"
    //% inc.defl=1
    export function incrementRadioGroup(inc: number):number {
        return UTBRadioCode.incrementRadioGroup(inc);

    }
//% group="Communication"
    //% blockId=utb_set_radio_group block="set radio group %group"
    //% weight=90
    export function setRadioGroup(group: number): void {
        UTBRadioCode.setRadioGroup(group);
    }

    //% group="Communication"
    //% blockId=utb_init block="Initialize radio group %radioGroup"
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

        //% group="Communication"
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
