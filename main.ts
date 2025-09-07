UTBBot.onMessageStopReceived(function () {
    basic.showIcon(IconNames.No)
})
UTBBot.onMessageDangerReceived(function () {
    basic.showIcon(IconNames.Skull)
})
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Heart)
    UTBBot.initAsBot(UTBBotCode.TeamName.RequiemForABot)
    UTBBot.emitHeartBeat()
})
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.House)
    UTBController.initAsController()
    UTBController.sendActionStart()
})
UTBBot.onMessageStartReceived(function () {
    basic.showIcon(IconNames.Yes)
})
basic.showIcon(IconNames.House)
