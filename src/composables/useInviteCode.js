// src/composables/useInviteCode.js

/**
 * 邀请码存储工具 (使用 sessionStorage)
 */
export const useInviteCode = () => {
  const INVITE_KEY = 'inviteCode';

  const setInviteCode = (code) => {
    if (code) {
      sessionStorage.setItem(INVITE_KEY, code);
    }
  };

  const getInviteCode = () => {
    return sessionStorage.getItem(INVITE_KEY) || '';
  };

  const clearInviteCode = () => {
    sessionStorage.removeItem(INVITE_KEY);
  };

  return {
    setInviteCode,
    getInviteCode,
    clearInviteCode,
  };
};
