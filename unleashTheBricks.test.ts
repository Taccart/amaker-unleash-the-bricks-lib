// tests go here; this will not be compiled when this package is used as a library
import * as utb from './unleashTheBricks'

// Mock the emitAcknowledgement function to check if it's called
jest.mock('./unleashTheBricks', () => {
    const originalModule = jest.requireActual('./unleashTheBricks');
    return {
        __esModule: true,
        ...originalModule,
        UnleashTheBricks: {
            ...originalModule.UnleashTheBricks,
            emitAcknowledgement: jest.fn()
        }
    };
});

describe("onMessage*Received tests", () => {
    let emitAcknowledgementMock: jest.SpyInstance;

    beforeEach(() => {
        emitAcknowledgementMock = jest.spyOn(utb.UnleashTheBricks, 'emitAcknowledgement');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("onMessageStartReceived calls emitAcknowledgement with correct command", () => {
        const callback = jest.fn();
        utb.UnleashTheBricks.onMessageStartReceived(callback);
        expect(emitAcknowledgementMock).toHaveBeenCalledWith(utb.MESSAGE_KEYS.V_INTERCOM_START);
    });

    test("onMessageStopReceived calls emitAcknowledgement with correct command", () => {
        const callback = jest.fn();
        utb.UnleashTheBricks.onMessageStopReceived(callback);
        expect(emitAcknowledgementMock).toHaveBeenCalledWith(utb.MESSAGE_KEYS.V_INTERCOM_STOP);
    });

    test("onMessageDangerReceived calls emitAcknowledgement with correct command", () => {
        const callback = jest.fn();
        utb.UnleashTheBricks.onMessageDangerReceived(callback);
        expect(emitAcknowledgementMock).toHaveBeenCalledWith(utb.MESSAGE_KEYS.V_INTERCOM_DANGER);
    });
});

// Test cases for UnleashTheBricks

// Test case 1: Check if the bot status is initially Idle
test("initial bot status is idle", () => {
    expect(utb.UnleashTheBricks.get_bot_status()).toBe(utb.BotStatus.Idle);
});

// Test case 2: Check if setting the bot status changes the status correctly
test("set bot status changes the status", () => {
    utb.UnleashTheBricks.setBotStatus(utb.BotStatus.Searching);
    expect(utb.UnleashTheBricks.get_bot_status()).toBe(utb.BotStatus.Searching);

    utb.UnleashTheBricks.setBotStatus(utb.BotStatus.Capturing);
    expect(utb.UnleashTheBricks.get_bot_status()).toBe(utb.BotStatus.Capturing);
});

// Test case 3: Check if the collect count is initially 0
test("initial collect count is 0", () => {
    // Need a way to access or reset the internal collect count if it's not exposed
    // Assuming there's no direct way to reset, we can only test the initial state
    // If there's a way to reset, add it here
    utb.resetCollectCount(); // Hypothetical reset function
    expect(utb.get_collect_count()).toBe(0); // Requires access to get_collect_count
});

// Test case 4: Check if incrementing the collect count works correctly
test("increment collect count works correctly", () => {
    // Need a way to access or reset the internal collect count if it's not exposed
    // Assuming there's no direct way to reset, we can only test the increment
    // If there's a way to reset, add it here
    utb.resetCollectCount(); // Hypothetical reset function
    utb.increment_collect_count(5); // Requires access to increment_collect_count
    expect(utb.get_collect_count()).toBe(5); // Requires access to get_collect_count
});

// Test case 5: Check if the bot status label matches the bot status
test("bot status label matches bot status", () => {
    utb.UnleashTheBricks.setBotStatus(utb.BotStatus.Searching);
    expect(utb.UnleashTheBricks.get_bot_status_label()).toBe("Searching");

    utb.UnleashTheBricks.setBotStatus(utb.BotStatus.Capturing);
    expect(utb.UnleashTheBricks.get_bot_status_label()).toBe("Capturing");

    utb.UnleashTheBricks.setBotStatus(utb.BotStatus.BringingBack);
    expect(utb.UnleashTheBricks.get_bot_status_label()).toBe("Bringing back");

    utb.UnleashTheBricks.setBotStatus(utb.BotStatus.GoingToShelter);
    expect(utb.UnleashTheBricks.get_bot_status_label()).toBe("Going to shelter");

    utb.UnleashTheBricks.setBotStatus(utb.BotStatus.Stealing);
    expect(utb.UnleashTheBricks.get_bot_status_label()).toBe("Stealing");

    utb.UnleashTheBricks.setBotStatus(utb.BotStatus.Defending);
    expect(utb.UnleashTheBricks.get_bot_status_label()).toBe("Defending");

    utb.UnleashTheBricks.setBotStatus(utb.BotStatus.Idle);
    expect(utb.UnleashTheBricks.get_bot_status_label()).toBe("Idle");
});

// Test case 6: Check if incrementing the radio group works correctly
test("increment radio group works correctly", () => {
    // Assuming the initial radio group is 0 or can be reset
    // If there's a way to reset, add it here
    // utb.resetRadioGroup(); // Hypothetical reset function
    let initialRadioGroup = 0; // Assuming initial value is 0

    let newRadioGroup = utb.incrementRadioGroup();
    expect(newRadioGroup).toBeGreaterThan(initialRadioGroup);
    expect(newRadioGroup).toBeLessThanOrEqual(RADIO_GROUP.MAX); // Assuming RADIO_GROUP.MAX is defined
});

// Test case 7: Check if decrementing the radio group works correctly
test("decrement radio group works correctly", () => {
    // Assuming the initial radio group is 0 or can be reset
    // If there's a way to reset, add it here
    // utb.resetRadioGroup(); // Hypothetical reset function
    let initialRadioGroup = 0; // Assuming initial value is 0

    let newRadioGroup = utb.decrementRadioGroup();
    expect(newRadioGroup).toBeLessThan(initialRadioGroup);
    expect(newRadioGroup).toBeGreaterThanOrEqual(0);
});

// Test case 8: Check if build_message_from_kv builds a correct message string
test("build_message_from_kv builds a correct message string", () => {
    const kvPairs = {
        "key1": "value1",
        "key2": "value2",
        "key3": "value3"
    };
    const expectedMessage = "key1=value1\tkey2=value2\tkey3=value3";
    const actualMessage = utb.UnleashTheBricks.build_message_from_kv(kvPairs);
    expect(actualMessage).toBe(expectedMessage);
});

// Test case 9: Check if build_message_from_kv handles empty object
test("build_message_from_kv handles empty object", () => {
    const kvPairs = {};
    const expectedMessage = "";
    const actualMessage = utb.UnleashTheBricks.build_message_from_kv(kvPairs);
    expect(actualMessage).toBe(expectedMessage);
});

// Test case 10: Check if parse_received_message parses a correct message string
test("parse_received_message parses a correct message string", () => {
    const message = "key1=value1\tkey2=value2\tkey3=value3";
    const expectedKvPairs = {
        "key1": "value1",
        "key2": "value2",
        "key3": "value3"
    };
    const actualKvPairs = utb.UnleashTheBricks.parse_received_message(message);
    expect(actualKvPairs).toEqual(expectedKvPairs);
});

// Test case 11: Check if parse_received_message handles empty message string
test("parse_received_message handles empty message string", () => {
    const message = "";
    const expectedKvPairs = {};
    const actualKvPairs = utb.UnleashTheBricks.parse_received_message(message);
    expect(actualKvPairs).toEqual(expectedKvPairs);
});

// Test case 12: Check if parse_received_message handles message with missing value
test("parse_received_message handles message with missing value", () => {
    const message = "key1=value1\tkey2=\tkey3=value3";
    const expectedKvPairs = {
        "key1": "value1",
        "key3": "value3"
    };
    const actualKvPairs = utb.UnleashTheBricks.parse_received_message(message);
    expect(actualKvPairs).toEqual(expectedKvPairs);
});

// Test case 13: Check if parse_received_message handles message with missing key
test("parse_received_message handles message with missing key", () => {
    const message = "key1=value1\t=value2\tkey3=value3";
    const expectedKvPairs = {
        "key1": "value1",
        "key3": "value3"
    };
    const actualKvPairs = utb.UnleashTheBricks.parse_received_message(message);
    expect(actualKvPairs).toEqual(expectedKvPairs);
});

// Test case 14: Check if parse_received_message handles message with extra tabs
test("parse_received_message handles message with extra tabs", () => {
    const message = "key1=value1\tkey2=value2\t\tkey3=value3";
    const expectedKvPairs = {
        "key1": "value1",
        "key2": "value2",
        "key3": "value3"
    };
    const actualKvPairs = utb.UnleashTheBricks.parse_received_message(message);
    expect(actualKvPairs).toEqual(expectedKvPairs);
});

// Test case 15: Check if parse_received_message trims keys and values
test("parse_received_message trims keys and values", () => {
    const message = "  key1  =  value1  \t  key2  =  value2  ";
    const expectedKvPairs = {
        "key1": "value1",
        "key2": "value2"
    };
    const actualKvPairs = utb.UnleashTheBricks.parse_received_message(message);
    expect(actualKvPairs).toEqual(expectedKvPairs);
});


