UTBBot.onMessageStopReceived(function () {
    basic.showIcon(IconNames.No)
})
UTBBot.onMessageDangerReceived(function () {
    basic.showIcon(IconNames.Skull)
})
input.onButtonPressed(Button.A, function () {
    UTBBot.emitHeartBeat()
})
input.onButtonPressed(Button.B, function () {
    UTBController.sendActionStart()
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    UTBController.sendObeyMe()
})
UTBBot.onMessageStartReceived(function () {
    basic.showIcon(IconNames.Yes)
})
basic.showIcon(IconNames.House)
UTBBot.initAsBot(UTBBotCode.TeamName.RequiemForABot)
basic.showIcon(IconNames.Happy)
console.log(control.deviceName() +" " + "Started")
console.log(control.deviceName() + " " + "listens on radio "+ (UTBRadio.getRadioGroup()))
