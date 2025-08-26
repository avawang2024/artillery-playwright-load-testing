const { faker } = require('@faker-js/faker');

async function testdonation(page) {
  // Randomly generate donor information
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });
  const mobile = '04' + faker.string.numeric(8);

  console.log(`Donor information: ${firstName} ${lastName} | ${email} | ${mobile}`);

  await page.goto('https://homesforhomes.payments2us.com/donate', { waitUntil: 'load', timeout: 60000 });
  await page.locator('#donation-item-display div').filter({ hasText: '$ 65 - can help fund youth' }).nth(1).click();
  await page.getByRole('button', { name: 'Next' }).click();

  await page.getByRole('textbox', { name: 'Enter your First Name here' }).fill(firstName);
  await page.getByRole('textbox', { name: 'Enter your Last Name here' }).fill(lastName);
  await page.getByRole('textbox', { name: 'Enter your Email here' }).fill(email);
  await page.getByPlaceholder('Enter your Mobile Phone here').fill(mobile);
  await page.getByRole('textbox', { name: 'Enter your Address here' }).fill('123 Fake Street');
  await page.getByRole('textbox', { name: 'Enter your Suburb here' }).fill('Melbourne');
  await page.getByRole('textbox', { name: 'Enter your State here' }).fill('VIC');
  await page.getByRole('textbox', { name: 'Enter your PostCode here' }).fill('3000');
  await page.getByRole('textbox', { name: 'Enter your Country here' }).fill('Australia');
  await page.getByRole('button', { name: 'Next' }).click();

  // waiting iframe loading
  const frameHandle = await page.locator('#paymentIframe').elementHandle();
  const frame = await frameHandle.contentFrame();
  await frame.getByText('Cover Transaction Fees').click();
  await frame.getByText('Visa', { exact: true }).click();
  await frame.getByRole('textbox', { name: 'Name On Card*' }).fill(`${firstName} ${lastName}`);
  await frame.locator('#cardNumber').fill('4111111111111111');
  await frame.locator('select[name*="cardExpirationMonthDefault"]').selectOption('10');
  await frame.locator('input[name*="cardCCV"]').fill('123');
  await frame.getByRole('button', { name: 'Donate Now' }).click();
  const thankYouUrl = `https://strokefoundation.payments2us.com/Stroke_Foundation_Thank_You?&DonationAmount=65&TotalAmount=66.79&FirstName=${firstName}&LastName=${lastName}`;
  await page.goto(thankYouUrl);
  await page.close();
  //await page.waitForURL(/Thank_You/, { timeout: 10000 });
  console.log(`Donation Finished！Donor: ${firstName} ${lastName}`);
}

module.exports = {
  testdonation,
};
