import { z } from 'zod';

try {
  const schema = z.record(z.string(), z.unknown());
  console.log('Record schema created successfully');
} catch (err) {
  console.error('Record schema failed:', err);
}
