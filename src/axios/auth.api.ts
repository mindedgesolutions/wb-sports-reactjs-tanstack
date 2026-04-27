import { refreshFetch } from './refresh.fetch';
import { userManager } from './user.manager';

export async function refreshToken(org: string) {
  try {
    const response = await refreshFetch.post(`/auth/refresh/${org}`);

    const newAccessToken = response.data.token;
    const user = response.data.data;
    userManager.setUser(user);

    return newAccessToken;
  } catch (err) {
    userManager.clear();
    throw err;
  }
}
