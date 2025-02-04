import { describe, it, expect } from "vitest";
import {
  ethWalletSchema,
  twitterHandleSchema,
  agentSchema,
  developerSchema,
  registrationSchema,
} from "./schemas";

describe("ethWalletSchema", () => {
  it("validates valid Ethereum wallet addresses", () => {
    const validAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
    expect(ethWalletSchema.parse(validAddress)).toBe(validAddress);
  });

  it("rejects addresses with invalid length", () => {
    const tooShort = "0x123";
    const tooLong = "0x1234567890abcdef1234567890abcdef12345678901";
    expect(() => ethWalletSchema.parse(tooShort)).toThrow();
    expect(() => ethWalletSchema.parse(tooLong)).toThrow();
  });

  it("rejects addresses with invalid characters", () => {
    const invalidChars = "0x1234567890abcdef1234567890abcdef1234567gh";
    expect(() => ethWalletSchema.parse(invalidChars)).toThrow();
  });

  it("rejects non-string inputs", () => {
    const number = 123;
    expect(() => ethWalletSchema.parse(number)).toThrow();
  });
});

describe("twitterHandleSchema", () => {
  it("validates valid Twitter handles", () => {
    const validHandle = "@zod";
    expect(twitterHandleSchema.parse(validHandle)).toBe(validHandle);
  });

  it("rejects handles that are too short", () => {
    const tooShort = "@a";
    expect(() => twitterHandleSchema.parse(tooShort)).toThrow();
  });

  it("rejects handles that are too long", () => {
    const tooLong = "@".padEnd(20, "a");
    console.log(tooLong.length);
    expect(() => twitterHandleSchema.parse(tooLong)).toThrow();
  });

  it("rejects handles without @ symbol", () => {
    const noSymbol = "zod";
    expect(() => twitterHandleSchema.parse(noSymbol)).toThrow();
  });

  it("accepts optional handles", () => {
    const undefinedHandle = undefined;
    expect(() => twitterHandleSchema.parse(undefinedHandle)).not.toThrow();
  });
});

describe("agentSchema", () => {
  it("validates complete agent objects", () => {
    const agent = {
      name: "Test Agent",
      description: "Test Description",
      primaryFunction: "Test Function",
      tools: ["Tool1", "Tool2"],
      ethWallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
      twitterHandle: "@test",
    };
    expect(() => agentSchema.parse(agent)).not.toThrow();
  });

  it("rejects agents without a name", () => {
    const agent = {
      name: "",
      primaryFunction: "Test",
      ethWallet: "0x1234567890abcdef1234567890abcdef1234567890",
    };
    expect(() => agentSchema.parse(agent)).toThrow();
  });

  it("rejects agents without primary function", () => {
    const agent = {
      name: "Test",
      primaryFunction: "",
      ethWallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    };
    expect(() => agentSchema.parse(agent)).toThrow();
  });

  it("accepts agents with optional description", () => {
    const agent = {
      name: "Test",
      primaryFunction: "Test",
      ethWallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    };
    expect(() => agentSchema.parse(agent)).not.toThrow();
  });

  it("accepts agents with empty tools array", () => {
    const agent = {
      name: "Test",
      primaryFunction: "Test",
      tools: [],
      ethWallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    };
    expect(() => agentSchema.parse(agent)).not.toThrow();
  });
});

describe("developerSchema", () => {
  it("validates complete developer objects", () => {
    const developer = {
      name: "Test Developer",
      twitterHandle: "@test",
      telegramHandle: "test_telegram",
    };
    expect(() => developerSchema.parse(developer)).not.toThrow();
  });

  it("rejects developers without a name", () => {
    const developer = {
      name: "",
      twitterHandle: "@test",
      telegramHandle: "test_telegram",
    };
    expect(() => developerSchema.parse(developer)).toThrow();
  });

  it("accepts developers without twitter handle", () => {
    const developer = {
      name: "Test",
      telegramHandle: "test_telegram",
    };
    expect(() => developerSchema.parse(developer)).not.toThrow();
  });

  it("accepts developers without telegram handle", () => {
    const developer = {
      name: "Test",
      twitterHandle: "@test",
    };
    expect(() => developerSchema.parse(developer)).not.toThrow();
  });

  it("accepts developers with all optional fields missing", () => {
    const developer = {
      name: "Test",
    };
    expect(() => developerSchema.parse(developer)).not.toThrow();
  });
});

describe("registrationSchema", () => {
  it("validates complete registration objects", () => {
    const registration = {
      developer: {
        name: "Test Developer",
        twitterHandle: "@test",
        telegramHandle: "test_telegram",
      },
      agent: {
        name: "Test Agent",
        description: "Test Description",
        primaryFunction: "Test Function",
        tools: ["Tool1", "Tool2"],
        ethWallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        twitterHandle: "@test_agent",
      },
    };
    expect(() => registrationSchema.parse(registration)).not.toThrow();
  });

  it("rejects registration with invalid developer", () => {
    const registration = {
      developer: {
        name: "",
      },
      agent: {
        name: "Test Agent",
        primaryFunction: "Test",
        ethWallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
      },
    };
    expect(() => registrationSchema.parse(registration)).toThrow();
  });

  it("rejects registration with invalid agent", () => {
    const registration = {
      developer: {
        name: "Test Developer",
      },
      agent: {
        name: "",
        primaryFunction: "Test",
        ethWallet: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
      },
    };
    expect(() => registrationSchema.parse(registration)).toThrow();
  });
});
