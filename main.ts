// main.ts 
// Amaker Unleash The Bricks 2025 
//% color=#300000 weight=1000 icon="\u25a3" 
namespace amakerUTB2025  {

    import IntercomType = UTBBotCode.IntercomType;
    import TeamName = UTBBotCode.TeamName;
    import BotStatus = UTBBotCode.BotStatus;


    
    //% group="Bot" blockId=bot_init block="Initialize as bot, team is %teamName"
    //% teamName.defl=TeamName.UNDEFINED
    //% teamName.fieldEditor="gridpicker"
    //% teamName.fieldOptions.decompileLiterals=true
    export function initAsBot(teamName: TeamName): void {
        UTBBotCode.initialize(teamName);


    }
    //% group="Bot" blockId=bot_get_status block="Get bot current status"
    //% advanced=true
    export function getBotStatus(): BotStatus {
        return UTBBotCode.getBotStatus();
    }

    //% group="Bot" blockId=bot_on_start_received block="on Start"
    //% description="Register a callback to run when a Start message is received from the controller. An acknowledgement is sent back to the controller."
    export function onMessageStartReceived(callback: () => void) {

        UTBBotCode.setOnStartCallback(callback);
        UTBBotCode.emitAcknowledgement(IntercomType.START);
    }
    //% group="Bot"blockId=bot_on_stop_received block="on Stop"
    //% description="Register a callback to run when a Stop message is received from the controller. An acknowledgement is sent back to the controller."
    export function onMessageStopReceived(callback: () => void) {

        UTBBotCode.setOnStopCallback(callback);
        UTBBotCode.emitAcknowledgement(IntercomType.STOP);
    }
    //% group="Bot" blockId=bot_on_danger_received block="on Danger"
    //% description="Register a callback to run when a Danger message is received from the controller. An acknowledgement is sent back to the controller."
    export function onMessageDangerReceived(callback: () => void) {

        UTBBotCode.setOnDangerCallback(callback);
        UTBBotCode.emitAcknowledgement(IntercomType.DANGER);
    }

    //% group="Bot" blockId=bot_emit_heartbeat block="Emit heartbeat"
    export function emitHeartBeat() {
        UTBRadioCode.emitHeartBeat();
    }

    //% group="Bot  blockId=contest_emit_acknowledgement block="Emit acknowledgement for $command"
    //% advanced=true
    export function emitAcknowledgement(command: IntercomType) {
        UTBBotCode.emitAcknowledgement(command);
    }

    //% group="Bot" blockId=bot_emit_status block="Emit bot status"
    export function emitStatus() {
        UTBBotCode.emitStatus();
    }

    //% group="Bot" blockId=bot_set_status block="Set and emit bot status to $bot_status" blockGap=16
    //% bot_status.defl=BotStatus.Idle
    //% bot_status.fieldEditor="gridpicker"
    //% bot_status.fieldOptions.decompileLiterals=true
    export function newBotStatus(bot_status: BotStatus) {
        UTBBotCode.setBotStatus(bot_status);

    }

    //% group="Bot" blockId=bot_increment_collected_balls_count block="Increment collect count by $n"
    //% n.defl=1
    export function incrementCollectedBallsCount(n: number): number {
        UTBBotCode.incrementCollectedBallsCount(n);
        return getCollectedBallsCount();
    }

    
    //% group="Bot" blockId=bot_get_collected_balls_count block="Get collect count"
    //% advanced=true
    export function getCollectedBallsCount(): number {
        return UTBBotCode.getCollectedBallsCount();
    }
    //% group="Bot" blockId=get_device_name block="device name"
    //% description="Returns a unique device name based on device name and serial number"
    //% advanced=true
    export function getDeviceName(): string {
        return control.deviceName() + "." + control.deviceSerialNumber().toString();

    }
}
