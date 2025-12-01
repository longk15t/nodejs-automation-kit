import { test as base } from '@playwright/test';
import { UserApi } from '../../frameworks/api-playwright/requests/user-api';

export const test = base.extend<{
  userApi: UserApi;
}>({
  userApi: async ({ request }, use) => {
    await use(new UserApi(request));
  },
});
