
/**
 * Communication functions for the Unleash The Geek Bot tournament
 */
//% weight=5 color=#0fbc11 icon="\uf110"
namespace UnleashTheGeekBot {
     /**
             * Shows a rainbow pattern on all LEDs.
             * @param startHue the start hue value for the rainbow, eg: 1
             * @param endHue the end hue value for the rainbow, eg: 360
             */
            //% blockId="neopixel_set_strip_rainbow" block="%strip|show rainbow from %startHue|to %endHue"
            //% strip.defl=strip
            //% weight=85 blockGap=8
            //% parts="neopixel"
            showRainbow(startHue: number = 1, endHue: number = 360) {
                //do nothing
                }
}
