"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { contactService } from "@/services/contact.service";
import { cn } from "@/lib/utils";

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const INITIAL: ContactFormState = { name: "", email: "", phone: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(INITIAL);
  const [sending, setSending] = useState(false);

  const update = (field: keyof ContactFormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await contactService.submit({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        message: form.message.trim(),
      });
      toast.success(res.message);
      setForm(INITIAL);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  };

  const inputClasses =
    "font-sans text-sm text-text bg-background border border-border/60 rounded-xl px-4 py-3.5 placeholder:text-text-muted/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-surface/50 p-6 sm:p-8 rounded-2xl border border-border/50">
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="font-sans text-xs font-semibold uppercase tracking-widest text-text-muted">Name</label>
        <input
          id="contact-name"
          type="text"
          required
          placeholder="Your name"
          value={form.name}
          onChange={update("name")}
          disabled={sending}
          className={inputClasses}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="font-sans text-xs font-semibold uppercase tracking-widest text-text-muted">Email</label>
        <input
          id="contact-email"
          type="email"
          required
          placeholder="you@email.com"
          value={form.email}
          onChange={update("email")}
          disabled={sending}
          className={inputClasses}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-phone" className="font-sans text-xs font-semibold uppercase tracking-widest text-text-muted">Phone <span className="lowercase normal-case font-normal">(optional)</span></label>
        <input
          id="contact-phone"
          type="tel"
          placeholder="Your phone number"
          value={form.phone}
          onChange={update("phone")}
          disabled={sending}
          className={inputClasses}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="font-sans text-xs font-semibold uppercase tracking-widest text-text-muted">Message</label>
        <textarea
          id="contact-message"
          rows={4}
          required
          placeholder="How can we help?"
          value={form.message}
          onChange={update("message")}
          disabled={sending}
          className={cn(inputClasses, "resize-none")}
        />
      </div>
      <motion.button
        type="submit"
        disabled={sending}
        whileHover={sending ? {} : { scale: 1.01 }}
        whileTap={sending ? {} : { scale: 0.98 }}
        className={cn(
          "w-full inline-flex items-center justify-center gap-2 bg-accent text-background font-heading font-bold px-7 py-3.5 mt-2 rounded-xl text-sm tracking-wide transition-colors",
          sending ? "opacity-70 cursor-not-allowed" : "hover:bg-accent/90"
        )}
      >
        {sending ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send size={14} />
            Submit
          </>
        )}
      </motion.button>
    </form>
  );
}
