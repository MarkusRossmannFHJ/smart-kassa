export const AuthStorage = {
  /**
   * Save access token and optional refresh token to localStorage
   */
  setTokens: (accessToken: string, refreshToken?: string) => {
    localStorage.setItem("accessToken", accessToken);
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
  },

  /**
   * Get the access token from localStorage
   */
  getAccessToken: (): string | null => {
    return localStorage.getItem("accessToken");
  },

  /**
   * Get the refresh token from localStorage
   */
  getRefreshToken: (): string | null => {
    return localStorage.getItem("refreshToken");
  },

  /**
   * Remove all tokens from localStorage (for logout)
   */
  clearTokens: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },

  /**
   * Check if user has a valid token (basic check)
   */
  hasToken: (): boolean => {
    return !!localStorage.getItem("accessToken");
  },
};
