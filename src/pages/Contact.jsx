import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { MapPin, Phone, Mail, Clock, Building } from "lucide-react";
import useDocumentMetadata from "../hooks/useDocumentMetadata";

export default function Contact() {
  useDocumentMetadata({
    title: "Contact Us",
    description: "Get in touch with the Department of Instrumentation and Control Engineering at COEP Technological University for academic, research, or administrative inquiries.",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div className="space-y-12 pb-12">
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with the Department of Instrumentation and Control Engineering for academic, research, or administrative inquiries."
        badgeText="Contact"
      />

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Contact Info and Form */}
        <div className="lg:col-span-7 space-y-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="border-none bg-white shadow-[var(--shadow-soft)]">
              <CardContent className="p-6 space-y-4">
                <div className="h-10 w-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)]">
                  <Building size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--color-heading)]">Department Office</h3>
                  <p className="mt-1 text-sm text-[var(--color-text-soft)]">
                    Main Administration Block
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-text-soft)] leading-relaxed">
                    COEP Technological University,<br />
                    Wellesley Road, Shivajinagar,<br />
                    Pune - 411005
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-white shadow-[var(--shadow-soft)]">
              <CardContent className="p-6 space-y-4">
                <div className="h-10 w-10 rounded-xl bg-[var(--color-highlight)]/10 flex items-center justify-center text-[var(--color-highlight)]">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--color-heading)]">Office Hours</h3>
                  <p className="mt-1 text-sm text-[var(--color-text-soft)]">
                    Working Days & Time
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-text-soft)] leading-relaxed">
                    Monday to Friday:<br />
                    10:00 AM - 5:30 PM<br />
                    (Closed on public holidays)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Contact Form */}
          <Card className="border-none bg-white shadow-[var(--shadow-soft)]">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl font-bold text-[var(--color-heading)] mb-6">Send an Inquiry</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-soft)] mb-2">
                      Full Name
                    </span>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                      placeholder="Your Name"
                    />
                  </label>
                  <label className="block">
                    <span className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-soft)] mb-2">
                      Email Address
                    </span>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                      placeholder="your.email@example.com"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-soft)] mb-2">
                    Subject
                  </span>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                    placeholder="Inquiry Subject"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-soft)] mb-2">
                    Message
                  </span>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all resize-none"
                    placeholder="Write your message here..."
                  />
                </label>
                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[var(--color-primary)] text-white text-sm font-bold transition-all hover:bg-[var(--color-primary-strong)] hover:shadow-lg disabled:opacity-50"
                >
                  {submitted ? "Inquiry Sent Successfully" : "Send Inquiry"}
                </button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Reach Out details and Map */}
        <div className="lg:col-span-5 space-y-8">
          <Card className="border-none bg-white shadow-[var(--shadow-soft)] overflow-hidden">
            <CardContent className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-[var(--color-heading)] border-b border-[var(--color-border)] pb-4">
                Reach Us Directly
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)] flex items-center justify-center shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-[var(--color-text-soft)] tracking-wider">
                      Telephone
                    </h4>
                    <p className="mt-1 text-sm font-bold text-[var(--color-heading)]">
                      <a href="tel:+9102025507035" className="hover:text-[var(--color-accent)] transition-colors">
                        +91 (020) 2550 7035
                      </a>
                    </p>
                    <p className="text-sm font-bold text-[var(--color-heading)]">
                      <a href="tel:+9102025507036" className="hover:text-[var(--color-accent)] transition-colors">
                        +91 (020) 2550 7036
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)] flex items-center justify-center shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-[var(--color-text-soft)] tracking-wider">
                      Official Email
                    </h4>
                    <p className="mt-1 text-sm font-bold text-[var(--color-heading)]">
                      <a href="mailto:head.instrumentation@coeptech.ac.in" className="hover:text-[var(--color-accent)] transition-colors">
                        head.instrumentation@coeptech.ac.in
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)] flex items-center justify-center shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-[var(--color-text-soft)] tracking-wider">
                      Location Code
                    </h4>
                    <p className="mt-1 text-sm font-medium text-[var(--color-heading)]">
                      Instrumentation & Control Engineering Block, COEP Tech Campus, Pune
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-[var(--radius-container)] border border-[var(--color-border)] overflow-hidden shadow-[var(--shadow-soft)] bg-white p-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1d3782.964953930164!2d73.8567175!3d18.5305146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c0f6fa594e9f%3A0xc3c5ca8066f1e680!2sCollege%20of%20Engineering%20Pune%20(COEP)!5e0!3m2!1sen!2sin!4v1685718293751!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: "2rem" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="COEP Technological University Map"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
