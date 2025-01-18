import { authentication, createDirectus, rest } from '@directus/sdk';

const directus = createDirectus('http://localhost:8055').with(rest()).with(authentication());

await directus.login('test@test.com', 'interview');

export default directus;
