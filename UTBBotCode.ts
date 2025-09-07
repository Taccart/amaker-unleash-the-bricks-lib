// UTBBotCode.ts
// Library for Amaker Unleash The Bricks contest bot communication and status management
// Typescript code adapted to micro:bit limitations

namespace UTBBotCode {

    export enum BotStatus     {
        BringBack,
        Capture,
        Defend,
        Idle,
        ToShelter,
        Messing,
        Other,
        Search,
        Steal
    }

    export function getBotStatusLabel(bs: number): string {
        switch (bs) {
            case BotStatus.BringBack: return "Bring back"; break;
            case BotStatus.Capture: return "Capture"; break;
            case BotStatus.Defend: return "Defend"; break;
            case BotStatus.Idle: return "Idle"; break;
            case BotStatus.ToShelter: return "Back to shelter"; break;
            case BotStatus.Messing: return "Messing"; break;
            case BotStatus.Other: return "Other"; break;
            case BotStatus.Search: return "Searching"; break;
            case BotStatus.Steal: return "Stealing"; break;
            default: return "UNKNOWN"; break;
        }
    }
    export enum TeamName {
        AmaBot ,
        BridgeTheBrick,
        BwT ,
        GEMinator,
        RequiemForABot,
        TeamRocket,
        Terminator,
        TeslaCybertruck,
        UNDEFINED,
    }
    export enum IntercomType {
        HEARTBEAT,
        STATUS,
        START,
        STOP,
        DANGER,
        OBEYME,
        IOBEY
    }
    import LogLevel = UTBRadioCode.LogLevel;
    import MessageType = UTBRadioCode.MessageType;
    const MESSAGE_KEYS = UTBRadioCode.MESSAGE_KEYS;
    let _team: TeamName = TeamName.UNDEFINED;
    let _controllerName: string;
    let _collectedBallsCount = 0;
    let _botStatus: BotStatus = BotStatus.Idle;



    // State variables (with clearer naming)


    let _isInitialized = false;
    


    let _callbacks: CommandHandlerMap = {
        onStart: () => { console.log("Missing onStart callback function"); },
        onStop: () => { console.log("Missing onStop callback function"); },
        onDanger: () => { console.log("Missing onDanger callback function"); },
        onObeyMe: (name: string) => UTBBotCode.registerControllerName(name) 
    };
    
    type CommandHandlerMap = {
        onStart: () => void;
        onStop: () => void;
        onDanger: () => void;
        onObeyMe: (from: string) => void;
    };
    export function initialize(team: TeamName): void {
        _team = team;
        radio.onReceivedString(onReceivedString);
        _isInitialized = true;
    }
    export function isInitialized(): boolean {
        return _isInitialized;
    }

    // Use a plain object with string keys for micro:bit compatibility
    export function getTeamNameLabel(tn: TeamName): string {
        switch (tn) {
            case TeamName.AmaBot: return "AmaBot";
            case TeamName.BridgeTheBrick: return "BridgeTheBrick";
            case TeamName.BwT: return "BwT";
            case TeamName.GEMinator: return "GEMinator";
            case TeamName.RequiemForABot: return "RequiemForABot";
            case TeamName.TeamRocket: return "TeamRocket";
            case TeamName.Terminator: return "Terminator";
            case TeamName.TeslaCybertruck: return "TeslaCybertruck";
            case TeamName.UNDEFINED: return "UNDEFINED";
            default: return "UNKNOWN";
        }
    }
    export function getIntercomLabel(itc: IntercomType): string {
        switch (itc) {
            case IntercomType.HEARTBEAT: return "HEARTBEAT";
            case IntercomType.STATUS: return "STATUS";
            case IntercomType.START: return "START";
            case IntercomType.STOP: return "STOP";
            case IntercomType.DANGER: return "DANGER";
            case IntercomType.OBEYME: return "OBEYME";
            case IntercomType.IOBEY: return "IOBEY";
            default: return "UNKNOWN";
        }
    }
    export function setOnStartCallback(f: () => void) {
        _callbacks.onStart = f;
    }
    export function setOnStopCallback(f: () => void) {
        _callbacks.onStop = f;
    }
    export function setOnDangerCallback(f: () => void) {
        _callbacks.onDanger = f;
    }
    // Bot-specific message creation using UTBRadioCode utilities
    export function createMessage(): { [key: string]: string } {
        let msgObj = UTBRadioCode.createMessage();
        msgObj[MESSAGE_KEYS.K_TO] = _controllerName ? _controllerName : "*";
        msgObj[MESSAGE_KEYS.K_TEAM] = getTeamNameLabel(_team);
        return msgObj;
    }

