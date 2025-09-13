// UTBBot.ts
// Library for Amaker Unleash The Bricks contest bot communication and status management
// wrapper for UTBBotCode to be exposed in https://makecode.microbit.org/

//% color=#4f0230 weight=1000 icon="\u26D0"
namespace UTBBot {


    
    //% group="Bot"

    //% blockId=conf_init_communication_channel block="Initialize as bot, team is %teamName"
    //% teamName.defl=UTBBotCode.TeamName.UNDEFINED
    //% teamName.fieldEditor="gridpicker"
    //% teamName.fieldOptions.decompileLiterals=true
    export function initAsBot(teamName: UTBBotCode.TeamName): void {
        UTBBotCode.initialize(teamName);


    }
    //% group="Bot"
    //% blockId=contest_get_bot_status block="Get bot current status"
    //% advanced=true
    export function getBotStatus(): UTBBotCode.BotStatus {
        return UTBBotCode.getBotStatus();
    }

    //% group="Bot"
    //% help=contest/on-received-start
    //% blockId=contest_on_start_received block="on Start"
    //% description="Register a callback to run when a Start message is received from the controller. An acknowledgement is sent back to the controller."
    export function onMessageStartReceived(callback: () => void) {

        UTBBotCode.setOnStartCallback(callback);
        UTBBotCode.emitAcknowledgement(UTBBotCode.IntercomType.START);
    }
    //% group="Bot"
    //% help=contest/on-stop-received
    //% blockId=contest_on_stop_received block="on Stop"
    //% description="Register a callback to run when a Stop message is received from the controller. An acknowledgement is sent back to the controller."
    export function onMessageStopReceived(callback: () => void) {
        UTBBotCode.setOnStopCallback(callback);
        UTBBotCode.emitAcknowledgement(UTBBotCode.IntercomType.STOP);
    }

    //% group="Bot"
    //% help=contest/on-danger_received
    //% blockId=contest_on_danger_received block="on Danger"
    //% description="Register a callback to run when a Danger message is received from the controller. An acknowledgement is sent back to the controller."
    export function onMessageDangerReceived(callback: () => void) {
        UTBBotCode.setOnDangerCallback(callback);
        UTBBotCode.emitAcknowledgement(UTBBotCode.IntercomType.DANGER);
    }

    //% group="Bot"
    //% blockId=contest_emit_heartbeat block="Emit heartbeat"
    export function emitHeartBeat() {
        UTBRadioCode.emitHeartBeat();
    }

    //% group="Bot
    //% blockId=contest_emit_acknowledgement block="Emit acknowledgement for $command"
    //% advanced=true
    export function emitAcknowledgement(command: UTBBotCode.IntercomType) {
        UTBBotCode.emitAcknowledgement(command);
    }

    //% group="Bot"getIntercomType
    //% blockId=contest_emit_status block="Emit bot status"
    export function emitStatus() {
        UTBBotCode.emitStatus();
    }

    //% group="Bot"
    //% blockId=contest_bot_status block="Change bot status to $bot_status" blockGap=16
    //% bot_status.defl=UTBBotCode.BotStatus.Idle
    //% bot_status.fieldEditor="gridpicker"
    //% bot_status.fieldOptions.decompileLiterals=true
    //% group="conf"
    //% weight=20
    export function newBotStatus(bot_status: UTBBotCode.BotStatus) {
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
    //% blockId=utb_device_name block="device Id "
    //% group="Bot"
    //% description="Returns a unique device name based on device name and serial number"
    //% advanced=true
    export function getDeviceId(): string {
        return UTBRadioCode.deviceId

    }
    //% group="Bot"
    //% blockId=contest_get_collected_balls_count block="Get collect count"
    //% advanced=true
    export function getCollectedBallsCount(): number {
        return UTBBotCode.getCollectedBallsCount();
    }
   
}
