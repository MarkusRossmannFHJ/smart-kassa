/**
 * Mock Authentication for Frontend Testing (Browser-compatible)
 * No external dependencies needed!
 */
export const MockAuth = {
  /**
   * Generate a fake JWT token (browser-compatible)
   */
  generateToken: (
    userData?: Partial<{ name: string; email: string; phoneNumber: string }>
  ) => {
    const header = {
      alg: "HS256",
      typ: "JWT"
    };

    const payload = {
      firstName: userData?.name?.split(" ")[0] || "Test User First Name",
      lastName: userData?.name?.split(" ")[1] || "Test User Last Name",
      email: userData?.email || "test@smartkasse.at",
      phoneNumber: userData?.phoneNumber || "+43 660 987654",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600, // 1 Stunde
    };

    // Base64 encode (browser-native)
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));
    const signature = 'mock-signature-' + Date.now();

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  },

  /**
   * Decode JWT token (browser-compatible)
   */
  decodeToken: (token: string) => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      // Decode payload (middle part)
      const payload = JSON.parse(atob(parts[1]));
      return payload;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  },

  /**
   * Check if token is expired
   */
  isTokenExpired: (token: string): boolean => {
    const decoded = MockAuth.decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    
    return decoded.exp < Math.floor(Date.now() / 1000);
  },

  /**
   * Mock User Daten
   */
  getMockUser: () => ({
    firstName: "Test User",
    lastName: "Test User Last Name",
    email: "test@smartkasse.at",
    phoneNumber: "+43 660 987654",
  }),
};