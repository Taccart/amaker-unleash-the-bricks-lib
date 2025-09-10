/*！
 * @file amaker-unleash-the-bricks-lib/UTBBotCode.ts
 * @brief aMaker lib for Unleash The Bricks 2025
 * @n [README](https://github.com/Taccart/amaker-unleash-the-bricks-lib/blob/master/README.md)
 *
 * @copyright	TAccart, 2025
 * @copyright	GNU Lesser General Public License
 * @author TAccart
 * * @version  V0.0.0alpha
 * @date  2025-09-10
 */
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
    let _team: TeamName = TeamName.UNDEFINED;
    let _controllerName: string;
    let _collectedBallsCount = 0;
    let _botStatus: BotStatus = BotStatus.Idle;
    let _isIniti/*！
 * @file amaker-unleash-the-bricks-lib/UTBControllerCode.ts
 * @brief aMaker lib for Unleash The Bricks 2025
 * @n [README](https://github.com/Taccart/amaker-unleash-the-bricks-lib/blob/master/README.md)
 *
 * @copyright	TAccart, 2025
 * @copyright	GNU Lesser General Public License
 * @author TAccart
 * * @version  V0.0.0alpha
 * @date  2025-09-10
 */alized = false;

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
        UTBRadioCode.init();
        radio.onReceivedString(onReceivedString);
        
        _isInitialized = true;
    }
    export function isInitialized(): boolean {
        return _isInitialized;
    }

    // Use a plain object with string keys for micro:bit compatibility

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

    export function emitTeamName(tn: TeamName):boolean {
        const msg = new UTBRadioCode.RadioMessage(UTBRadioCode.MessageType.LOG, getTeamNameLabel(tn));
        return  UTBRadioCode.emitString(msg.encode());
    }
    
    export function emitStatus() :boolean{
        const msg = new UTBRadioCode.RadioMessage(UTBRadioCode.MessageType.STATUS,  getBotStatusLabel(getBotStatus()));
        return  UTBRadioCode.emitString(msg.encode());
    
    }
    
    export function resetCollectCount() {
        _collectedBallsCount = 0;
    }
    export function emitAcknowledgement(itc: IntercomType) :boolean{

        const msg = new UTBRadioCode.RadioMessage(UTBRadioCode.MessageType.ACKNOWLEDGE,  getIntercomLabel(itc));
        return  UTBRadioCode.emitString(msg.encode());
        UTBRadioCode.emitLog("IOBEYTO" + _controllerName );

            
    }

    export function registerControllerName(name: string) {

        if (!_controllerName) {
            _controllerName = name;
            console.log(`My controller is now ${_controllerName}`)
            emitAcknowledgement(IntercomType.IOBEY);
        } else {
            console.log(`My controller is already  ${_controllerName} : I deny order from ${name}`)
            UTBRadioCode.emitLog("IOBEYTO" + _controllerName +"DENY"+name);
        }
    }
    
    
    
    export function onReceivedString(s: string) : void {
        const rmsg: UTBRadioCode.RadioMessage= UTBRadioCode.RadioMessage.decode(s);
        if (!rmsg || rmsg.type !== UTBRadioCode.MessageType.INTERCOM) {
            console.log(`Not in intercom : I don't care`)
            return ;}

        if  (rmsg.payload===UTBControllerCode.COMMAND_OBEYME) {
          _callbacks.onObeyMe(rmsg.from); 
          return}

        if (rmsg.from !== _controllerName) 
        {
            console.log(`Intercom emitted by illegitimate source ${rmsg.from} - my controller is ${_controllerName}`);
            return
        }
        
        switch (rmsg.payload) {
            case UTBControllerCode.COMMAND_START: _callbacks.onStart(); break;
            case UTBControllerCode.COMMAND_STOP: _callbacks.onStop(); break;
            case UTBControllerCode.COMMAND_DANGER: _callbacks.onDanger(); break;
            
            default: {
                console.log(`Unhandled intercom: ${rmsg.payload}`);
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
