import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "c0fbe3dfdd7c45c8bedac54be5f4fc90";
const token =
  "006c0fbe3dfdd7c45c8bedac54be5f4fc90IADF37IK4xbxaQP3Basf2cDpSii+heb52WR7r/I5Nt2y7mTNKL8AAAAAEADEZWnpq/azYAEAAQCr9rNg";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
