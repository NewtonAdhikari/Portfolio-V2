"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Github,
  GraduationCap,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  RotateCw,
  Send,
  ShieldCheck,
  Trophy,
  Twitter,
} from "lucide-react";
import { toast } from "sonner";
import { useRoute } from "@/lib/router";
import { profile } from "@/data/profile";
import {
  INQUIRY_CATEGORIES,
  isSheetsIntegrationConfigured,
  submitContactForm,
  validateContactForm,
  type CaptchaSolution,
  type ContactFormData,
  type InquiryCategory,
} from "@/lib/contact";
import { mapConfig, mapEmbedUrl, mapDirectionsUrl } from "@/data/profile";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const socialIcons: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  graduation: GraduationCap,
  trophy: Trophy,
  twitter: Twitter,
};

type FieldErrors = Partial<Record<keyof ContactFormData, string>>;

const EMPTY: ContactFormData = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  category: "" as unknown as InquiryCategory,
  message: "",
};

export function ContactPage() {
  const { navigate } = useRoute();
  const [form, setForm] = useState<ContactFormData>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  /* ── CAPTCHA / anti-spam state ─────────────────────────────── */
  type Challenge = { svg: string; token: string; expiresAt: number };
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const openedAt = useRef<number>(Date.now());

  const loadCaptcha = useCallback(async () => {
    setCaptchaLoading(true);
    try {
      const res = await fetch("/api/captcha", { cache: "no-store" });
      const json = (await res.json()) as Challenge;
      setChallenge({ svg: json.svg, token: json.token, expiresAt: json.expiresAt });
    } catch {
      setChallenge(null);
    } finally {
      setCaptchaLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadCaptcha();
  }, [loadCaptcha]);

  const configured = isSheetsIntegrationConfigured();

  const set = (key: keyof ContactFormData, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (touched[key]) {
      const next = validateContactForm({ ...form, [key]: value });
      setErrors((e) => ({ ...e, [key]: next[key] }));
    }
  };

  const blur = (key: keyof ContactFormData) => {
    setTouched((t) => ({ ...t, [key]: true }));
    const next = validateContactForm(form);
    setErrors((e) => ({ ...e, [key]: next[key] }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError("");
    const validation = validateContactForm(form);
    setErrors(validation);
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      subject: true,
      category: true,
      message: true,
    });
    if (Object.values(validation).some(Boolean)) {
      toast.error("Please fix the highlighted fields before sending.");
      return;
    }

    /* Security checks before submission. */
    if (!challenge) {
      setCaptchaError(
        "The security check hasn't loaded yet — click refresh on the code box and try again."
      );
      return;
    }
    if (!captchaAnswer.trim()) {
      setCaptchaError("Please type the characters shown in the security check.");
      return;
    }
    setCaptchaError("");

    setStatus("submitting");
    const solution: CaptchaSolution = {
      token: challenge.token,
      answer: captchaAnswer,
      honeypot,
      openedAt: openedAt.current,
    };
    const result = await submitContactForm(form, solution);
    if (result.ok) {
      setStatus("success");
      setForm(EMPTY);
      setTouched({});
      setErrors({});
      setCaptchaAnswer("");
      setCaptchaError("");
      setHoneypot("");
      void loadCaptcha(); // fresh challenge for the next message
      toast.success("Message sent — thank you! I'll get back to you soon.");
    } else {
      setStatus("error");
      setServerError(result.error);
      // The challenge is single-use: always mint a new one after a failure.
      setCaptchaAnswer("");
      void loadCaptcha();
      toast.error("Something went wrong. Please try again or email me directly.");
    }
  };

  return (
    <div className="bg-background">
      <PageHero
        kicker="CONTACT"
        icon="mail"
        title={
          <>
            Let&apos;s start a{" "}
            <span className="text-gradient">meaningful conversation.</span>
          </>
        }
        description="Research collaborations, internships, project partnerships, academic discussions — or anything in between. Every message lands in my tracked inbox via a Google Sheets pipeline."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* ── Left: introduction + channels ── */}
          <div className="space-y-5">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl bg-brand-ink p-8">
                <div className="absolute inset-0 bg-grid-dark" aria-hidden="true" />
                <div className="blob left-[15%] top-[-40%] h-[220px] w-[220px] bg-brand-royal/60" aria-hidden="true" />
                <div className="relative">
                  <h2 className="font-display text-2xl font-bold text-white">
                    Reach out directly
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    I read every message personally and usually reply within
                    24–48 hours. For research or opportunity-related emails,
                    mention your context — it helps me respond usefully.
                  </p>

                  <ul className="mt-6 space-y-3">
                    <li>
                      <a
                        href={`mailto:${profile.email}`}
                        className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition-colors hover:border-brand-orange/50"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-red to-brand-orange text-white">
                          <Mail className="h-4.5 w-4.5" />
                        </span>
                        <span>
                          <span className="block text-[11px] font-semibold uppercase tracking-widest text-white/50">
                            Email
                          </span>
                          <span className="block break-all text-sm font-medium text-white">
                            {profile.email}
                          </span>
                        </span>
                      </a>
                    </li>
                    <li className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-deep to-brand-royal text-white">
                        <MapPin className="h-4.5 w-4.5" />
                      </span>
                      <span>
                        <span className="block text-[11px] font-semibold uppercase tracking-widest text-white/50">
                          Location
                        </span>
                        <span className="block text-sm font-medium text-white">
                          {profile.location}
                        </span>
                      </span>
                    </li>
                  </ul>

                  <div className="mt-6">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-white/50">
                      Find me online
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2.5">
                      {profile.socials.map((s) => {
                        const Icon = socialIcons[s.icon] ?? Github;
                        return (
                          <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={s.label}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/75 transition-all hover:-translate-y-0.5 hover:border-brand-orange hover:bg-brand-orange hover:text-white"
                          >
                            <Icon className="h-4 w-4" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-3xl border border-border bg-card p-7">
                <h3 className="font-display text-lg font-bold text-foreground">
                  Collaboration information
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-brand-slate">
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                    <span>
                      <strong className="text-foreground">Research collaboration</strong>{" "}
                      — open to LLM evaluation, causal reasoning and trustworthy
                      ML projects with faculty or student groups.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
                    <span>
                      <strong className="text-foreground">Internships</strong> —
                      actively seeking summer 2026 software/ML engineering
                      internships.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" />
                    <span>
                      <strong className="text-foreground">Speaking &amp; mentoring</strong>{" "}
                      — happy to give sessions on ML basics, RAG systems or
                      student research journeys.
                    </span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          {/* ── Right: form ── */}
          <Reveal delay={0.05}>
            <div className="rounded-3xl border border-border bg-card p-7 sm:p-9">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Send a message
                </h2>
                <span
                  className={cn(
                    "hidden rounded-full border px-3 py-1 text-[10px] font-bold sm:inline-flex",
                    configured
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "border-brand-orange/30 bg-brand-orange/10 text-[#b25a10] dark:text-brand-orange"
                  )}
                >
                  {configured ? "SHEETS CONNECTED" : "SHEETS PENDING SETUP"}
                </span>
              </div>
              <p className="mt-2 text-sm text-brand-slate">
                Submissions pass a CAPTCHA security check, are validated and
                sanitized, then stored in a Google Spreadsheet via Apps Script.
              </p>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-8 rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.07] p-8 text-center"
                  >
                    <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
                    <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                      Message sent successfully!
                    </h3>
                    <p className="mx-auto mt-2 max-w-sm text-sm text-brand-slate">
                      Your submission was recorded in the contact spreadsheet.
                      I&apos;ll get back to you within 24–48 hours.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6 rounded-full"
                      onClick={() => {
                        setStatus("idle");
                        openedAt.current = Date.now();
                        void loadCaptcha();
                      }}
                    >
                      Send another message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={onSubmit}
                    noValidate
                    className="mt-7 space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">
                          Full Name <span className="text-brand-red">*</span>
                        </Label>
                        <Input
                          id="fullName"
                          value={form.fullName}
                          onChange={(e) => set("fullName", e.target.value)}
                          onBlur={() => blur("fullName")}
                          placeholder="Your Name"
                          aria-invalid={Boolean(errors.fullName)}
                          className={cn(errors.fullName && "border-destructive focus-visible:ring-destructive")}
                        />
                        {errors.fullName && (
                          <p className="text-xs font-medium text-destructive">{errors.fullName}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email Address <span className="text-brand-red">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => set("email", e.target.value)}
                          onBlur={() => blur("email")}
                          placeholder="example@domain.com"
                          aria-invalid={Boolean(errors.email)}
                          className={cn(errors.email && "border-destructive focus-visible:ring-destructive")}
                        />
                        {errors.email && (
                          <p className="text-xs font-medium text-destructive">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          Phone Number{" "}
                          <span className="text-muted-foreground">(optional)</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) => set("phone", e.target.value)}
                          onBlur={() => blur("phone")}
                          placeholder="+977 98123 45678"
                          aria-invalid={Boolean(errors.phone)}
                          className={cn(errors.phone && "border-destructive focus-visible:ring-destructive")}
                        />
                        {errors.phone && (
                          <p className="text-xs font-medium text-destructive">{errors.phone}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">
                          Inquiry Category <span className="text-brand-red">*</span>
                        </Label>
                        <select
                          id="category"
                          value={form.category}
                          onChange={(e) => set("category", e.target.value)}
                          onBlur={() => blur("category")}
                          aria-invalid={Boolean(errors.category)}
                          className={cn(
                            "flex h-10 w-full rounded-xl border border-input bg-card px-3.5 py-2 text-sm text-foreground outline-none transition-colors focus:ring-2 focus:ring-ring",
                            errors.category && "border-destructive"
                          )}
                        >
                          <option value="" disabled>
                            Select a category…
                          </option>
                          {INQUIRY_CATEGORIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                        {errors.category && (
                          <p className="text-xs font-medium text-destructive">{errors.category}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">
                        Subject <span className="text-brand-red">*</span>
                      </Label>
                      <Input
                        id="subject"
                        value={form.subject}
                        onChange={(e) => set("subject", e.target.value)}
                        onBlur={() => blur("subject")}
                        placeholder="Research collaboration on LLM evaluation"
                        aria-invalid={Boolean(errors.subject)}
                        className={cn(errors.subject && "border-destructive focus-visible:ring-destructive")}
                      />
                      {errors.subject && (
                        <p className="text-xs font-medium text-destructive">{errors.subject}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Message <span className="text-brand-red">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        value={form.message}
                        onChange={(e) => set("message", e.target.value)}
                        onBlur={() => blur("message")}
                        placeholder="Tell me a little about what you have in mind…"
                        rows={6}
                        aria-invalid={Boolean(errors.message)}
                        className={cn(
                          "resize-none rounded-xl",
                          errors.message && "border-destructive focus-visible:ring-destructive"
                        )}
                      />
                      <div className="flex items-center justify-between">
                        {errors.message ? (
                          <p className="text-xs font-medium text-destructive">{errors.message}</p>
                        ) : (
                          <span />
                        )}
                        <span className="text-[11px] text-muted-foreground">
                          {form.message.length}/3000
                        </span>
                      </div>
                    </div>

                    {/* ── Honeypot (invisible to humans) ── */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="company_website">Company website</label>
                      <input
                        id="company_website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    {/* ── CAPTCHA challenge ── */}
                    <div className="space-y-2">
                      <Label htmlFor="captcha">
                        Security check <span className="text-brand-red">*</span>
                      </Label>
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => void loadCaptcha()}
                          title="Click for a new code"
                          aria-label="Refresh security code image"
                          className="flex h-[70px] min-w-[190px] flex-1 items-center justify-center overflow-hidden rounded-xl border border-input bg-brand-mist transition-opacity hover:opacity-90 dark:bg-secondary sm:flex-none"
                        >
                          {challenge ? (
                            <span
                              className="block h-full w-full [&>svg]:h-full [&>svg]:w-full"
                              dangerouslySetInnerHTML={{ __html: challenge.svg }}
                            />
                          ) : (
                            <span className="flex items-center gap-2 px-4 text-xs text-brand-slate">
                              <RotateCw className={cn("h-3.5 w-3.5", captchaLoading && "animate-spin")} />
                              {captchaLoading ? "Loading…" : "Click to load code"}
                            </span>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => void loadCaptcha()}
                          className="flex h-11 w-11 items-center justify-center rounded-xl border border-input text-brand-slate transition-colors hover:border-brand-royal hover:text-brand-royal"
                          aria-label="Get a new security code"
                        >
                          <RotateCw className={cn("h-4 w-4", captchaLoading && "animate-spin")} />
                        </button>
                        <Input
                          id="captcha"
                          value={captchaAnswer}
                          onChange={(e) =>
                            setCaptchaAnswer(e.target.value.toUpperCase().slice(0, 6))
                          }
                          placeholder="Type the code"
                          autoComplete="off"
                          aria-invalid={Boolean(captchaError)}
                          className={cn(
                            "h-11 min-w-[150px] flex-1 rounded-xl font-mono uppercase tracking-[0.3em] sm:w-40",
                            captchaError &&
                              "border-destructive focus-visible:ring-destructive"
                          )}
                        />
                      </div>
                      {captchaError ? (
                        <p className="text-xs font-medium text-destructive">{captchaError}</p>
                      ) : (
                        <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                          Can&apos;t read it? Click the image or the refresh button for a new code.
                        </p>
                      )}
                    </div>

                    {serverError && (
                      <div className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/[0.06] p-4">
                        <AlertCircle className="mt-0.5 h-4.5 w-4.5 shrink-0 text-destructive" />
                        <p className="text-sm leading-relaxed text-destructive">{serverError}</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={status === "submitting"}
                      className="h-12 w-full gap-2 rounded-full bg-gradient-to-r from-brand-red to-brand-orange text-sm font-semibold text-white shadow-[0_14px_34px_-10px_rgba(229,36,54,0.6)] transition-transform hover:scale-[1.01] disabled:opacity-70"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="h-4.5 w-4.5 animate-spin" />
                          Sending your message…
                        </>
                      ) : (
                        <>
                          <Send className="h-4.5 w-4.5" />
                          Send Message
                        </>
                      )}
                    </Button>

                    <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
                      Protected by CAPTCHA verification, duplicate &amp; rate
                      checks. By sending, you agree to the{" "}
                      <button
                        type="button"
                        onClick={() => navigate("/privacy")}
                        className="underline underline-offset-2 hover:text-foreground"
                      >
                        privacy policy
                      </button>
                      .
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── Google Map — location ──────────────────────────────────── */}
      <Section className="pt-0 md:pt-0">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-border bg-card">
            <iframe
              src={mapEmbedUrl}
              title={`Google Map — ${mapConfig.mapQuery}`}
              className="h-[340px] w-full sm:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border p-6">
              <div className="flex items-start gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-deep to-brand-royal text-white">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {mapConfig.label}
                  </h3>
                  <p className="mt-0.5 text-sm text-brand-slate">
                    {mapConfig.note}
                  </p>
                </div>
              </div>
              <a
                href={mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-deep to-brand-royal px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_-12px_rgba(33,16,143,0.7)] transition-transform hover:scale-[1.03]"
              >
                Get Directions
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
