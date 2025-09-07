// UTBRadio.ts
// Library for Amaker Unleash The Bricks contest radio communication
// Typescript code adapted to micro:bit limitations
namespace UTBRadioCode {
    let _isEchoToConsole = false;
    let _initialized = false;
    let _radioGroup: number
    const MSG_ID_START=0
    const MSG_ID_END=4
    const MSG_TYPE_START = MSG_ID_END+1
    const MSG_TYPE_END=MSG_TYPE_START+1
    const MSG_PAYLOAD_START = MSG_TYPE_END+1
    const MSG_PAYLOAD_END = 19
    const RADIO_GROUP = { MIN: 0, MAX: 8 };

    export const deviceId = control.deviceName().substring(0, 5);
    /**
     *  radio message have a max size of 19 char.
    *  we will encode them as <<device id (5         char)>.<msg type 1 char><payload (13 char)>>
     */
    
    
    export enum MessageType {
        TEAM,
        INTERCOM,
        STATUS,
        LOG,
        HEARTBEAT,
        ACKNOWLEDGE,
        COMMAND,
        PAYLOAD
    }

    export function getMessageTypeLabel(mt: MessageType): string {
        //due limitation of microbit
        switch (mt) {
            case MessageType.TEAM: return "TEAM";
            case MessageType.INTERCOM: return "INTERCOM";
            case MessageType.STATUS: return "STATUS";
            case MessageType.LOG: return "LOG";
            case MessageType.HEARTBEAT: return "HEARTBEAT";
            case MessageType.ACKNOWLEDGE: return "ACKNOWLEDGE";
            case MessageType.COMMAND: return "COMMAND";
            case MessageType.PAYLOAD: return "PAYLOAD";
            default: return "UNKNOWN";
        }
    }
    export class RadioMessage {
        from: string   
        type: MessageType;
        payload: string;

        constructor(type: MessageType,payload: string="", from:string=deviceId) {
            this.from = from;
            this.type = type;
            this.payload = payload;
        }

        encode(): string {
            return `${this.from}${this.type}${this.payload}`;
        }
        static decode(msg: string): RadioMessage|null {
            if (msg.length < MSG_PAYLOAD_START) return null;
            const from = msg.substring(MSG_ID_START, MSG_ID_END);
            let mtInt = parseInt(msg.charAt(5));
            if (isNaN(mtInt) || mtInt < 0 || mtInt > 7) mtInt = null;
            
            const payload = msg.substring(MSG_PAYLOAD_START, MSG_PAYLOAD_END);
            return new RadioMessage( mtInt, payload, from);
        }
    
    }
     
    export function init(radioGroup: number = 1): void {
        setRadioGroup(radioGroup);
        _initialized = true;

    }

    export function isInitialized(): boolean {
        return _initialized;
    }


    
    export function setRadioGroup(group: number): void {
        _radioGroup = validateRadioGroup(group);
        radio.setGroup(_radioGroup);
    }
    export function incrementRadioGroup(): void {
        let newGroup = _radioGroup + 1;
        if (newGroup > RADIO_GROUP.MAX) newGroup = RADIO_GROUP.MIN;
        setRadioGroup(newGroup);
    }
    export function decrementRadioGroup(): void {
        let newGroup = _radioGroup - 1;
        if (newGroup < RADIO_GROUP.MIN) newGroup = RADIO_GROUP.MAX;
        setRadioGroup(newGroup);
    }
    export function toggleEchoToConsole(): void {
        _isEchoToConsole = !_isEchoToConsole;
    }

    export function getRadioGroup(): number {
        return _radioGroup;
    }

    export function validateRadioGroup(group: number): number {
        if (group < RADIO_GROUP.MIN) return RADIO_GROUP.MIN;
        if (group > RADIO_GROUP.MAX) return RADIO_GROUP.MAX;
        return group;
    }


    export function emitString(msg: string) : boolean{
        if (!isInitialized()) {
            console.log("UTBRadio not initialized. Please call UTBRadio.init() first.");
            return false;
        }
        if (msg.length>19) {
            console.warn(`emitString: message too long (${msg}`);
            msg=msg.substring(0,19);
            
        }

        console.log(`${deviceId }emitString: ${msg}`);
        radio.sendString(msg);
        return true;
    }
    export function emitHeartBeat() : boolean{

        const msg = new RadioMessage(MessageType.HEARTBEAT, Math.floor(control.millis() / 100).toString());
        return emitString(msg.encode());
    }

    export function emitLog( logmessage: string) : boolean {
        const msg = new RadioMessage(MessageType.LOG, logmessage);
        return emitString(msg.encode());
    }
}
