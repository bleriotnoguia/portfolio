"use server";

import React from "react";
import { Resend } from "resend";
import { validateString, getErrorMessage } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";

const resend = new Resend(process.env.RESEND_API_KEY);

// Temps minimum (ms) pour qu'un humain remplisse le formulaire - évite les bots
const MIN_SUBMIT_TIME_MS = 3000;

export const sendEmail = async (formData: FormData) => {
  // Vérification anti-bot : honeypot (les bots remplissent les champs cachés)
  const honeypot = formData.get("website");
  if (honeypot && String(honeypot).trim().length > 0) {
    return { error: "Invalid submission" };
  }

  // Vérification anti-bot : temps minimum (les bots soumettent instantanément)
  const formLoadedAt = formData.get("formLoadedAt");
  if (formLoadedAt) {
    const elapsed = Date.now() - parseInt(String(formLoadedAt), 10);
    if (elapsed < MIN_SUBMIT_TIME_MS) {
      return { error: "Please take your time to fill the form" };
    }
  }

  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  // simple server-side validation
  if (!validateString(senderEmail, 500)) {
    return {
      error: "Invalid sender email",
    };
  }
  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message",
    };
  }

  let data;
  try {
    data = await resend.emails.send({
      from: "Contact Form <contact@bleriotnoguia.com>",
      to: process.env.RECIPIENT_EMAIL || "contact@bleriotnoguia.com",
      subject: "Message from contact form",
      reply_to: senderEmail,
      react: React.createElement(ContactFormEmail, {
        message: message,
        senderEmail: senderEmail,
      }),
    });
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }

  return {
    data,
  };
};
