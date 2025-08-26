const {test, expect}=require ('@playwright/test');
import {testdonation} from './commands/donation';

test('test', async ({ page }) => {
  await testdonation(page)
  });