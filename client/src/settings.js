import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "c0fbe3dfdd7c45c8bedac54be5f4fc90";
const token =
  "006c0fbe3dfdd7c45c8bedac54be5f4fc90IABrL52EB6PIhDIQKxh1Hv/ycTRojPp6VaLWflnqexnpwWTNKL8AAAAAEADEZWnpz+mzYAEAAQDP6bNg";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
