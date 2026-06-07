"use client";

import Image from "next/image";
import { CSSProperties, FormEvent, useState } from "react";

type FormFields = {
  fullName: string;
  email: string;
};

type FormErrors = Partial<Record<keyof FormFields, string>>;

type SubmitState = "idle" | "submitting" | "success" | "error";

const initialForm: FormFields = {
  fullName: "",
  email: "",
};

const diagonalBackdrop = {
  src: "/gallery/photo-1.png",
  alt: "צילום תינוקות תאומים בסטודיו",
};

const marqueeTerms = [
  "פוטוגרפי",
  "סטודיו",
  "ניו בורן",
  "סמאש קייק",
  "צילומי חוץ",
  "משפחה",
  "הריון",
] as const;

const features = [
  {
    title: "ניהול גלריות חכם",
    description:
      "העלאת מאות תמונות ברגע, שליחת קישורים מאובטחים, ומערכת סימון ובחירת תמונות אוטומטית שחוסכת שעות של מיון במיילים ובוואטסאפ.",
    Icon: SmartGalleryIcon,
  },
  {
    title: "אתר תדמית בעיצוב אישי",
    description:
      "בניית תיק עבודות דיגיטלי מרהיב, ממותג ומותאם אישית לסטודיו שלך בכמה קליקים פשוטים.",
    Icon: PortfolioIcon,
  },
  {
    title: "חוויית לקוח מושלמת",
    description:
      "הורדת קבצים מהירה באיכות גבוהה, וממשק בחירה ידידותי (❤️) מכל מכשיר או נייד.",
    Icon: ClientExperienceIcon,
  },
  {
    title: "חודש ראשון חינם לחלוטין",
    description:
      "ללא התחייבות, ללא כרטיס אשראי וללא אותיות קטנות — תתחילו לעבוד עם המערכת בחינם ותחליטו רק אחר כך.",
    Icon: FreeMonthIcon,
  },
] as const;

const floatingPhotos = [
  {
    src: "/gallery/photo-2.png",
    alt: "צילום תינוקות בסל",
    className:
      "absolute -bottom-6 -left-2 h-44 w-32 sm:-bottom-10 sm:-left-10 sm:h-60 sm:w-44 md:-left-16 md:h-72 md:w-52",
    rotate: -5,
    animation: "animate-photo-float",
  },
  {
    src: "/gallery/photo-3.png",
    alt: "צילום תינוקות בקערת עץ",
    className:
      "absolute top-[12%] -left-6 hidden h-56 w-40 lg:block xl:-left-20 xl:h-72 xl:w-52",
    rotate: 4,
    animation: "animate-photo-float-slow",
  },
  {
    src: "/gallery/photo-4.png",
    alt: "צילום יום הולדת ראשון",
    className:
      "absolute bottom-[30%] -left-3 h-44 w-32 sm:-left-10 sm:h-56 sm:w-40 md:-left-16 md:h-64 md:w-48",
    rotate: -4,
    animation: "animate-photo-float-delayed",
  },
] as const;

function validateForm(values: FormFields): FormErrors {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "נא להזין שם מלא";
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = "השם קצר מדי";
  }

  if (!values.email.trim()) {
    errors.email = "נא להזין כתובת אימייל";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "כתובת אימייל לא תקינה";
  }

  return errors;
}

function ClientExperienceIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-7 w-7 text-amber-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.25}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 7.5A2.5 2.5 0 0 1 7 5h10a2.5 2.5 0 0 1 2.5 2.5v9A2.5 2.5 0 0 1 17 19H7a2.5 2.5 0 0 1-2.5-2.5v-9Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 10.5h6M12 8v6"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 16.5c1 .8 2.2 1.2 3.5 1.2"
      />
    </svg>
  );
}

function PortfolioIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-7 w-7 text-amber-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.25}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5v-13Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 16l2.5-3 2 2.5L15 12l3 4"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 8.5h.01M7.5 6.5h9"
      />
    </svg>
  );
}

function FreeMonthIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-7 w-7 text-amber-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.25}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875v2.25m0 0c-1.355 0-2.697.056-4.024.166C6.845 7.367 6 8.21 6 9.25v.75m6-2.625c1.355 0 2.697.056 4.024.166C17.155 7.367 18 8.21 18 9.25v.75M6 10.5h12"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 15.75h4.5M12 13.5v4.5"
      />
    </svg>
  );
}

function SmartGalleryIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-7 w-7 text-amber-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.25}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 7.5A1.5 1.5 0 0 1 6.5 6h4A1.5 1.5 0 0 1 12 7.5v4A1.5 1.5 0 0 1 10.5 13h-4A1.5 1.5 0 0 1 5 11.5v-4Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 7.5A1.5 1.5 0 0 1 13.5 6h4A1.5 1.5 0 0 1 19 7.5v4A1.5 1.5 0 0 1 17.5 13h-4A1.5 1.5 0 0 1 12 11.5v-4Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 15.5A1.5 1.5 0 0 1 6.5 14h11A1.5 1.5 0 0 1 19 15.5V17A1.5 1.5 0 0 1 17.5 18.5h-11A1.5 1.5 0 0 1 5 17v-1.5Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 15.5h3"
      />
    </svg>
  );
}

function FeaturesGrid() {
  return (
    <section
      aria-labelledby="features-heading"
      className="animate-fade-up delay-400 mt-16 w-full max-w-3xl sm:mt-20"
    >
      <h2
        id="features-heading"
        className="font-display mb-8 text-center text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl"
      >
        מה מחכה לכם בפנים?
      </h2>

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
        {features.map(({ title, description, Icon }) => (
          <article
            key={title}
            className="group rounded-2xl border border-stone-200/80 bg-white/80 p-6 text-right shadow-[0_8px_32px_-12px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-shadow hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)] sm:p-7"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-50 to-stone-50 shadow-sm transition-transform group-hover:scale-105">
              <Icon />
            </div>
            <h3 className="font-display mb-3 text-xl font-semibold text-stone-900">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-stone-600 sm:text-[0.95rem]">
              {description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CameraLogo() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6 text-amber-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
      />
    </svg>
  );
}

function SuccessCheckmark() {
  return (
    <div className="animate-scale-in mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10">
      <svg
        aria-hidden="true"
        className="h-10 w-10 text-amber-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          className="animate-check-draw"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
  );
}

function DiagonalBackdrop({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute -top-[6%] -right-[10%] h-[128vh] w-[min(92vw,860px)] origin-top-right -rotate-[18deg] opacity-20 sm:-top-[4%] sm:-right-[6%] md:-right-[2%]">
      <div className="relative h-full w-full [mask-image:linear-gradient(to_bottom_left,black_50%,transparent_92%)]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 90vw, 900px"
          className="object-cover object-center"
          priority
        />
      </div>
    </div>
  );
}

function PhotoMarquee() {
  const track = [...marqueeTerms, ...marqueeTerms];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-[2%] -right-[14%] w-[155%] -rotate-[18deg] overflow-hidden opacity-[0.14] sm:-top-[1%] sm:-right-[8%] sm:opacity-[0.18]"
    >
      <div className="animate-marquee flex w-max items-center gap-10 px-4 sm:gap-14">
        {track.map((term, index) => (
          <span
            key={`${term}-${index}`}
            className="font-display text-4xl font-medium tracking-[0.2em] whitespace-nowrap text-stone-800 uppercase sm:text-6xl md:text-7xl"
          >
            {term}
            <span className="mx-6 text-amber-500/70 sm:mx-10">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function FloatingPhoto({
  src,
  alt,
  className,
  rotate,
  animation,
}: {
  src: string;
  alt: string;
  className: string;
  rotate: number;
  animation: string;
}) {
  return (
    <div
      className={`photo-frame pointer-events-none ${animation} ${className}`}
      style={{ "--photo-rotate": `${rotate}deg` } as CSSProperties}
    >
      <div className="photo-frame-inner relative h-full w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 160px, 320px"
          className="object-cover"
        />
      </div>
    </div>
  );
}

export default function WaitlistLanding() {
  const [form, setForm] = useState<FormFields>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  function handleChange(field: keyof FormFields, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submitState === "error") {
      setSubmitState("idle");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitState("submitting");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        if (data.error === "duplicate_email") {
          setErrors({ email: "כתובת האימייל כבר רשומה ברשימת ההמתנה" });
          setSubmitState("idle");
          return;
        }

        setSubmitState("error");
        return;
      }

      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-stone-50">
      {/* Soft warm glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="animate-glow-pulse absolute top-0 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-amber-200/30 blur-[100px]" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-stone-200/50 blur-[80px]" />
      </div>

      {/* Diagonal backdrop behind the form */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      >
        <DiagonalBackdrop {...diagonalBackdrop} />
        <PhotoMarquee />
      </div>

      {/* Floating framed photos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      >
        {floatingPhotos.map((photo) => (
          <FloatingPhoto key={photo.src} {...photo} />
        ))}
      </div>

      {/* Center fade so text stays readable */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3] bg-[radial-gradient(ellipse_75%_65%_at_42%_48%,rgba(250,250,249,0.9)_0%,rgba(250,250,249,0.45)_55%,rgba(250,250,249,0.08)_100%)]"
      />

      <main className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-10 sm:px-8 sm:py-14">
        <header className="animate-fade-up mb-12 flex items-center justify-center gap-2.5 sm:mb-16">
          <CameraLogo />
          <span className="font-display text-lg font-medium tracking-wide text-stone-700">
            מערכת גלריות חכמה לצלמים וצלמות
          </span>
        </header>

        <div className="flex flex-1 flex-col items-center text-center">
          <div className="animate-fade-up delay-100 mb-8 inline-flex max-w-lg items-center rounded-full border border-amber-500/20 bg-white/70 px-5 py-2 shadow-sm backdrop-blur-sm">
            <span className="text-xs leading-relaxed font-medium text-amber-700 sm:text-sm">
              ההשקה בקרוב — חודש ראשון חינם לחלוטין, ללא התחייבות, לכל
              הנרשמות הראשונות
            </span>
          </div>

          <h1 className="animate-fade-up delay-200 font-display mb-6 max-w-xl text-3xl leading-snug font-semibold tracking-tight text-stone-900 sm:text-4xl md:text-[2.75rem] md:leading-tight">
            צלמים וצלמות? תפסיקו לבזבז שעות על מיון תמונות ותקשורת מתישה.
          </h1>

          <p className="animate-fade-up delay-300 mb-10 max-w-lg text-base leading-relaxed text-stone-600 sm:text-lg">
            פלטפורמה אחת חכמה שמנהלת עבורך הכל: העלאת גלריות כבדות באיכות
            מקסימלית, שליחת קישור מעוצב ללקוחות, ומערכת בחירת תמונות אוטומטית
            שחוסכת לך זמן יקר.
          </p>

          <div className="animate-fade-up delay-400 w-full max-w-md">
            {submitState === "success" ? (
              <div
                className="animate-scale-in rounded-2xl border border-stone-200/80 bg-white/90 px-8 py-12 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] backdrop-blur-sm"
                role="status"
              >
                <SuccessCheckmark />
                <p className="font-display text-2xl font-medium text-stone-900 sm:text-3xl">
                  תודה, הפרטים שלך נקלטו בהצלחה!
                </p>
                <p className="mt-3 text-sm leading-relaxed text-stone-500">
                  שלחנו לך מייל אישור (בדוק/י בתיבת הדואר הנכנס).
                  <br />
                  נעדכן אותך עם קישור אישי למערכת ברגע ההשקה.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-stone-200/80 bg-white/85 p-6 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] backdrop-blur-sm sm:p-8">
                <form onSubmit={handleSubmit} noValidate>
                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="mb-2 block text-sm font-medium text-stone-700"
                      >
                        שם מלא
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        autoComplete="name"
                        value={form.fullName}
                        onChange={(e) =>
                          handleChange("fullName", e.target.value)
                        }
                        aria-invalid={!!errors.fullName}
                        aria-describedby={
                          errors.fullName ? "fullName-error" : undefined
                        }
                        className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-stone-900 transition-colors outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/15"
                      />
                      {errors.fullName && (
                        <p
                          id="fullName-error"
                          className="mt-1.5 text-sm text-red-500"
                          role="alert"
                        >
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-stone-700"
                      >
                        כתובת אימייל
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        dir="ltr"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        aria-invalid={!!errors.email}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                        className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-left text-stone-900 transition-colors outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/15"
                      />
                      {errors.email && (
                        <p
                          id="email-error"
                          className="mt-1.5 text-sm text-red-500"
                          role="alert"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {submitState === "error" && (
                    <p className="mt-4 text-sm text-red-500" role="alert">
                      משהו השתבש. נסי שוב בעוד רגע.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitState === "submitting"}
                    className="mt-7 w-full rounded-xl bg-amber-500 px-6 py-4 text-base font-bold text-white transition-all hover:bg-amber-600 focus:ring-2 focus:ring-amber-500/30 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitState === "submitting"
                      ? "שולח..."
                      : "תפסו מקום ברשימת ההמתנה (חודש מתנה בהשקה) 🚀"}
                  </button>

                  <p className="mt-3 text-center text-xs text-stone-400">
                    *ההרשמה לרשימת ההמתנה אינה מחייבת תשלום
                  </p>
                </form>
              </div>
            )}
          </div>

          <FeaturesGrid />
        </div>

        <footer className="animate-fade-up delay-400 mt-14 text-center sm:mt-16">
          <p className="text-xs text-stone-400">
            *ההרשמה לרשימת ההמתנה אינה מחייבת תשלום
          </p>
          <p className="mt-3 text-xs text-stone-400">
            © {new Date().getFullYear()} Studio Gallery. כל הזכויות שמורות.
          </p>
        </footer>
      </main>
    </div>
  );
}
