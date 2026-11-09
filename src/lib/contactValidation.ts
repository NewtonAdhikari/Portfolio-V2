/**
 * Shared contact-form validation & sanitization.
 *
 * Imported by BOTH the client (`src/lib/contact.ts`) and the server route
 * (`src/app/api/contact/route.ts`) — so browser-side and server-side rules
 * can never drift apart. Keep this file free of "use client"/"use server"
 * directives and of any browser or Node-specific imports.
 */

export type InquiryCategory =
  | "Research Collaboration"
  | "Project Collaboration"
  | "Internship Opportunities"
  | "Job Opportunities"
  | "Academic Discussion"
  | "General Inquiry";

export const INQUIRY_CATEGORIES: InquiryCategory[] = [
  "Research Collaboration",
  "Project Collaboration",
  "Internship Opportunities",
  "Job Opportunities",
  "Academic Discussion",
  "General Inquiry",
];

export type ContactFormData = {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  category: InquiryCategory;
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-\s\d]{7,20}$/;

export function validateContactForm(
  data: ContactFormData
): Partial<Record<keyof ContactFormData, string>> {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  if (!data.fullName?.trim()) {
    errors.fullName = "Please enter your full name.";
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = "Name must be at least 2 characters.";
  } else if (data.fullName.trim().length > 80) {
    errors.fullName = "Name must be under 80 characters.";
  }

  if (!data.email?.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_RE.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (data.phone?.trim() && !PHONE_RE.test(data.phone.trim())) {
    errors.phone = "Please enter a valid phone number (or leave it empty).";
  }

  if (!data.subject?.trim()) {
    errors.subject = "Please enter a subject.";
  } else if (data.subject.trim().length > 120) {
    errors.subject = "Subject must be under 120 characters.";
  }

  if (!data.category) {
    errors.category = "Please choose an inquiry category.";
  }

  if (!data.message?.trim()) {
    errors.message = "Please write a message.";
  } else if (data.message.trim().length < 20) {
    errors.message = "Message should be at least 20 characters.";
  } else if (data.message.trim().length > 3000) {
    errors.message = "Message must be under 3000 characters.";
  }

  return errors;
}

/** Strip control characters / trim before anything is submitted. */
export function sanitizeContactForm(
  data: ContactFormData
): ContactFormData {
  const clean = (s: string) =>
    s
      .replace(/[\u0000-\u001F\u007F]/g, " ")
      .replace(/\s{3,}/g, "  ")
      .trim()
      .slice(0, 3000);
  return {
    fullName: clean(data.fullName),
    email: clean(data.email).toLowerCase(),
    phone: data.phone ? clean(data.phone) : "",
    subject: clean(data.subject),
    category: data.category,
    message: clean(data.message),
  };
}
