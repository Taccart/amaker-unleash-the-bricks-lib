declare namespace control {
    function waitMicros(micros: number): void;
    function millis(): number;
    function deviceName(): string;
    function deviceSerialNumber(): number;
}

declare namespace radio {
    function sendString(message: string): void;
    function setGroup(i:number): void;
    function onReceivedString(f : (v:string) => void): void;

}
declare namespace basic{ 
    function showNumber(i:number): void;
}   