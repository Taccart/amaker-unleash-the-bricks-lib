// UTBRadio.ts
// Library for Amaker Unleash The Bricks contest radio communication
// wrapper for UTBRadioCode to be exposed in https://makecode.microbit.org/

//% color=#300000 weight=1000 icon="\u25a3"
namespace UTBRadio {
    import LogLevel = UTBRadioCode.LogLevel;
    import MessageType = UTBRadioCode.MessageType;

    let _initialized: boolean = false;


    //% blockId=utb_init block="Initialize radio group %radioGroup"
    //% group="Mandatory"
    //% weight=100
    export function init(radioGroup: number = 1): void {
        UTBRadioCode.init(radioGroup);
    }

    //% blockId=contest_emit_heart_beat block="Emit heart beat" group="contest"
    export function emitHeartBeat() {
        if (!UTBRadioCode.isInitialized()) {
            console.log("UTBRadio not initialized. Please call UTBRadio.init() first.");
            return  ;
        }
        UTBRadioCode.emitHeartBeat();
    }
    // Communication functions
    //% blockId=contest_emit_log block="Emit log level $level with message $message" group="contest"
    //% level.defl=LogLevel.Info
    //% level.fieldEditor="gridpicker"
    //% level.fieldOptions.decompileLiterals=true
    //% weight=100
    export function emitLog(level: LogLevel, message: string) {
        if (!UTBRadioCode.isInitialized()) {
            console.log("UTBRadio not initialized. Please call UTBRadio.init() first.");
        }
        UTBRadioCode.emitLog(level, message);
    }
    /**
     * Gets the selected message type.
     * @param mt The message type to select.
     */
    //% blockId=utb_message_type block="message type %mt" advanced=true
    export function getMessageType(mt: MessageType): MessageType {
        return mt;
    }




    /**
        * Gets the selected log level.
        * @param ll The log level to select.
        */
    //% blockId=utb_get _log_level block="get log level" advanced=true
    export function getLogLevel(): LogLevel {
        return UTBRadioCode.getLogLevel();
    }
    /**
        * Sets the selected log level.
        * @param ll The log level to select.
        */
    //% blockId=utb_set_log_level block="set log level %ll" advanced=true
    export function setLogLevel(ll: LogLevel) {
        UTBRadioCode.setLogLevel(ll);
    }


    //% blockId=utb_set_radio_group block="set radio group %group"advanced=true
    //% weight=90
    export function setRadioGroup(group: number): void {
        UTBRadioCode.setRadioGroup(group);
    }

    //% blockId=utb_get_radio_group block="get radio group"advanced=true
    //% weight=90
    export function getRadioGroup(): number {
        return UTBRadioCode.getRadioGroup();
    }


}
