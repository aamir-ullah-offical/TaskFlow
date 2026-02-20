/**
 * Shared mutable ref to break the circular import between AuthContext ↔ axios.
 *
 * AuthContext writes `setUser` here on mount.
 * The axios 401 interceptor reads `authRef.setUser` to clear React auth state
 * when the server rejects a request with 401 Unauthorized.
 */
export const authRef = { setUser: null };
