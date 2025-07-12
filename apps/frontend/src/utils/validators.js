// apps/frontend/src/utils/validators.js

export function isEmail(value) {
  return /\S+@\S+\.\S+/.test(value);
}

export function isNonEmpty(value) {
  return value && value.trim().length > 0;
}

export function isStrongPassword(value) {
  return value.length >= 6;
}
