
    //% blockId="log_level" enumName="LogLevel" group="helper"
    //% color=#909090 weight=1000 icon="\u1F5DF" groups='["Amaker", "Communication"]'

    enum LogLevel {
        //% blockIdentity=log._debug
        //% block="Debug"
        Debug = 10,

        //% blockIdentity=log._info
        //% block="Info"
        Info = 20,

        //% blockIdentity=log._warn
        //% block="Warning"
        Warning = 30,

        //% blockIdentity=log._error
        //% block="Error"
        Error = 40,

        //% blockIdentity=log._critical
        //% block="Critical"
        Critical = 50,
    }

    //% blockId="communication_channel" enumName="CommunicationChannel" group="setup"
    //% color=#300000 weight=1000 icon="\u1F399" groups='["Amaker", "Communication"]'
    enum CommunicationChannel {
        //% blockIdentity=communication._radio
        //% block="radio"
        Radio,

        //% blockIdentity=communication._serial
        //% block="serial"
        Serial
    }

    //% blockId="bot_status" enumName="BotStatus" group="contest"
    //% color=#300000 weight=1000 icon="\u2058" groups='["Amaker", "Communication"]'
    enum BotStatus {
        //% blockIdentity=status._searching
        //% block="Searching"
        Searching,
        //% blockIdentity=status._capturing
        //% block="Capturing"
        Capturing,
        //% blockIdentity=status._bringing_back
        //% block="Bringing back"
        BringingBack,
        //% blockIdentity=status._going_to_shelter
        //% block="Going to shelter"
        GoingToShelter,
        //% blockIdentity=status._stealing
        //% block="Stealing"
        Stealing,
        //% blockIdentity=status._defending
        //% block="Defending"
        Defending,
        //% blockIdentity=status._idle
        //% block="Idle"
        Idle
    }
    const MESSAGE_KEYS = {
        K_FROM: "from",
        K_TO: "to",
        V_TO_ALL: "*",
        K_TIMESTAMP: "ts",
        K_TYPE: "type",
        K_LOG_LEVEL: "lvl",

        K_PAYLOAD: "payload",

        K_STATUS_STATE: "state",
        K_STATUS_COUNT: "count",


        V_TYPE_INTERCOM: "intercom",
        V_TYPE_STATUS: "status",
        V_TYPE_LOG: "log",
        V_TYPE_HEARTBEAT: "heartbeat",
        V_TYPE_ACKNOWLEDGE: "acknowledge",


        V_INTERCOM_HEARTBEAT: "Heartbeat",
        V_INTERCOM_START: "Start",
        V_INTERCOM_STOP: "Stop",
        V_INTERCOM_DANGER: "Danger",
        V_INTERCOM_GETCONTROL: "Obey Me!",
    }

    /**
     * Communicate data using radio packets
     */
    //% color=#300000 weight=1000 icon="\u25a3" groups='["Amaker", "Communication"]'

    namespace UnleashTheBricks {

        const RADIO_GROUP = {
            MIN: 0,
            MAX: 15
        }

        const DEFAULT_COMMUNICATION_CHANNEL = CommunicationChannel.Radio
        
        let _is_echo_to_console = false
        let _is_initialized: boolean = false;
        let _controller_name: string
        let _collect_count: number = 0
        let _bot_status: BotStatus = BotStatus.Idle
        let _conf_communication_channel: CommunicationChannel
        let _conf_radio_group = RADIO_GROUP.MIN

        let _on_start_callback_function: () => void = function () { console.log("Missing START callback function") }
        let _on_stop_callback_function: () => void = function () { console.log("Missing STOP callback function") }
        let _on_danger_callback_function: () => void = function () { console.log("Missing DANGER callback function") }

        let _message_transmitter: (message: string) => void

        function resetCollectCount(){
            _collect_count = 0;
            
        }

        // Configuration part
        //% blockId=contest_set_echo_to_console block="Echo write messages to console $enabled"
        //% enabled.defl=true
        //% enabled.fieldEditor="toggle"
        //% enabled.fieldOptions.onText="write to console"
        //% enabled.fieldOptions.offText="silent"
        //% advanced=true
        export function setEchoToConsole(enabled: boolean) {
            _is_echo_to_console = enabled;
        }
        /**
         * MANDATORY: Initialize the communication channel.
         */
        //% blockId=contest_init block="Initialize"
        //% group="conf"
        //% weight=1000
        //% blockId=contest_init block="Initialize communication with $channel"
        //% channel.defl=CommunicationChannel.Radio
        //% channel.fieldEditor="gridpicker"
        //% channel.fieldOptions.decompileLiterals=true
        export function initCommunicationChannel(channel: CommunicationChannel) {
            _is_initialized=true
            _conf_communication_channel = channel
            if (_conf_communication_channel == CommunicationChannel.Radio) { radio.setGroup(_conf_radio_group) }
            register_message_handlers()

        }

        /**
         * Increment the radio group. Attah it to a button 
         */
        //% group="conf"
        //% blockId=contest_set_radio_group block="Increment the radio group" 
        function incrementRadioGroup(): number {
            if (!_is_initialized) {
                initCommunicationChannel(DEFAULT_COMMUNICATION_CHANNEL); // Default to Radio if not initialized
                _is_initialized = true;
            }
            _conf_radio_group = (_conf_radio_group + 1) % (RADIO_GROUP.MAX + 1);

            radio.setGroup(_conf_radio_group);
            basic.showNumber(_conf_radio_group);
            return _conf_radio_group;
        }

        -
            //% group="conf"
            //% blockId=contest_set_radio_group block="Decrement the radio group" 
            //% advanced=true
            function decrementRadioGroup(): number {
                if (!_is_initialized) {
                    initCommunicationChannel(CommunicationChannel.Radio); // Default to Radio if not initialized
                    _is_initialized = true;
                }
                _conf_radio_group = (_conf_radio_group - 1 + (RADIO_GROUP.MAX + 1)) % (RADIO_GROUP.MAX + 1);

                radio.setGroup(_conf_radio_group);
                basic.showNumber(_conf_radio_group);
                return _conf_radio_group;
            }

        //% blockId=contest_get_bot_status block="Get bot current status"
        //% advanced=true
        export function get_bot_status(): BotStatus {
            return _bot_status;
        }


        //% blockId=contest_get_bot_status_label block="Get bot current status label"
        //% advanced=true
        export function get_bot_status_label(): string {

            switch (get_bot_status()) {
                case BotStatus.Searching:
                    return "Searching";
                case BotStatus.Capturing:
                    return "Capturing";
                case BotStatus.BringingBack:
                    return "Bringing back";
                case BotStatus.GoingToShelter:
                    return "Going to shelter";
                case BotStatus.Stealing:
                    return "Stealing";
                case BotStatus.Defending:
                    return "Defending";
                case BotStatus.Idle:
                    return "Idle";
                default:
                    return "Unknown";
            }
        }

        /**
         parse message: should have key=value pairs separated by tabs
            * @param msg the message to parse
            * @returns an object with key-value pairs
        */
        function parse_received_message(msg: string): { [key: string]: string } {
            let parts = msg.split("\t");
            let result: { [key: string]: string } = {}
            for (let part of parts) {
                let [key, value] = part.split("=");
                if (key && value) {
                    result[key.trim()] = value.trim();
                }
            }
            return result
        }

        /**
            * Build a message from key-value pairs, used in communications.
            * @param obj the object containing key-value pairs
            * @returns a string formatted as key=value pairs separated by tabs
            */
        function build_message_from_kv(obj: { [key: string]: string }): string {
            return Object.keys(obj)
                .map(key => `${key}=${obj[key]}`)
                .join("\t");
        }
        /**
            * Get the current collect count.
            *
            * @returns the current collect count
            */
        //% blockId=contest_get_collect_count block="Get collect count"
        function get_collect_count(): number {
            return _collect_count
        }
        /**
            * Increment the collect count by a specified quantity.
            *
            * @param qty the quantity to increment the collect count by
            * @returns the new collect count
            */
        //% blockId=contest_increment_collect_count block="Increment collect count by $n"
        //% n.defl=1
        function increment_collect_count(n: number): number {
            _collect_count += n
            return _collect_count
        }
        /**
            * Register the controller name, used to identify the bot's controller.
            * if the controller name is already registered, it will emit a warning log.
            *
            * @param name the name of the controller
            */
        function register_controller_name(name: string) {
            if (!_controller_name) {
                _controller_name = name
                emitAcknowledgement(MESSAGE_KEYS.V_INTERCOM_GETCONTROL + " " + _controller_name)
            }
            else {
                emitLog(LogLevel.Warning, "Controller already registered as " + _controller_name + ". Request was from" + name)
            }
        }
        /**
         * Callback function to handle received strings.
         * It parses the received string and processes it based on the message type.
         * @param s the received string
         */
        function on_received_string(s: string) {
            let kv = parse_received_message(s)
            if (!(kv[MESSAGE_KEYS.K_FROM] && kv[MESSAGE_KEYS.K_TO] && kv[MESSAGE_KEYS.K_TIMESTAMP] && kv[MESSAGE_KEYS.K_TYPE])) {
                emitLog(LogLevel.Debug, "Incomplete message received" + s)

            }
            else
                if (kv[MESSAGE_KEYS.K_TO] !== control.deviceName() && kv[MESSAGE_KEYS.K_TO] !== MESSAGE_KEYS.V_TO_ALL) {
                    emitLog(LogLevel.Debug, `Message not for me: ${kv[MESSAGE_KEYS.K_TO]} != ${control.deviceName()}`);

                }
                else
                    if (kv[MESSAGE_KEYS.K_TYPE] == MESSAGE_KEYS.V_TYPE_INTERCOM) {
                        let received_command = kv[MESSAGE_KEYS.K_PAYLOAD]
                        switch (received_command) {
                            case MESSAGE_KEYS.V_INTERCOM_START:
                                _on_start_callback_function()
                                break
                            case MESSAGE_KEYS.V_INTERCOM_STOP:
                                _on_stop_callback_function()
                                break
                            case MESSAGE_KEYS.V_INTERCOM_DANGER:
                                _on_danger_callback_function()
                                break
                            case MESSAGE_KEYS.V_INTERCOM_GETCONTROL:
                                register_controller_name(kv[MESSAGE_KEYS.K_FROM])
                                break
                        }

                    }
        }

        /**
         * Register message handlers based on the communication channel.
         * This function sets up the appropriate message receiving mechanism
         * depending on whether the communication channel is Radio or Serial.
         */
        function register_message_handlers() {
            switch (_conf_communication_channel) {
                case CommunicationChannel.Radio:
                    _message_transmitter = radio.sendString
                    radio.setGroup(_conf_radio_group)
                    radio.onReceivedString(on_received_string)
                    break
                case CommunicationChannel.Serial:
                    _message_transmitter = serial.writeLine
                    serial.onDataReceived("\n", function () {
                        let received = serial.readUntil("\n")
                        // Process the received string
                        on_received_string(received)
                    })
                    break

                default:
                    basic.showString("WARNING: NO IN/OUT CHANNEL")

            }
        }


        /**
         * Get a key-value pair heartbeat message
         * @returns 
         */
        function get_kv_heartbeat(): { [key: string]: string } {
            let result: { [key: string]: string } = getEmitterSignature()
            result[MESSAGE_KEYS.K_TYPE] = MESSAGE_KEYS.V_TYPE_HEARTBEAT
            return result
        }
        /**
         * Get a key-value pair status message
         * @returns 
         */
        function get_kv_status(): { [key: string]: string } {
            let result: { [key: string]: string } = getEmitterSignature()
            result[MESSAGE_KEYS.K_TYPE] = MESSAGE_KEYS.V_TYPE_STATUS
            result[MESSAGE_KEYS.K_STATUS_COUNT] = get_collect_count().toString()
            result[MESSAGE_KEYS.K_STATUS_STATE] = get_bot_status_label()
            return result
        }
        /**
         * get a key-value pair log message
         * @param log_level 
         * @param log_message 
         * @returns 
         */
        function get_kv_log(log_level: LogLevel, log_message: string): { [key: string]: string } {
            let result: { [key: string]: string } = getEmitterSignature()
            result[MESSAGE_KEYS.K_TYPE] = MESSAGE_KEYS.V_TYPE_LOG
            result[MESSAGE_KEYS.K_LOG_LEVEL] = log_level.toString()
            result[MESSAGE_KEYS.K_PAYLOAD] = log_message
            return result
        }
        function get_kv_acknowledge(command: string): { [key: string]: string } {
            let result: { [key: string]: string } = getEmitterSignature()
            result[MESSAGE_KEYS.K_TYPE] = MESSAGE_KEYS.V_TYPE_ACKNOWLEDGE
            result[MESSAGE_KEYS.K_PAYLOAD] = command
            return result
        }

        /**
         * Get an intercom message with a specified payload
         * @param payload 
         * @returns 
         */
        function get_kv_intercom(payload: string): { [key: string]: string } {
            let result: { [key: string]: string } = getEmitterSignature()
            result[MESSAGE_KEYS.K_TYPE] = MESSAGE_KEYS.V_TYPE_INTERCOM
            result[MESSAGE_KEYS.K_PAYLOAD] = payload
            return result
        }


        //% help=contest/on-received-start
        //% blockId=contest_on_start_received block="on Start" 
        //% group="events"
        export function onMessageStartReceived(callback: () => void) {
            _on_start_callback_function = callback;
            emitAcknowledgement(MESSAGE_KEYS.V_INTERCOM_START)
        }

        //% help=contest/on-stop-received
        //% blockId=contest_on_stop_received block="on Stop" 
        //% group="events"
        export function onMessageStopReceived(callback: () => void) {
            _on_stop_callback_function = callback;
            emitAcknowledgement(MESSAGE_KEYS.V_INTERCOM_STOP)
        }

        //% help=contest/on-danger_received
        //% blockId=contest_on_danger_received block="on Danger"
        //% group="events"
        export function onMessageDangerReceived(callback: () => void) {
            _on_danger_callback_function = callback;
            emitAcknowledgement(MESSAGE_KEYS.V_INTERCOM_DANGER)
        }

        /**
         * internal function: emitter kv pairs
         */
        function getEmitterSignature(): { [key: string]: string } {
            let result: { [key: string]: string } = {}
            result[MESSAGE_KEYS.K_FROM] = control.deviceName()
            result[MESSAGE_KEYS.K_TIMESTAMP] = control.millis().toString()
            return result
        }

        /**
         * Emit a message using the configured communication channel.
         * @param msg the message to emit
         */
        function emitMessage(msg: string) {
            if (!_is_initialized) {
                initCommunicationChannel(DEFAULT_COMMUNICATION_CHANNEL); // Default to Serial if not initialized
                _is_initialized = true;
            }
            if (_is_echo_to_console) {
                console.log("Emitting message: " + msg);
            }
            _message_transmitter(msg)
        }


        //% blockId=contest_emit_log block="Emit log level $level with message $message"
        //% level.defl=LogLevel.Info
        //% level.fieldEditor="gridpicker"
        //% level.fieldOptions.decompileLiterals=true
        //% group="comm"
        //% weight=100
        export function emitLog(level: LogLevel, message: string) {
            emitMessage(build_message_from_kv(get_kv_log(level, message)))
        }

        //% blockId=contest_emit_acknowledgement block="Emit acknowledgement of $command"
        //% group="comm"
        //% advanced=true
        export function emitAcknowledgement(command: string) {
            emitMessage(build_message_from_kv(get_kv_acknowledge(command)))
        }

        //% blockId=contest_send_status block="Emit bot status"
        //% group="comm"
        //% advanced=true
        export function emitStatus() {
            emitMessage(build_message_from_kv(get_kv_status()))
        }

        //% blockId=contest_emit_heat_beat  block="Emit heart beat"
        //% group="comm"
        export function emitHeartBeat() {
            emitMessage(build_message_from_kv(get_kv_heartbeat()))
        }

        //% blockId=contest_set_bot_status block="Set bot status to $bot_status" blockGap=16
        //% bot_status.defl=BotStatus.Idle
        //% bot_status.fieldEditor="gridpicker"
        //% bot_status.fieldOptions.decompileLiterals=true
        //% weight=20
        export function setBotStatus(bot_status: BotStatus) {
            _bot_status = bot_status;
            emitStatus(); // Emit the status after setting it
        }





    }
