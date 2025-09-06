

//% weight=10 color=#1a61a9 icon="\uf013" block="sdsd-motor"
namespace UnleashTheBricksBridge {
    //%  blockId="messagetype" enumName="MessageType" group="UTB Core"
    export enum MessageType {
        //% blockId=messagetype._intercom block="Intercom"
        INTERCOM,
        //% blockId=messagetype._status block="Status"
        STATUS,
        //% blockId=messagetype._log block="Log"
        LOG,
        //% blockId=messagetype._heartbeat block="Heartbeat"
        HEARTBEAT,
        //% blockId=messagetype._acknowledge block="Acknowledge"
        ACKNOWLEDGE
    }

    //% block blockId="botstatus" enumName="BotStatus" group="Contest"
    export enum BotStatus {
        //% blockIdentity=botstatus._bringbak block="Bring Back"
        BringBack,
        //% blockIdentity=botstatus._capture block="Capture"
        Capture,
        //% blockIdentity=botstatus._defend block="Defend"
        Defend,
        //% blockIdentity=botstatus._idle block="Idle"
        Idle,
        //% blockIdentity=botstatus._toshelter block="Move To Shelter"
        ToShelter,
        //% blockIdentity=botstatus._messing block="Messing"
        Messing,
        //% blockIdentity=botstatus._other  block="Other"
        Other,
        //% blockIdentity=botstatus._search  block="Search"
        Search,
        //% blockIdentity=botstatus._steal block="Steal"
        Steal
    }
  //% block blockId="payload" enumName="PayloadIntercom" group="UTB Core"
    export enum PayloadIntercom {
        //% blockIdentity=payload._heartbeat block="Heartbeat"
        HEARTBEAT,
        //% blockIdentity=payload._status block="Status"
        STATUS,
        //% blockIdentity=payload._start  block="Start"
        START,
        //% blockIdentity=payload._stop  block="Stop"
        STOP,
        //% blockIdentity=payload._danger  block="Danger"
        DANGER,
        //% blockIdentity=payload._obeyme block="Obey Me"
        OBEYME,
        //% blockIdentity=payload._iobey block="I Obey"
        IOBEY

    }
    //% block blockId="loglevel" enumName="LogLevel" group="UTB Core"
    export enum LogLevel {
        //% blockIdentity=loglevel._debug block="Debug"
        Debug = 10,
        //% blockIdentity=loglevel._info block="Info"
        Info = 20,
        //% blockIdentity=loglevel._warn block="Warning"
        Warning = 30,
        //% blockIdentity=loglevel._error block="Error"
        Error = 40,
        //% blockIdentity=loglevel._critical block="Critical"
        Critical = 50,
    }

    export const MESSAGE_KEYS = {
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

    //% block blockId="teamName" enumName="teamName" group="contest"
    //% color=#300000 weight=1000 icon="\u2058" groups='["Amaker", "Contest"]'
    export enum TeamName {
        //% blockIdentity=team._amaBot block="AmaBot"
        AmaBot = "AmaBot",
        //% blockIdentity=team._bridgethebrick block="BridgeTheBrick"
        BridgeTheBrick = "Brick The Bridge",
        //% blockIdentity=team._BwT block="BwT"
        BwT = "BwT",
        //% blockIdentity=team._geminator block="GEMinator"
        GEMinator = "GEMinator",
        //% blockIdentity=team.requiemforabot block="RequiemForABot"
        RequiemForABot = "Requiem For A Bot",
        //% blockIdentity=team._teamrocket block="TeamRocket"
        TeamRocket = "Team Rocket",
        //% blockIdentity=team._terminator block="Terminator"
        Terminator = "Terminatr",
        //% blockIdentity=team._teslacybertruck block="TeslaCybertruck"
        TeslaCybertruck = "Tesla Cybertruck",

        UNDEFINED = "Undefined"

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

    export function getDeviceName(): string {
        return control.deviceName() + "." + control.deviceSerialNumber().toString();
    }

    export function validateRadioGroup(group: number): number {
        if (group < 0) return 0;
        if (group > 8) return 8;
        return group;
    }

    export function createBaseMessage(from: string, to: string = "*"): { [key: string]: string } {
        const msg: { [key: string]: string } = {};
        msg[MESSAGE_KEYS.K_FROM] = from;
        msg[MESSAGE_KEYS.K_TO] = to;
        msg[MESSAGE_KEYS.K_TIMESTAMP] = control.millis().toString();
        return msg;
    }
}
