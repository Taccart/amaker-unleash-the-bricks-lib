def on_message_stop_received():
    debugmsg("onMessageStopReceived")
    UTBBot.new_bot_status(UTBBotCode.BotStatus.IDLE)
    basic.show_icon(IconNames.NO)
UTBBot.on_message_stop_received(on_message_stop_received)

def on_logo_long_pressed():
    basic.show_icon(IconNames.SAD)
    debugmsg("onLogo LongPressed : sendActionStop ")
    UTBController.send_action_stop()
    basic.show_leds("""
        . . . . .
        . # . # .
        . . . . .
        . # # # .
        . # # # .
        """)
input.on_logo_event(TouchButtonEvent.LONG_PRESSED, on_logo_long_pressed)

def on_message_danger_received():
    debugmsg("onMessageDangerReceived")
    UTBBot.new_bot_status(UTBBotCode.BotStatus.TO_SHELTER)
    basic.show_icon(IconNames.SKULL)
UTBBot.on_message_danger_received(on_message_danger_received)

def on_button_pressed_a():
    debugmsg("onButton A: increment collected balls")
    basic.show_icon(IconNames.HEART)
    basic.show_string("" + str(UTBBot.increment_collected_balls_count(1)))
    basic.show_icon(IconNames.SMALL_HEART)
input.on_button_pressed(Button.A, on_button_pressed_a)

def debugmsg(msg: str):
    print("" + control.device_name() + "." + ("" + str(control.device_serial_number())) + ":" + ("" + str(control.micros() / 1000)) + ":" + msg)

def on_button_pressed_ab():
    debugmsg("onButton A+B: newBotStatus Messing")
    basic.show_icon(IconNames.SQUARE)
    UTBBot.new_bot_status(UTBBotCode.BotStatus.MESSING)
    basic.show_icon(IconNames.SMALL_SQUARE)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    debugmsg("onButton B: emitStatus")
    basic.show_icon(IconNames.DIAMOND)
    basic.show_string("" + str(UTBBot.increment_collected_balls_count(10)))
    basic.show_icon(IconNames.SMALL_DIAMOND)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_logo_touched():
    debugmsg("onLogo Touched : sendActionDanger")
    UTBController.send_action_danger()
    basic.show_string(UTBBot.get_device_id())
input.on_logo_event(TouchButtonEvent.TOUCHED, on_logo_touched)

def on_logo_pressed():
    basic.show_icon(IconNames.HAPPY)
    debugmsg("onLogo Pressed : sendActionStart")
    UTBController.init_as_controller()
    UTBController.send_action_start()
    basic.show_leds("""
        . . . . .
        . # . # .
        . . . . .
        . # # # .
        . # # # .
        """)
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

def on_message_start_received():
    debugmsg("onMessageStartReceived")
    UTBBot.new_bot_status(UTBBotCode.BotStatus.SEARCH)
    basic.show_icon(IconNames.YES)
UTBBot.on_message_start_received(on_message_start_received)

basic.show_icon(IconNames.HOUSE)
UTBBot.init_as_bot(UTBBotCode.TeamName.REQUIEM_FOR_ABOT)

def on_in_background():
    while True:
        debugmsg("background loop emitStatus")
        UTBBot.emit_status()
        basic.pause(5000)
control.in_background(on_in_background)
