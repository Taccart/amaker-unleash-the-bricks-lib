// UTBBot.ts
// Library for Amaker Unleash The Bricks contest bot communication and status management
// wrapper for UTBBotCode to be exposed in https://makecode.microbit.org/

//% color=#300000 weight=1000 icon="\u25a3" groups='["Amaker", "Communication"]'
namespace UTBBot {
    import LogLevel = UTBRadioCode.LogLevel;
    import MessageType = UTBRadioCode.MessageType;
    import IntercomType = UTBBotCode.IntercomType;
    import TeamName = UTBBotCode.TeamName;
    import BotStatus = UTBBotCode.BotStatus;
    import MESSAGE_KEYS = UTBRadioCode.MESSAGE_KEYS;

    // getTeamName removed; use TeamName[tn] directly where needed
    // Returns a unique device name based on device name and serial number
    //% blockId=utb_device_name block="device name"
    //% group="Contest"
    export function getDeviceName(): string {
        return control.deviceName() + "." + control.deviceSerialNumber().toString();

    }

    //% group="Contest"
    //% weight=1000
    //% blockId=conf_init_communication_channel block="Set bot team %teamName"
    //% teamName.defl=TeamName.UNDEFINED
    //% teamName.fieldEditor="gridpicker"
    //% teamName.fieldOptions.decompileLiterals=true
    export function initialize(teamName: TeamName): void {
        UTBBotCode.initialize(teamName);


    }

    //% blockId=contest_get_bot_status block="Get bot current status"
    //% advanced=true
    export function getBotStatus(): BotStatus {
        return UTBBotCode.getBotStatus();
    }

    // Event handlers
    //% help=contest/on-received-start
    //% blockId=contest_on_start_received block="on Start"
    //% group="events"
    export function onMessageStartReceived(callback: () => void) {

        UTBBotCode.setOnStartCallback(callback);
        emitAcknowledgement(IntercomType.START);
    }

    //% help=contest/on-stop-received
    //% blockId=contest_on_stop_received block="on Stop"
    //% group="events"
    export function onMessageStopReceived(callback: () => void) {

        UTBBotCode.setOnStopCallback(callback);
        emitAcknowledgement(IntercomType.STOP);
    }

    //% help=contest/on-danger_received
    //% blockId=contest_on_danger_received block="on Danger"
    //% group="events"
    export function onMessageDangerReceived(callback: () => void) {

        UTBBotCode.setOnDangerCallback(callback);
        emitAcknowledgement(IntercomType.DANGER);
    }

    //% blockId=contest_emit_acknowledgement block="Emit acknowledgement for $command"
    //% group="Communication"
    //% advanced=true
    export function emitAcknowledgement(command: IntercomType) {
        UTBBotCode.emitAcknowledgement(command);
    }

    //% blockId=contest_emit_status block="Emit bot status"
    //% group="Communication"
    //% advanced=true
    export function emitStatus() {
        UTBBotCode.emitStatus();
    }

    //% blockId=contest_bot_status block="Set and emit bot status to $bot_status" blockGap=16
    //% bot_status.defl=BotStatus.Idle
    //% bot_status.fieldEditor="gridpicker"
    //% bot_status.fieldOptions.decompileLiterals=true
    //% group="conf"
    //% weight=20
    export function newBotStatus(bot_status: BotStatus) {
        UTBBotCode.setBotStatus(bot_status);

    }

    //% blockId=contest_get_collected_balls_count block="Get collect count"
    export function getCollectedBallsCount(): number {
        return UTBBotCode.getCollectedBallsCount();
    }

    //% blockId=contest_increment_collected_balls_count block="Increment collect count by $n"
    //% n.defl=1
    export function incrementCollectedBallsCount(n: number): number {
        UTBBotCode.incrementCollectedBallsCount(n);
        return getCollectedBallsCount();
    }
}
