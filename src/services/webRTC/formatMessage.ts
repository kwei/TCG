import { ActionType } from "@/constants";

export function formatMessage(userInfo: UserInfo, action: ActionType) {
  return JSON.stringify({
    type: "ctrl",
    userInfo,
    message: action,
    timestamp: new Date().getTime(),
  });
}
