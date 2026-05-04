// Security validation functions for contact form

const DANGEROUS_PATTERNS = /<script|<\/script|<iframe|drop\s+table|select\s+\*|union\s+select|delete\s+from|insert\s+into|update\s+|create\s+table|alter\s+table|truncate|--|\*\/|\/\*|exec\s+|execute\s+|;\s*drop|onerror=|onload=|javascript:/gi;

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function sanitizeInput(text: string): string {
  if (!text) return "";

  // Trim whitespace
  let sanitized = text.trim();

  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, "");

  // Remove control characters
  sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, "");

  return sanitized;
}

export function containsDangerousPatterns(text: string): boolean {
  return DANGEROUS_PATTERNS.test(text);
}

export function validateName(name: string): ValidationResult {
  const sanitized = sanitizeInput(name);

  if (!sanitized || sanitized.length < 2) {
    return { valid: false, error: "nameError" };
  }

  if (sanitized.length > 100) {
    return { valid: false, error: "nameError" };
  }

  if (containsDangerousPatterns(sanitized)) {
    return { valid: false, error: "suspiciousContent" };
  }

  return { valid: true };
}

export function validateEmail(email: string): ValidationResult {
  const sanitized = sanitizeInput(email);

  // RFC5322 simplified pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(sanitized)) {
    return { valid: false, error: "emailError" };
  }

  if (sanitized.length > 254) {
    return { valid: false, error: "emailError" };
  }

  if (containsDangerousPatterns(sanitized)) {
    return { valid: false, error: "suspiciousContent" };
  }

  return { valid: true };
}

export function validateMessage(message: string): ValidationResult {
  const sanitized = sanitizeInput(message);

  if (!sanitized || sanitized.length < 10) {
    return { valid: false, error: "messageError" };
  }

  if (sanitized.length > 1000) {
    return { valid: false, error: "messageError" };
  }

  if (containsDangerousPatterns(sanitized)) {
    return { valid: false, error: "suspiciousContent" };
  }

  return { valid: true };
}

export function escapeForTelegram(text: string): string {
  const sanitized = sanitizeInput(text);

  return sanitized
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
