const CONTACT_NAME = "Maureen Tamillow";
const CONTACT_ORG = "Tamillow Institute";
const CONTACT_PHONE = "7082613028";
const CONTACT_EMAIL = "info@maureentamillow.com";

const LOCATIONS = [
  {
    label: "Oak Park",
    street: "1101 Lake Street",
    suite: "Suite #401",
    city: "Oak Park",
    state: "IL",
    postalCode: "60301",
  },
  {
    label: "Hinsdale",
    street: "15 Salt Creek Ln",
    suite: "Suite #401",
    city: "Hinsdale",
    state: "IL",
    postalCode: "60521",
  },
];

const VCARD = encodeURIComponent(
  [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${CONTACT_NAME}`,
    `ORG:${CONTACT_ORG}`,
    `TEL;TYPE=CELL:${CONTACT_PHONE}`,
    `EMAIL;TYPE=INTERNET:${CONTACT_EMAIL}`,
    "NOTE:Become Competent, Confident and Self-Aware.",
    ...LOCATIONS.map(
      ({ label, street, suite, city, state, postalCode }) =>
        `ADR;TYPE=WORK;LABEL="${label}":;;${street} ${suite};${city};${state};${postalCode};USA`,
    ),
    "END:VCARD",
  ].join("\n"),
);

const CTA_LINK = `data:text/vcard;charset=utf-8,${VCARD}`;

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#090c0f] via-[#0f1417] to-[#181f25] text-white">
      <main className="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-between px-6 py-10">
        <div className="space-y-10">
          <div className="space-y-4 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">
              {CONTACT_ORG}
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white">
              Become Competent, Confident, and Self-Aware.
            </h1>
            <p className="text-sm text-zinc-300">
              You dictate the goal, and I help you shape it along the way.
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-br from-[#1b252c] via-[#12181c] to-[#090c0f] opacity-80 blur-lg" />
            <div className="rounded-[32px] border border-white/5 bg-[radial-gradient(circle_at_top,_#2f3a40,_#151c21)] p-6 shadow-[0_25px_55px_rgba(0,0,0,0.75)]">
              <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-[#39FF14]/80 shadow-[0_0_12px_rgba(57,255,20,0.8)]" />
              <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">
                Contact
              </p>
              <div className="mt-4 space-y-5 text-sm">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/40">
                  <p className="text-[0.65rem] uppercase tracking-[0.4em] text-zinc-400">
                    Name
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">{CONTACT_NAME}</p>
                  <p className="text-zinc-400">{CONTACT_ORG}</p>
                </div>
                <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/40">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.4em] text-zinc-400">
                      Phone
                    </p>
                    <a className="mt-1 block text-base font-medium text-white" href={`tel:${CONTACT_PHONE}`}>
                      (708) 261-3028
                    </a>
                  </div>
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.4em] text-zinc-400">
                      Email
                    </p>
                    <a
                      className="mt-1 block text-base font-medium text-white"
                      href={`mailto:${CONTACT_EMAIL}`}
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/40">
                  <p className="text-[0.65rem] uppercase tracking-[0.4em] text-zinc-400">
                    Locations
                  </p>
                  <div className="mt-3 space-y-3 text-zinc-300">
                    {LOCATIONS.map(({ label, street, suite, city, state, postalCode }) => (
                      <div key={label}>
                        <p className="text-sm font-semibold text-white">{label}</p>
                        <p className="text-xs">
                          {street}, {suite}
                        </p>
                        <p className="text-xs">
                          {city}, {state} {postalCode}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <a
                className="cta-wiggle group mt-8 flex flex-col items-center justify-center gap-1 rounded-2xl border border-[#39FF14] bg-[#39FF14] px-6 py-4 text-black shadow-[0_12px_35px_rgba(57,255,20,0.45)] transition hover:shadow-[0_18px_45px_rgba(57,255,20,0.55)] active:scale-[0.98]"
                href={CTA_LINK}
                download="maureen-tamillow.vcf"
              >
                <span className="text-lg font-semibold tracking-wide transition group-active:translate-y-[1px]">
                  Save Contact
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-[0.65rem] italic tracking-[0.35em] text-zinc-400">
          <p>Built in America, on earth.</p>
          <p className="mt-3 tracking-[0.2em]">
            Making relationships built to last, the American Way.
          </p>
        </div>
      </main>
    </div>
  );
}
