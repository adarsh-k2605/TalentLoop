/**
 * Bridge for passing Clerk's getToken to the axios instance.
 * Required for cross-origin API requests (frontend and backend on different domains).
 */
let getTokenFn = null;

export function setAuthTokenGetter(fn) {
  getTokenFn = fn;
}

export function getAuthTokenGetter() {
  return getTokenFn;
}
