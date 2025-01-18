import { authentication, createDirectus, rest } from '@directus/sdk';

// the actual URL is there in case you don't want to bother making a .env file, in a real scenario it wouldn't be there
const directus = createDirectus(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8055')
  .with(rest())
  .with(authentication());

await directus.login('test@test.com', 'interview');

export default directus;
