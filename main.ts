input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    UTBRadio.incrementRadioGroup()
    basic.showString("" + (UTBRadio.getRadioGroup()))
})
function handleControllerMsg (receivedString: string) {
    switch (receivedString) {
        case UTBControllerCode.COMMAND_START: UTBControllerCode.sendActionStart()
        case UTBControllerCode.COMMAND_STOP: UTBControllerCode.sendActionStop()
        case UTBControllerCode.COMMAND_DANGER: UTBControllerCode.sendActionDanger()
        case UTBControllerCode.COMMAND_OBEYME: UTBControllerCode.sendObeyMe()
        default: debugmsg("!!! Unhandled message received : " + receivedString)
    }
}
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Happy)
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerUp), music.PlaybackMode.InBackground)
    UTBController.sendActionStart()
})
function debugmsg (msg: string) {
    console.log("" + control.deviceName() + "." + ("" + control.deviceSerialNumber()) + ":" + ("" + control.micros() / 1000) + ":" + msg)
}
input.onButtonPressed(Button.AB, function () {
    basic.showIcon(IconNames.Asleep)
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerDown), music.PlaybackMode.InBackground)
    UTBController.sendActionStop()
})
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.Surprised)
    for (let index = 0; index < 4; index++) {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.BaDing), music.PlaybackMode.UntilDone)
    }
    UTBController.sendActionDanger()
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showLeds(`
        . # . # .
        . . . . .
        . # # # .
        # . . . #
        . # # # .
        `)
    UTBController.sendObeyMe()
})
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    handleControllerMsg(serial.readUntil(serial.delimiters(Delimiters.NewLine)))
})
UTBRadio.init(0)
basic.showString("" + (UTBRadio.getRadioGroup()))
