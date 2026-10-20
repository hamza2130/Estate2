"use client";

import { useState } from "react";

export default function InquiryForm({ propertyId, interest = "General", compact = false }: { propertyId?: string; interest?: string; compact?: boolean }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...Object.fromEntries(form), propertyId, interest: form.get("interest") || interest }),
    });
    if (res.ok) {
      setState("sent");
    } else {
      setError((await res.json().catch(() => ({}))).error || "Something went wrong");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-lg bg-green-50 p-5 text-sm text-green-800">
        <p className="font-semibold">Thank you, we have your request.</p>
        <p className="mt-1">An advisor will call you back shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className={compact ? "space-y-3" : "grid gap-3 sm:grid-cols-2"}>
        <input name="name" required placeholder="Full name" className="input" />
        <input name="phone" required placeholder="Phone / WhatsApp" className="input" />
      </div>
      <input name="email" type="email" placeholder="Email (optional)" className="input" />
      {!propertyId && (
        <select name="interest" className="input" defaultValue={interest}>
          <option>General</option>
          <option>Buy a property</option>
          <option>Sell a property</option>
          <option>Rent a property</option>
          <option>Site visit</option>
          {!["General", "Buy a property", "Sell a property", "Rent a property", "Site visit"].includes(interest) && <option>{interest}</option>}
        </select>
      )}
      <textarea name="message" required rows={compact ? 3 : 4} placeholder="How can we help?" className="input" defaultValue={propertyId ? "I'm interested in this property. Please share more details." : ""} />
      {state === "error" && <p className="text-sm text-red-600">{error}</p>}
      <button className="btn-gold w-full" disabled={state === "sending"}>{state === "sending" ? "Sending..." : "Send inquiry"}</button>
    </form>
  );
}
