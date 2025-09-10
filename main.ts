UTBBot.onMessageStopReceived(function () {
    debugmsg("onMessageStopReceived")
    UTBBot.newBotStatus(UTBBotCode.BotStatus.Idle)
    basic.showIcon(IconNames.No)
})
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    basic.showIcon(IconNames.Sad)
    debugmsg("onLogo LongPressed : sendActionStop ")
    UTBController.sendActionStop()
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        . # # # .
        . # # # .
        `)
})
UTBBot.onMessageDangerReceived(function () {
    debugmsg("onMessageDangerReceived")
    UTBBot.newBotStatus(UTBBotCode.BotStatus.ToShelter)
    basic.showIcon(IconNames.Skull)
})
input.onButtonPressed(Button.A, function () {
    debugmsg("onButton A: increment collected balls")
    basic.showIcon(IconNames.Heart)
    basic.showString("" + UTBBot.incrementCollectedBallsCount(1))
    basic.showIcon(IconNames.SmallHeart)
})
function debugmsg (msg: string) {
    console.log("" + control.deviceName() + "." + ("" + control.deviceSerialNumber()) + ":" + ("" + control.micros() / 1000) + ":" + msg)
}
input.onButtonPressed(Button.AB, function () {
    debugmsg("onButton A+B: newBotStatus Messing")
    basic.showIcon(IconNames.Square)
    UTBBot.newBotStatus(UTBBotCode.BotStatus.Messing)
    basic.showIcon(IconNames.SmallSquare)
})
input.onButtonPressed(Button.B, function () {
    debugmsg("onButton B: emitStatus")
    basic.showIcon(IconNames.Diamond)
    basic.showString("" + UTBBot.incrementCollectedBallsCount(10))
    basic.showIcon(IconNames.SmallDiamond)
})
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    debugmsg("onLogo Touched : sendActionDanger")
    UTBController.sendActionDanger()
    basic.showString(UTBBot.getDeviceId())
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showIcon(IconNames.Happy)
    debugmsg("onLogo Pressed : sendActionStart")
    UTBController.initAsController()
    UTBController.sendActionStart()
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        . # # # .
        . # # # .
        `)
})
UTBBot.onMessageStartReceived(function () {
    debugmsg("onMessageStartReceived")
    UTBBot.newBotStatus(UTBBotCode.BotStatus.Search)
    basic.showIcon(IconNames.Yes)
})
basic.showIcon(IconNames.House)
UTBBot.initAsBot(UTBBotCode.TeamName.RequiemForABot)
control.inBackground(function () {
    while (true) {
        debugmsg("background loop emitStatus")
        UTBBot.emitStatus()
        basic.pause(5000)
    }
})
