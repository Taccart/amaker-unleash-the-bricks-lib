// UTBRadio.ts
// Library for Amaker Unleash The Bricks contest radio communication
// wrapper for UTBRadioCode to be exposed in https://makecode.microbit.org/

//% color=#300000 weight=1000 icon="\u25a3"
namespace UTBRadio {
    
    
    let _initialized: boolean = false;

    //% group="Common"
    //% blockId=utb_init block="Initialize radio group %radioGroup"
    //% advanced=true
    export function init(radioGroup: number = 1): void {
        UTBRadioCode.init(radioGroup);
    }
    //% group="Common"
    //% blockId=contest_emit_heart_beat block="Emit heart beat" 
    //% advanced=true
    export function emitHeartBeat() {
        UTBRadioCode.emitHeartBeat();
    }
        //% group="Common"
    //% blockId=contest_emit_log block="Emit log level $level with message $message" 
    //% level.defl=UTBRadioCode.LogLevel.Info
    //% level.fieldEditor="gridpicker"
    //% level.fieldOptions.decompileLiterals=true
    //% weight=100
    export function emitLog(level: UTBRadioCode.LogLevel, message: string) {
        UTBRadioCode.emitLog(level, message);
    }


    /**
        * Gets the selected log level.
        * @param ll The log level to select.
        */
           //% group="Common"
    //% blockId=utb_get _log_level block="get log level" advanced=true
    export function getLogLevel(): UTBRadioCode.LogLevel {
        return UTBRadioCode.getLogLevel();
    }
    
    //% group="Common"
    //% blockId=utb_set_log_level block="set log level %ll" advanced=true
    //% ll.defl=UTBRadioCode.LogLevel.Info
    //% ll.fieldEditor="gridpicker"
    //% ll.fieldOptions.decompileLiterals=true
    //% description="Set the log level for radio logs."
    export function setLogLevel(ll: UTBRadioCode.LogLevel) {
        UTBRadioCode.setLogLevel(ll);
    }

    //% group="Common"
    //% blockId=utb_set_radio_group block="set radio group %group"
    //% weight=90
    export function setRadioGroup(group: number): void {
        UTBRadioCode.setRadioGroup(group);
    }

    //% group="Common"
    //% blockId=utb_get_radio_group block="get radio group" advanced=true
    //% weight=90
    export function getRadioGroup(): number {
        return UTBRadioCode.getRadioGroup();
    }
    //% group="Common"
    //% blockId=utb_get_device_id block="get device id" advanced=true
    export function getDeviceId(): string {
        return UTBRadioCode.deviceId;
    }
}
