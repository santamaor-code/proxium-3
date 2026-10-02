"use client";

import { useState } from "react";
import { TestimonialProgramContent } from "@/content/types";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";

export function TestimonialProgramForm({
  content,
}: {
  content: TestimonialProgramContent;
}) {
  const [fields, setFields] = useState({ fullName: "", phone: "" });
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/testimonial-program", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, message, consent }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-card border border-sage-200 bg-sage-50 p-6 text-center">
        <p className="font-medium text-sage-700">Solicitud enviada</p>
        <p className="mt-2 text-sm text-charcoal-soft">
          Un asesor de BioH te contactará pronto para confirmar los
          detalles.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {content.form.fields.map((field) => (
        <TextField
          key={field.name}
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          type={field.type}
          value={fields[field.name as keyof typeof fields]}
          onChange={(value) =>
            setFields((prev) => ({ ...prev, [field.name]: value }))
          }
        />
      ))}

      <label htmlFor="message" className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-charcoal">
          {content.form.messageLabel}
        </span>
        <textarea
          id="message"
          rows={3}
          placeholder={content.form.messagePlaceholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="rounded-card border border-charcoal/15 bg-stone-50 px-4 py-3 text-sm text-charcoal placeholder:text-charcoal-soft/50 focus:border-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-200"
        />
      </label>

      <label className="flex items-start gap-3 text-sm text-charcoal">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-0.5"
        />
        {content.consentLabel}
      </label>

      {status === "error" && (
        <p className="text-sm text-red-600">
          No se pudo enviar tu solicitud. Intenta de nuevo.
        </p>
      )}

      <Button
        variant="primary"
        className="mt-2 w-full"
        disabled={!consent || status === "submitting"}
      >
        {status === "submitting" ? "Enviando..." : content.form.cta}
      </Button>
    </form>
  );
}
