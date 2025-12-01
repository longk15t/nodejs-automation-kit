import { test as apiTest } from './api-fixtures';
import { test as uiTest } from './ui-fixtures';
import {
  mergeTests
} from '@playwright/test';

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
  expect
} from '@playwright/test';
