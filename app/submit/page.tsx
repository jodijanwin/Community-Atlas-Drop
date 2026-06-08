"use client";

import { useState } from "react";
import Link from "next/link";

const CATEGORIES = ["Free Food","Tenant Defense","Public Space","Repair Skills","Local Makers","Gathering Places","Mutual Aid","Co-op Leads"];

const inputStyle = { borderColor: "#C2D1DB", background: "white", color: "#3F352C" };
const labelStyle = { color: "#3F352C" };
const optionalStyle = { color: "#6B6158" };

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", category: "", address: "", hours: "",
    eventDate: "", eventTime: "",
    description: "", contact: "", missing: "",
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
      <div style={{ background: "#F6F1E8", minHeight: "calc(100vh - 56px)" }} className="flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "#7A9E7E" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Lora', serif", color: "#3F352C" }}>Thank you.</h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "#6B6158" }}>Your submission will be reviewed and added to the next monthly atlas update. Every listing is verified before it goes in — that&apos;s what makes this worth trusting.</p>
          <div className="flex gap-3 justify-center">
            <Link href="/atlas" className="px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ background: "#2F5D50", color: "#F6F1E8" }}>Back to the Atlas</Link>
            <button onClick={() => setSubmitted(false)} className="px-5 py-2.5 rounded-lg text-sm font-semibold border" style={{ borderColor: "#C2D1DB", color: "#6B6158" }}>Submit Another</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#F6F1E8", minHeight: "calc(100vh - 56px)" }}>
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#2F6F73" }}>Community Submission</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: "'Lora', serif", color: "#3F352C" }}>Add to the Atlas</h1>
          <p className="text-sm leading-relaxed" style={{ color: "#6B6158" }}>You know something we don&apos;t. Maybe it&apos;s the neighbour on your concession who fixes small engines, the hall that&apos;s been quietly available for years, or the person giving away seedlings every spring. Add it here.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name + Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={labelStyle}>Name of resource *</label>
              <input required name="name" value={form.name} onChange={handleChange} placeholder="e.g. Port Perry Repair Café" className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style={inputStyle} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={labelStyle}>Category *</label>
              <select required name="category" value={form.category} onChange={handleChange} className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style={{ ...inputStyle, color: form.category ? "#3F352C" : "#6B6158" }}>
                <option value="">Select a category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={labelStyle}>Address or location *</label>
            <input required name="address" value={form.address} onChange={handleChange} placeholder="Street address, intersection, or description (e.g. Blackstock area)" className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style={inputStyle} />
          </div>

          {/* Hours */}
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={labelStyle}>Hours or availability *</label>
            <input required name="hours" value={form.hours} onChange={handleChange} placeholder="e.g. Saturdays 9am–1pm, or by appointment, or year-round" className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style={inputStyle} />
          </div>

          {/* Event date + time */}
          <div className="p-4 rounded-lg border-l-4" style={{ background: "rgba(122,158,126,0.06)", borderLeftColor: "#7A9E7E" }}>
            <p className="text-xs font-semibold mb-3" style={labelStyle}>
              Is this for a specific event? <span className="font-normal" style={optionalStyle}>(optional)</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-1" style={optionalStyle}>Date</label>
                <input type="date" name="eventDate" value={form.eventDate} onChange={handleChange} className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style={inputStyle} />
              </div>
              <div>
                <label className="block text-xs mb-1" style={optionalStyle}>Time <span className="italic">(optional)</span></label>
                <input type="time" name="eventTime" value={form.eventTime} onChange={handleChange} className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style={inputStyle} />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={labelStyle}>Description *</label>
            <textarea required name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Describe what this resource offers. Write as if you are telling a neighbour about it." className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none resize-none" style={inputStyle} />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={labelStyle}>Contact info <span className="font-normal" style={optionalStyle}>(optional)</span></label>
            <input name="contact" value={form.contact} onChange={handleChange} placeholder="How can someone reach or find this resource?" className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style={inputStyle} />
          </div>

          {/* What's missing */}
          <div className="p-4 rounded-lg border-l-4" style={{ background: "rgba(47,111,115,0.04)", borderLeftColor: "#2F6F73" }}>
            <label className="block text-xs font-semibold mb-1.5" style={labelStyle}>What&apos;s missing in North Durham? <span className="font-normal" style={optionalStyle}>(optional)</span></label>
            <textarea name="missing" value={form.missing} onChange={handleChange} rows={3} placeholder="What would change your part of the region if it existed? Housing, transit, shared space, co-ops, anything." className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none resize-none" style={inputStyle} />
          </div>

          <div className="pt-2">
            <button type="submit" className="w-full sm:w-auto px-8 py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90" style={{ fontFamily: "'Lora', serif", background: "#C65A1E", color: "white" }}>Submit to the Atlas</button>
            <p className="text-xs mt-3" style={{ color: "#6B6158" }}>All submissions are reviewed before publishing. We verify each listing by visit, call, or message.</p>
          </div>
        </form>
      </div>
    </div>
  );
}
