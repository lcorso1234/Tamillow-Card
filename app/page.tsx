const CONTACT_NAME = "Maureen Tamillow";
const CONTACT_ORG = "Tamillow Institute";
const CONTACT_PHONE = "7082613028";
const CONTACT_EMAIL = "info@mtamillowtherapy.com";

const VCARD = encodeURIComponent(
  [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${CONTACT_NAME}`,
    `ORG:${CONTACT_ORG}`,
    `TEL;TYPE=CELL:${CONTACT_PHONE}`,
    `EMAIL;TYPE=INTERNET:${CONTACT_EMAIL}`,
    "END:VCARD",
  ].join("\n"),
);

const CTA_LINK = `data:text/vcard;charset=utf-8,${VCARD}`;

export default function Home() {
  return (
    <div className="min-h-screen text-white">
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-between px-6 py-10">
        <div className="space-y-8">
          <div className="space-y-4 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">
              {CONTACT_ORG}
            </p>
            <h1 className="text-4xl font-semibold leading-tight">
              Become Competent, Confident, and Self - Aware.
            </h1>
            <p className="text-base text-zinc-300">
              You dictate the goal, and I help you shape it along the way.
            </p>
          </div>
          <div className="rounded-3xl border border-white/20 bg-white/5 p-6 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.4em] text-zinc-400">
              Contact
            </p>
            <div className="mt-4 space-y-3 text-lg">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
                  Name
                </p>
                <p className="font-medium text-white">{CONTACT_NAME}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
                  Phone
                </p>
                <a className="font-medium text-white" href={`tel:${CONTACT_PHONE}`}>
                  (708) 261-3028
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
                  Email
                </p>
                <a
                  className="font-medium text-white"
                  href={`mailto:${CONTACT_EMAIL}`}
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
            <a
              className="mt-8 flex h-14 items-center justify-center rounded-2xl border border-white bg-white text-black transition hover:bg-transparent hover:text-white"
              href={CTA_LINK}
              download="maureen-tamillow.vcf"
            >
              Save Contact
            </a>
          </div>
        </div>
        <div className="mt-10 text-center text-xs uppercase tracking-[0.5em] text-zinc-500">
          {CONTACT_ORG}
        </div>
      </main>
    </div>
  );
}
