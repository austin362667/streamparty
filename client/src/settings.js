import { createClient, createMicrophoneAudioTrack } from "agora-rtc-react";

const appId = "c0fbe3dfdd7c45c8bedac54be5f4fc90";
const token =
  "006c0fbe3dfdd7c45c8bedac54be5f4fc90IACfQYlrnYJps/oPNhQiPqRtOHVAiQ6z5ni/mxeersFBRWTNKL8AAAAAEAD7cHweNtW4YAEAAQA21bhg";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophone = createMicrophoneAudioTrack();
export const channelName = "main";
