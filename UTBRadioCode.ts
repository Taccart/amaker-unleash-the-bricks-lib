// UTBRadio.ts
// Library for Amaker Unleash The Bricks contest radio communication
// Typescript code adapted to micro:bit limitations
namespace UTBRadioCode {
    let _isEchoToConsole = false;


    export enum LogLevel {
        Debug = 10,
        Info = 20,
        Warning = 30,
        Error = 40,
        Critical = 50,
    }
export const MESSAGE_KEYS : { [key: string]: string } = {
        K_FROM: "from",
        K_TO: "to",
        K_TIMESTAMP: "ts",
        K_TYPE: "type",
        K_LOG_LEVEL: "lvl",
        K_PAYLOAD: "payload",
        K_STATUS_STATE: "state",
        K_STATUS_COUNT: "count",
        K_TEAM: "team",
    }
    export enum MessageType {
        DECLARETEAM,
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
            case MessageType.DECLARETEAM: return "DECLARETEAM";
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
    /**
     * Checks if a message is intended for this device.
     * @param kv Key-value pairs of the message to check
     * @returns True if the message is for this device, false otherwise
     */
    export function isMessageForMe(kv: { [key: string]: string }): boolean {
        return (kv[MESSAGE_KEYS.K_TO] === deviceId || kv[MESSAGE_KEYS.K_TO] === "*")
    }
    
    /**
     * Validates the structure of a received message : must contain from, to and type keys
     * @param kv Key-value pairs of the message to validate
     * @returns True if the message is valid, false otherwise
     */
    export function isValidMessage(kv: { [key: string]: string }): boolean {
        if (!(kv[MESSAGE_KEYS.K_FROM] && kv[MESSAGE_KEYS.K_TO] && kv[MESSAGE_KEYS.K_TYPE])) {
            console.log("Incomplete message: " + JSON.stringify(kv));
            return false;
        }
        return true;
    }
    /**
     * Checks if a message is an intercom message.
     * @param kv Key-value pairs of the message to check
     * @returns True if the message is an intercom message, false otherwise 
     */
    export function isIntercom(kv: { [key: string]: string }): boolean {
        return (kv[MESSAGE_KEYS.K_TYPE] === getMessageTypeLabel(MessageType.INTERCOM));
    }

    export function getIntercom(s: string): { [key: string]: string } {
        const kv = parseMessage(s);
        if (!isValidMessage(kv)) {
            console.log(`Ignore Invalid message: ${s}`);
            return null;
        }

        if (!isMessageForMe(kv)) {
            console.log(`Ignore message not for me: ${s}`);
            return null;
        }

        if (!isIntercom(kv)) {
            console.log(`Ignore non intercom message: ${s}`);
            return null;
        }
        return kv;
    }

    let _initialized = false;
    let _radioLogLevel: LogLevel = LogLevel.Warning
    let _radioGroup: number
    export function init(radioGroup: number = 1): void {
        setRadioGroup(radioGroup);
        _initialized = true;

    }

    const RADIO_GROUP = { MIN: 0, MAX: 8 };
    export function setLogLevel(ll: UTBRadioCode.LogLevel) {
        _radioLogLevel = ll;
    }
    export function getLogLevel(): UTBRadioCode.LogLevel {
        return _radioLogLevel;
    }


    export const deviceId = control.deviceName() + "." + control.deviceSerialNumber().toString();
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

    // Shared utility functions
    export function parseMessage(msg: string): { [key: string]: string } {
        const parts = msg.split("\t");
        const result: { [key: string]: string } = {};
        for (const part of parts) {
            const [key, value] = part.split("=");
            if (key && value) {
                result[key.trim()] = value.trim();
            }
        }
        return result;
    }

    export function buildMessage(obj: { [key: string]: string }): string {
        return Object.keys(obj)
            .map(key => `${key}=${obj[key]}`)
            .join("\t");
    }


    export function validateRadioGroup(group: number): number {
        if (group < RADIO_GROUP.MIN) return RADIO_GROUP.MIN;
        if (group > RADIO_GROUP.MAX) return RADIO_GROUP.MAX;
        return group;
    }

    export function createMessage(): { [key: string]: string } {
        const msg: { [key: string]: string } = {};
        msg[MESSAGE_KEYS.K_FROM] = deviceId;
        msg[MESSAGE_KEYS.K_TIMESTAMP] = control.millis().toString();
        return msg;

    }
    export function emitHeartBeat() {
        if (!isInitialized()) {
            console.log("UTBRadio not initialized. Please call UTBRadio.init() first.");
            return;
        }
        const msgObj = createMessage();
        msgObj[MESSAGE_KEYS.K_TYPE] = getMessageTypeLabel(MessageType.HEARTBEAT);
        emitMessage(buildMessage(msgObj));
    }

    export function emitMessage(msg: string) {
        if (!isInitialized()) {
            console.log("UTBRadio not initialized. Please call UTBRadio.init() first.");
            return;
        }
        if (_isEchoToConsole) {
            console.log("emitMessage: " + msg);
        }
        radio.sendString(msg);
    }
    export function emitLog(level: LogLevel, message: string) {
        if (level >= UTBRadioCode.getLogLevel()) {
            const msgObj = UTBRadioCode.createMessage();
            msgObj[MESSAGE_KEYS.K_TYPE] = getMessageTypeLabel(MessageType.LOG);
            msgObj[MESSAGE_KEYS.K_LOG_LEVEL] = level.toString();
            msgObj[MESSAGE_KEYS.K_PAYLOAD] = message;
            UTBRadioCode.emitMessage(UTBRadioCode.buildMessage(msgObj));
        }
    }
}
