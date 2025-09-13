declare namespace control {
    function waitMicros(micros: number): void;
    function millis(): number;
    function deviceName(): string;
    function deviceSerialNumber(): number;
}

declare namespace radio {
    function sendString(message: string): void;
    function setGroup(i: number): void;
    function onReceivedString(f: (v: string) => void): void;

}
declare namespace basic { 
    function showNumber(i:number): void;
}

declare namespace serial {
    let NEW_LINE: string;
    function onDataReceived(separator:number,callback: (data: string) => void): void;
    function writeString(s: string): void;
    function readLine(): string;
    function readUntil(delimiter: number): string;
}