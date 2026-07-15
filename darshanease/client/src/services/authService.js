import { STORAGE_KEYS } from '../utils/constants';
import { sleep } from '../utils/helpers';

// NOTE: This is a mock service that persists to localStorage so the whole
// frontend can run standalone. Replace the bodies of these functions with
// real `fetch('/api/auth/...')` calls once the backend is available — the
// function signatures and return shapes are designed to stay the same.

function readUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
}

function writeUsers(users) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

export async function register({ name, email, phone, password }) {
  await sleep(500);
  const users = readUsers();
  if (users.some((u) => u.email === email)) {
    throw new Error('An account with this email already exists.');
  }
  const user = { id: crypto.randomUUID(), name, email, phone, password };
  users.push(user);
  writeUsers(users);
  const { password: _pw, ...safeUser } = user;
  return safeUser;
}

export async function login({ email, password }) {
  await sleep(500);
  const users = readUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    throw new Error('Invalid email or password.');
  }
  const { password: _pw, ...safeUser } = user;
  localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(safeUser));
  return safeUser;
}

export async function logout() {
  await sleep(150);
  localStorage.removeItem(STORAGE_KEYS.SESSION);
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SESSION) || 'null');
  } catch {
    return null;
  }
}

export async function updateProfile(userId, updates) {
  await sleep(400);
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) throw new Error('User not found.');
  users[idx] = { ...users[idx], ...updates };
  writeUsers(users);
  const { password: _pw, ...safeUser } = users[idx];
  localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(safeUser));
  return safeUser;
}
