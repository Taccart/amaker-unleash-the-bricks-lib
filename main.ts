UTBBot.onMessageStopReceived(function () {
    debugmsg("onMessageStopReceived")
    basic.showIcon(IconNames.No)
})
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    debugmsg("onLogo LongPressed : sendActionStop ")
    UTBController.initAsController()
    UTBController.sendActionStop()
})
UTBBot.onMessageDangerReceived(function () {
    debugmsg("onMessageDangerReceived")
    basic.showIcon(IconNames.Skull)
})
input.onButtonPressed(Button.A, function () {
    debugmsg("onButton A: emitHeartBeat")
    basic.showIcon(IconNames.Heart)
    UTBBot.emitHeartBeat()
    basic.showIcon(IconNames.SmallHeart)
})
function debugmsg (msg: string) {
    console.log("" + control.deviceName() + "." + control.deviceSerialNumber() +":"+control.micros()/1000+":"+msg)
}
input.onButtonPressed(Button.AB, function () {
    debugmsg("onButton A+B: newBotStatus idle")
    basic.showIcon(IconNames.Diamond)
    UTBBot.newBotStatus(UTBBotCode.BotStatus.Idle)
    basic.showIcon(IconNames.SmallDiamond)
})
input.onButtonPressed(Button.B, function () {
    debugmsg("onButton B: emitStatus")
    basic.showIcon(IconNames.Diamond)
    UTBBot.emitStatus()
    basic.showIcon(IconNames.SmallDiamond)
})
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    debugmsg("onLogo Touched : sendActionDanger")
    UTBController.initAsController()
    UTBController.sendActionDanger()
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    debugmsg("onLogo Pressed : sendActionStart")
    UTBController.initAsController()
    UTBController.sendActionStart()
})
UTBBot.onMessageStartReceived(function () {
    debugmsg("onMessageStartReceived")
    basic.showIcon(IconNames.Yes)
})
basic.showIcon(IconNames.House)
UTBBot.initAsBot(UTBBotCode.TeamName.RequiemForABot)
