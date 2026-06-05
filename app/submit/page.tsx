"use client";

import { useState } from "react";
import Link from "next/link";

const CATEGORIES = [
  "Free Food",
  "Tenant Defense",
  "Public Space",
  "Repair Skills",
  "Local Makers",
  "Gathering Places",
  "Mutual Aid",
  "Co-op Leads",
];

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    address: "",
    hours: "",
    description: "",
    contact: "",
    missing: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        style={{ background: "#F5F0E8", minHeight: "calc(100vh - 56px)" }}
        className="flex items-center justify-center px-6"
      >
        <div className="max-w-md text-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "#2D5016" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2
            className="text-2xl font-bold mb-3"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#1A1A18" }}
          >
            Thank you.
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "#6B6355" }}>
            Your submission will be reviewed and added to the next monthly atlas update.
            Every listing is verified before it goes in — that&apos;s what makes this worth trusting.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/atlas"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold"
              style={{ fontFamily: "'Space Grotesk', sans-serif", background: "#1A1A18", color: "#F5F0E8" }}
            >
              Back to the Atlas
            </Link>
            <button
              onClick={() => setSubmitted(false)}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold border"
              style={{ borderColor: "#E5DDD0", color: "#6B6355" }}
            >
              Submit Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#F5F0E8", minHeight: "calc(100vh - 56px)" }}>
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#C4870A" }}>
            Community Submission
          </p>
          <h1
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#1A1A18" }}
          >
            Add a resource to the Atlas
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "#6B6355" }}>
            You know something we don&apos;t. Maybe it&apos;s the woman on your block who fixes sewing machines,
            the park bench where elders gather every Sunday, or the church basement that&apos;s been
            quietly available for years. Add it here.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#1A1A18" }}>
                Name of resource *
              </label>
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. The Eastside Free Fridge"
                className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-amber-400"
                style={{ borderColor: "#D5CCB8", background: "white", color: "#1A1A18" }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#1A1A18" }}>
                Category *
              </label>
              <select
                required
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-amber-400"
                style={{ borderColor: "#D5CCB8", background: "white", color: form.category ? "#1A1A18" : "#A0998E" }}
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "#1A1A18" }}>
              Address or location *
            </label>
            <input
              required
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Street address, intersection, or neighborhood description"
              className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-amber-400"
              style={{ borderColor: "#D5CCB8", background: "white", color: "#1A1A18" }}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "#1A1A18" }}>
              Hours or availability *
            </label>
            <input
              required
              name="hours"
              value={form.hours}
              onChange={handleChange}
              placeholder="e.g. Saturdays 9am–1pm, or 24/7, or by appointment"
              className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-amber-400"
              style={{ borderColor: "#D5CCB8", background: "white", color: "#1A1A18" }}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "#1A1A18" }}>
              Description *
            </label>
            <textarea
              required
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe what this resource offers. Who should know about it, and what will they find? Write as if you&apos;re telling a neighbor."
              className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-amber-400 resize-none"
              style={{ borderColor: "#D5CCB8", background: "white", color: "#1A1A18" }}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "#1A1A18" }}>
              Contact info{" "}
              <span className="font-normal" style={{ color: "#A0998E" }}>
                (optional — email, phone, social, or how to find them)
              </span>
            </label>
            <input
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="How can someone reach or find this resource?"
              className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-amber-400"
              style={{ borderColor: "#D5CCB8", background: "white", color: "#1A1A18" }}
            />
          </div>

          <div
            className="p-4 rounded-lg border-l-4"
            style={{ background: "rgba(196,135,10,0.06)", borderLeftColor: "#C4870A" }}
          >
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "#1A1A18" }}>
              What&apos;s missing in your neighborhood?{" "}
              <span className="font-normal" style={{ color: "#A0998E" }}>
                (optional)
              </span>
            </label>
            <textarea
              name="missing"
              value={form.missing}
              onChange={handleChange}
              rows={3}
              placeholder="What would change your block if it existed? Housing solutions, reclaimable public spaces, bulk-buy clubs, co-op ideas, repair skills, anything."
              className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-amber-400 resize-none"
              style={{ borderColor: "#D5CCB8", background: "white", color: "#1A1A18" }}
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: "#1A1A18",
                color: "#F5F0E8",
              }}
            >
              Submit to the Atlas
            </button>
            <p className="text-xs mt-3" style={{ color: "#A0998E" }}>
              All submissions are reviewed before publishing. We verify each listing by visit, call, or message.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
