// main.ts 
// Amaker Unleash The Bricks 2025 
//% color=#300000 weight=1000 icon="\u25a3" 
namespace amakerUTB2025  {

    import IntercomType = UTBBotCode.IntercomType;
    import TeamName = UTBBotCode.TeamName;
    import BotStatus = UTBBotCode.BotStatus;
    import MESSAGE_KEYS = UTBRadioCode.MESSAGE_KEYS;

    
    //% group="Bot"
    //% weight=1000
    //% blockId=conf_init_communication_channel block="Initialize as bot, team is %teamName"
    //% teamName.defl=TeamName.UNDEFINED
    //% teamName.fieldEditor="gridpicker"_(team
    //% teamName.fieldOptions.decompileLiterals=true
    export function initAsBot(teamName: TeamName): void {
        UTBBotCode.initialize(teamName);


    }
    //% group="Bot"
    //% blockId=contest_get_bot_status block="Get bot current status"
    //% advanced=true
    export function getBotStatus(): BotStatus {
        return UTBBotCode.getBotStatus();
    }

    //% group="Bot"
    //% help=contest/on-received-start
    //% blockId=contest_on_start_received block="on Start"
    //% description="Register a callback to run when a Start message is received from the controller. An acknowledgement is sent back to the controller."
    export function onMessageStartReceived(callback: () => void) {

        UTBBotCode.setOnStartCallback(callback);
        UTBBotCode.emitAcknowledgement(IntercomType.START);
    }
    //% group="Bot"
    //% help=contest/on-stop-received
    //% blockId=contest_on_stop_received block="on Stop"
    //% description="Register a callback to run when a Stop message is received from the controller. An acknowledgement is sent back to the controller."
    export function onMessageStopReceived(callback: () => void) {

        UTBBotCode.setOnStopCallback(callback);
        UTBBotCode.emitAcknowledgement(IntercomType.STOP);
    }
    //% group="Bot"
    //% help=contest/on-danger_received
    //% blockId=contest_on_danger_received block="on Danger"
    //% description="Register a callback to run when a Danger message is received from the controller. An acknowledgement is sent back to the controller."
    export function onMessageDangerReceived(callback: () => void) {

        UTBBotCode.setOnDangerCallback(callback);
        UTBBotCode.emitAcknowledgement(IntercomType.DANGER);
    }

    //% group="Bot"
    //% blockId=contest_emit_heartbeat block="Emit heartbeat"
    export function emitHeartBeat() {
        UTBRadioCode.emitHeartBeat();
    }

    //% group="Bot
    //% blockId=contest_emit_acknowledgement block="Emit acknowledgement for $command"
    //% advanced=true
    export function emitAcknowledgement(command: IntercomType) {
        UTBBotCode.emitAcknowledgement(command);
    }

    //% group="Bot"getIntercomType
    //% blockId=contest_emit_status block="Emit bot status"

    export function emitStatus() {
        UTBBotCode.emitStatus();
    }

    //% group="Bot"
    //% blockId=contest_bot_status block="Set and emit bot status to $bot_status" blockGap=16
    //% bot_status.defl=BotStatus.Idle
    //% bot_status.fieldEditor="gridpicker"
    //% bot_status.fieldOptions.decompileLiterals=true
    //% group="conf"
    //% weight=20
    export function newBotStatus(bot_status: BotStatus) {
        UTBBotCode.setBotStatus(bot_status);

    }

    //% group="Bot"
    //% blockId=contest_increment_collected_balls_count block="Increment collect count by $n"
    //% n.defl=1
    export function incrementCollectedBallsCount(n: number): number {
        UTBBotCode.incrementCollectedBallsCount(n);
        return getCollectedBallsCount();
    }

    //% group="Bot"
    //% blockId=utb_device_name block="device name"
    //% group="Bot"
    //% description="Returns a unique device name based on device name and serial number"
    //% advanced=true
    export function getDeviceName(): string {
        return control.deviceName() + "." + control.deviceSerialNumber().toString();

    }
    //% group="Bot"
    //% blockId=contest_get_collected_balls_count block="Get collect count"
    //% advanced=true
    export function getCollectedBallsCount(): number {
        return UTBBotCode.getCollectedBallsCount();
    }
}
