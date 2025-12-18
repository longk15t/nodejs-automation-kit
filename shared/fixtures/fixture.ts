import { test as apiTest } from './api.fixture';
import { test as uiTest } from './ui.fixture';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(uiTest, apiTest);
export {
  APIResponse,
  APIRequest,
  APIRequestContext,
  request,
  Page,
  Locator,
  FrameLocator,
  devices,
  expect,
} from '@playwright/test';
