import { TEMPLES } from '../utils/constants';
import { sleep } from '../utils/helpers';

// Replace these with real API calls (e.g. GET /api/temples) when the
// backend is ready. Keep the same async signatures and return shapes.

export async function getTemples({ search = '' } = {}) {
  await sleep(350);
  const query = search.trim().toLowerCase();
  if (!query) return TEMPLES;
  return TEMPLES.filter(
    (t) =>
      t.name.toLowerCase().includes(query) ||
      t.city.toLowerCase().includes(query) ||
      t.deity.toLowerCase().includes(query)
  );
}

export async function getTempleById(id) {
  await sleep(300);
  const temple = TEMPLES.find((t) => t.id === id);
  if (!temple) throw new Error('Temple not found.');
  return temple;
}
