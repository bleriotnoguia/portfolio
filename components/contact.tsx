"use client";

import React, { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import { useI18n } from "@/context/i18n-context";

const fieldClass =
  "mt-2 w-full rounded-xl border border-line bg-paper px-4 text-ink transition-colors placeholder:text-muted/70 focus:border-ink/40";

export default function Contact() {
  const { ref } = useSectionInView("Contact", 0.4);
  const [formLoadedAt] = useState(() => Date.now());
  const [pending, startTransition] = useTransition();
  const { t } = useI18n();

  return (
    <section
      id="contact"
      ref={ref}
      className="mx-auto max-w-page scroll-mt-24 px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-12"
    >
      <div className="grid gap-10 rounded-[2rem] bg-signal p-6 text-on-signal sm:p-10 lg:grid-cols-12 lg:gap-8 lg:p-14">
        <div className="flex flex-col lg:col-span-6">
          <h2 className="h-display text-[clamp(2.25rem,1rem+3.6vw,4.25rem)]">
            {t.contact.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-on-signal/80">
            {t.contact.intro}
          </p>
          <ul className="mt-10 space-y-3 text-lg font-semibold lg:mt-auto lg:pt-10">
            <li>
              <a
                href="mailto:contact@bleriotnoguia.com"
                className="inline-flex items-center gap-3 underline decoration-on-signal/30 decoration-2 underline-offset-[6px] transition-colors hover:decoration-on-signal"
              >
                <FiMail aria-hidden className="h-5 w-5" />
                contact@bleriotnoguia.com
              </a>
            </li>
            <li>
              <a
                href="https://api.whatsapp.com/send?phone=237672077465"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 underline decoration-on-signal/30 decoration-2 underline-offset-[6px] transition-colors hover:decoration-on-signal"
              >
                <FaWhatsapp aria-hidden className="h-5 w-5" />
                {t.contact.whatsapp}
              </a>
            </li>
          </ul>
        </div>

        <form
          className="relative flex flex-col gap-5 rounded-[1.5rem] bg-surface p-5 text-ink sm:p-7 lg:col-span-6"
          // onSubmit rather than a form action: React 19 empties a form after its
          // action runs, which would also wipe the message when sending fails.
          onSubmit={(event) => {
            event.preventDefault();
            const form = event.currentTarget;
            const formData = new FormData(form);
            formData.append("formLoadedAt", formLoadedAt.toString());

            startTransition(async () => {
              const { error } = await sendEmail(formData);

              if (error) {
                toast.error(t.contact.errors[error]);
                return;
              }

              toast.success(t.contact.success);
              form.reset();
            });
          }}
        >
          {/* Honeypot - invisible aux humains, les bots le remplissent */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="pointer-events-none absolute -left-[9999px] h-1 w-1 opacity-0"
            aria-hidden="true"
          />
          <label className="block text-[0.95rem] font-semibold">
            {t.contact.emailLabel}
            <input
              className={`${fieldClass} h-12 font-normal`}
              name="senderEmail"
              type="email"
              required
              maxLength={500}
              autoComplete="email"
              placeholder={t.contact.emailPlaceholder}
            />
          </label>
          <label className="block text-[0.95rem] font-semibold">
            {t.contact.messageLabel}
            <textarea
              className={`${fieldClass} h-48 resize-y py-3 font-normal`}
              name="message"
              required
              maxLength={5000}
              placeholder={t.contact.messagePlaceholder}
            />
          </label>
          <SubmitBtn
            pending={pending}
            label={t.contact.send}
            pendingLabel={t.contact.sending}
          />
        </form>
      </div>
    </section>
  );
}
