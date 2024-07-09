import { ActionType } from "@/constants";

export function formatMessage<D>(
  userInfo: UserInfo,
  action: ActionType,
  data: D,
) {
  return JSON.stringify({
    type: "ctrl",
    userInfo,
    message: JSON.stringify({
      type: action,
      data,
    }),
    timestamp: new Date().getTime(),
  });
}