    export function emitTeamName(tn: TeamName) {
        let msgObj = createMessage();
        msgObj[MESSAGE_KEYS.K_TYPE] = UTBRadioCode.getMessageTypeLabel(MessageType.DECLARETEAM);
        msgObj[MESSAGE_KEYS.K_TEAM] = getTeamNameLabel(tn);
        UTBRadioCode.emitMessage(UTBRadioCode.buildMessage(msgObj));
    }
    
    export function emitStatus() {
        let msgObj = createMessage();
        msgObj[MESSAGE_KEYS.K_TYPE] = UTBRadioCode.getMessageTypeLabel(MessageType.STATUS);
        msgObj[MESSAGE_KEYS.K_STATUS_COUNT] = _collectedBallsCount.toString();
        msgObj[MESSAGE_KEYS.K_STATUS_STATE] = _botStatus.toString();
        msgObj[MESSAGE_KEYS.K_TEAM] = getTeamNameLabel(_team);
        UTBRadioCode.emitMessage(UTBRadioCode.buildMessage(msgObj));
    }
    
    export function resetCollectCount() {
        _collectedBallsCount = 0;
    }
    export function emitAcknowledgement(itc: IntercomType) {
        if (_controllerName) {
            let msgObj = UTBRadioCode.createMessage();
            msgObj[MESSAGE_KEYS.K_TYPE] = UTBRadioCode.getMessageTypeLabel(MessageType.ACKNOWLEDGE);
            msgObj[MESSAGE_KEYS.K_PAYLOAD] = itc.toString();
            UTBRadioCode.emitMessage(UTBRadioCode.buildMessage(msgObj));
            UTBRadioCode.emitLog(LogLevel.Info, `Sent ACK for ${itc} to ${_controllerName}`);
        } else {
            UTBRadioCode.emitLog(LogLevel.Warning, `Cannot send ACK for ${itc}: No controller registered`);
        }
    }
    export function registerControllerName(name: string): void {
        if (!_controllerName) {
            _controllerName = name;
            UTBRadioCode.emitLog(LogLevel.Info, "Controller registered as " + _controllerName);
            emitAcknowledgement(IntercomType.IOBEY);
        } else {
            UTBRadioCode.emitLog(LogLevel.Warning, "Controller already registered as " + _controllerName + ". Request DENIED for " + name);
        }
    }
    
    export function onReceivedString(s: string) : void {

        const kv = UTBRadioCode.getIntercom(s);
        if (!kv) return;

        switch (kv[MESSAGE_KEYS.K_TYPE]) {
            case "START": _callbacks.onStart(); break;
            case "STOP": _callbacks.onStop(); break;
            case "DANGER": _callbacks.onDanger(); break;
            case "OBEYME": _callbacks.onObeyMe(kv[MESSAGE_KEYS.K_FROM]); break;
            default: {
                console.log(`Unhandled intercom: ${kv[MESSAGE_KEYS.K_TYPE]}`);
                break;
            }
        }
    }

    export function  getBotTeam(): TeamName {
        return _team;
    }
    
    export function getBotStatus(): BotStatus {
        return _botStatus;
    }

    export function setBotStatus(bs: BotStatus) {
        _botStatus = bs;
    }

    export function getCollectedBallsCount(): number {
        return _collectedBallsCount;
    }

    export function incrementCollectedBallsCount(n: number): void {
        _collectedBallsCount += n;
    }   
}
