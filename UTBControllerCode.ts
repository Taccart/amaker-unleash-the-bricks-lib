

//% weight=10 color=#1a61a9 icon="\uf013" block="sdsd-motor"
namespace UTBControllerCode {
    export const COMMAND_START = "START";
    export const COMMAND_STOP = "STOP";
    export const COMMAND_DANGER = "DANGER";
    export const COMMAND_OBEYME = "OBEYME";

    export function initialize(): void {
        UTBRadioCode.init();
        sendObeyMe()
        radio.onReceivedString(onRadioReceivedString)
    }


    export function onRadioReceivedString(receivedString: string): void {
        let msgString=`failed to parse receivedString ${receivedString}`
        const msgObj : UTBRadioCode.RadioMessage= UTBRadioCode.RadioMessage.decode(receivedString);

        msgString= msgObj ? `from=${msgObj.from},type=${msgObj.type},payload=${msgObj.payload}` : msgString;
        serial.writeString( msgString + serial.NEW_LINE);
    }

    export function sendActionStart(): void {
        let msgObj : UTBRadioCode.RadioMessage = new UTBRadioCode.RadioMessage(UTBRadioCode.MessageType.INTERCOM, COMMAND_START);
        UTBRadioCode.emitString(msgObj.encode());
    }
    export function sendObeyMe() :void { 
        let msgObj : UTBRadioCode.RadioMessage = new UTBRadioCode.RadioMessage(UTBRadioCode.MessageType.INTERCOM, COMMAND_OBEYME);
        UTBRadioCode.emitString(msgObj.encode());

    }
    export function sendActionStop(): void {
        let msgObj : UTBRadioCode.RadioMessage = new UTBRadioCode.RadioMessage(UTBRadioCode.MessageType.INTERCOM, COMMAND_STOP);
        UTBRadioCode.emitString(msgObj.encode());
    }
    export function sendActionDanger(): void {
        let msgObj : UTBRadioCode.RadioMessage = new UTBRadioCode.RadioMessage(UTBRadioCode.MessageType.INTERCOM, COMMAND_DANGER);
        UTBRadioCode.emitString(msgObj.encode());
    
    }

    
}
