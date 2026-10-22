"use server";

import React from "react";
import { Resend } from "resend";
import { validateString, getErrorMessage } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";

// Temps minimum (ms) pour qu'un humain remplisse le formulaire - évite les bots
const MIN_SUBMIT_TIME_MS = 3000;

// Codes rather than sentences: the client shows them in the visitor's language.
export type SendEmailError =
  | "invalid_submission"
  | "too_fast"
  | "invalid_email"
  | "invalid_message"
  | "send_failed";

export const sendEmail = async (
  formData: FormData
): Promise<{ error?: SendEmailError; data?: unknown }> => {
  // Vérification anti-bot : honeypot (les bots remplissent les champs cachés)
  const honeypot = formData.get("website");
  if (honeypot && String(honeypot).trim().length > 0) {
    return { error: "invalid_submission" };
  }

  // Vérification anti-bot : temps minimum (les bots soumettent instantanément)
  const formLoadedAt = formData.get("formLoadedAt");
  if (formLoadedAt) {
    const elapsed = Date.now() - parseInt(String(formLoadedAt), 10);
    if (elapsed < MIN_SUBMIT_TIME_MS) {
      return { error: "too_fast" };
    }
  }

  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  // simple server-side validation
  if (!validateString(senderEmail, 500)) {
    return { error: "invalid_email" };
  }
  if (!validateString(message, 5000)) {
    return { error: "invalid_message" };
  }

  try {
    // Created per request: Resend throws when the key is missing, which would
    // otherwise break the build in environments without it.
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: "Contact Form <contact@bleriotnoguia.com>",
      to: process.env.RECIPIENT_EMAIL || "contact@bleriotnoguia.com",
      subject: "Message from contact form",
      replyTo: senderEmail,
      react: React.createElement(ContactFormEmail, {
        message: message,
        senderEmail: senderEmail,
      }),
    });

    if (error) {
      console.error("Contact form email failed:", error.message);
      return { error: "send_failed" };
    }

    return { data };
  } catch (error: unknown) {
    console.error("Contact form email failed:", getErrorMessage(error));
    return { error: "send_failed" };
  }
};
