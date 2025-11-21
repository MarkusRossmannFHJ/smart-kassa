export const AuthStorage = {
  /**
   * Save access token and optional refresh token to localStorage
   */
  setTokens: (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
  },

  /**
   * Get the access token from localStorage
   */
  getAccessToken: (): string | null => {
    return localStorage.getItem("accessToken");
  },

  /**
   * Remove all tokens from localStorage (for logout)
   */
  clearToken: () => {
    localStorage.removeItem("accessToken");
  },
};
