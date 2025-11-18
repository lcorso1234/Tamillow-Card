import SaveContactButton from "./components/SaveContactButton";

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
    <div className="min-h-screen bg-[#2a3439] text-white">
      <main className="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-between px-6 py-10">
        <div className="space-y-10">
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-br from-[#1b252c] via-[#12181c] to-[#090c0f] opacity-80 blur-lg" />
            <div className="rounded-[32px] border border-white/5 bg-[radial-gradient(circle_at_top,_#2f3a40,_#151c21)] p-6 shadow-[0_25px_55px_rgba(0,0,0,0.75)]">
              <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-[#39FF14]/80 shadow-[0_0_12px_rgba(57,255,20,0.8)]" />
              <div className="space-y-5 text-center">
                <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">
                  {CONTACT_ORG}
                </p>
                <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
                  Become Competent, Confident, and Self-Aware.
                </h1>
                <p className="text-sm text-zinc-300">
                  You dictate the goal, and I help you shape it along the way.
                </p>
              </div>
              <div className="mt-8">
                <SaveContactButton
                  vcardLink={CTA_LINK}
                  contactName={CONTACT_NAME}
                  contactOrg={CONTACT_ORG}
                  contactPhone={CONTACT_PHONE}
                  contactEmail={CONTACT_EMAIL}
                  locations={LOCATIONS}
                />
              </div>
              <div className="mt-10 text-center text-[0.65rem] italic tracking-[0.35em] text-zinc-400">
                <p>Built in America, on earth.</p>
                <p className="mt-3 tracking-[0.2em]">
                  Making relationships built to last, the American Way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
