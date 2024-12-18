import { HapCharacteristic, HapService } from "./hapMocks";
import OnStarAccessory from "../src/OnStarAccessory";
import { OnStarAccessoryConfig, OnStarAccessoryConfigKey } from "../src/types";
jest.mock("../src/CommandDelegator");

const TestAccessoryConfig: OnStarAccessoryConfig = {
  [OnStarAccessoryConfigKey.DeviceId]: "742249ce-18e0-4c82-8bb2-9975367a7631",
  [OnStarAccessoryConfigKey.Vin]: "1G2ZF58B774109863",
  [OnStarAccessoryConfigKey.Username]: "foo@bar.com",
  [OnStarAccessoryConfigKey.Password]: "p@ssw0rd",
  [OnStarAccessoryConfigKey.OnStarPin]: "1234",
  [OnStarAccessoryConfigKey.OnStarTOTP]: "6dfakdsfwers",
  [OnStarAccessoryConfigKey.Name]: "Car",
};

let onStarAccessory: OnStarAccessory;

function createOnStarAccessory(config: OnStarAccessoryConfig): OnStarAccessory {
  return new OnStarAccessory(HapService, HapCharacteristic, () => {}, config);
}

describe("OnStarAccessory", () => {
  test("Invalid Config", () => {
    onStarAccessory = createOnStarAccessory({
      ...TestAccessoryConfig,
      username: "",
    });

    expect(onStarAccessory.getServices().length).toEqual(0);
  });

  test("Default Config", () => {
    onStarAccessory = createOnStarAccessory(TestAccessoryConfig);

    expect(onStarAccessory.getServices().length).toEqual(1);
  });

  test("Alert Enabled", () => {
    onStarAccessory = createOnStarAccessory({
      ...TestAccessoryConfig,
      enableAlert: true,
    });

    expect(onStarAccessory.getServices().length).toEqual(2);
  });

  test("Charger Enabled", () => {
    onStarAccessory = createOnStarAccessory({
      ...TestAccessoryConfig,
      enableCharger: true,
    });

    expect(onStarAccessory.getServices().length).toEqual(2);
  });

  test("Doors Enabled", () => {
    onStarAccessory = createOnStarAccessory({
      ...TestAccessoryConfig,
      enableDoors: true,
    });

    expect(onStarAccessory.getServices().length).toEqual(2);
  });
});
