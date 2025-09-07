

//% weight=10 color=#1a61a9 icon="\uf013" block="sdsd-motor"
namespace UTBControllerCode {

    export function initialize(): void {
        UTBRadioCode.debug_message("I'M CONTROLLER")
        UTBRadioCode.init();
        sendObeyMe()
        radio.onReceivedString(onRadioReceivedString)
    }

    export function onRadioReceivedString(receivedString: string): void {
        
        serial.writeString(receivedString + serial.NEW_LINE);
    }

    export function sendActionStart(): void {
        let msgObj = UTBRadioCode.createMessage()
        msgObj[UTBRadioCode.MESSAGE_KEYS.K_TYPE] = UTBRadioCode.getMessageTypeLabel(UTBRadioCode.MessageType.INTERCOM);
        msgObj[UTBRadioCode.MESSAGE_KEYS.K_PAYLOAD] = UTBBotCode.getIntercomLabel(UTBBotCode.IntercomType.START);
        console.log("Sending START action");
        UTBRadioCode.emitMessage(UTBRadioCode.buildMessage(msgObj));
        console.log("Sent START action");
    }
    export function sendObeyMe() :void { 
        let msgObj = UTBRadioCode.createMessage()
        msgObj[UTBRadioCode.MESSAGE_KEYS.K_TYPE] = UTBRadioCode.getMessageTypeLabel(UTBRadioCode.MessageType.INTERCOM);
        msgObj[UTBRadioCode.MESSAGE_KEYS.K_PAYLOAD] = UTBBotCode.getIntercomLabel(UTBBotCode.IntercomType.OBEYME);
        console.log("Sending OBEYME action");
        UTBRadioCode.emitMessage(UTBRadioCode.buildMessage(msgObj));
        console.log("Sent OBEYME action");
    }

    export function sendActionStop(): void {
        let msgObj = UTBRadioCode.createMessage()
        msgObj[UTBRadioCode.MESSAGE_KEYS.K_TYPE] = UTBRadioCode.getMessageTypeLabel(UTBRadioCode.MessageType.INTERCOM);
        msgObj[UTBRadioCode.MESSAGE_KEYS.K_PAYLOAD] = UTBBotCode.getIntercomLabel(UTBBotCode.IntercomType.STOP);
        console.log("Sending STOP action");
        UTBRadioCode.emitMessage(UTBRadioCode.buildMessage(msgObj));
        console.log("Sent STOP action");
    }
    export function sendActionDanger(): void {
        let msgObj = UTBRadioCode.createMessage()
        msgObj[UTBRadioCode.MESSAGE_KEYS.K_TYPE] = UTBRadioCode.getMessageTypeLabel(UTBRadioCode.MessageType.INTERCOM);
        msgObj[UTBRadioCode.MESSAGE_KEYS.K_PAYLOAD] = UTBBotCode.getIntercomLabel(UTBBotCode.IntercomType.DANGER);
        console.log("Sending DANGER action");
        UTBRadioCode.emitMessage(UTBRadioCode.buildMessage(msgObj));
        console.log("Sent DANGER action");
    }

    
}
