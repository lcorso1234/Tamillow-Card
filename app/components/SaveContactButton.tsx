'use client';

import { FormEvent, useState } from 'react';

type SaveContactButtonProps = {
  vcardLink: string;
  vcardIsDataUrl?: boolean;
  contactName: string;
  contactOrg: string;
  contactPhone: string;
};

type ShareFormState = {
  fullName: string;
  email: string;
  phone: string;
};

const triggerDownload = (href: string, filename: string, isDataUrl = true) => {
  const link = document.createElement('a');
  link.href = href;
  link.download = filename;

  if (!isDataUrl) {
    link.rel = 'noopener';
  }

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const openMessagingApp = (phoneNumber: string, message: string) => {
  const encodedMessage = encodeURIComponent(message);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const separator = isIOS ? '&' : '?';
  window.location.href = `sms:${phoneNumber}${separator}body=${encodedMessage}`;
};

const toBase64Url = (value: string) => {
  const bytes = new TextEncoder().encode(value);
  let binary = '';

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
};

const buildShareContactUrl = ({ fullName, email, phone }: ShareFormState) => {
  const payload = toBase64Url(JSON.stringify({ fullName, email, phone }));
  return `${window.location.origin}/api/shared-contact?data=${payload}`;
};

const buildMessageTemplate = (
  contactName: string,
  contactOrg: string,
  senderInfo: ShareFormState,
) => {
  const shareUrl = buildShareContactUrl(senderInfo);
  return [
    `Hello ${contactName} at ${contactOrg}!`,
    `My contact details are:`,
    `Email: ${senderInfo.email}`,
    `Phone: ${senderInfo.phone}`,
    `Save my contact: ${shareUrl}`,
  ].join('\n');
};

export default function SaveContactButton({
  vcardLink,
  vcardIsDataUrl = true,
  contactName,
  contactOrg,
  contactPhone,
}: SaveContactButtonProps) {
  const [showForm, setShowForm] = useState(false);
  const [formState, setFormState] = useState<ShareFormState>({
    fullName: '',
    email: '',
    phone: '',
  });

  const handleClick = () => {
    triggerDownload(vcardLink, 'maureen-tamillow.vcf', vcardIsDataUrl);
    // Wait for the save-contact download to start, then prompt for sender info.
    setTimeout(() => {
      setShowForm(true);
    }, 500);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    openMessagingApp(
      contactPhone,
      buildMessageTemplate(contactName, contactOrg, formState),
    );
    setShowForm(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="cta-wiggle group mt-8 flex flex-col items-center justify-center gap-1 rounded-2xl border border-[#39FF14] bg-[#39FF14] px-6 py-4 text-black shadow-[0_12px_35px_rgba(57,255,20,0.45)] transition hover:shadow-[0_18px_45px_rgba(57,255,20,0.55)] active:scale-[0.98]"
      >
        <span className="text-lg font-semibold tracking-wide transition group-active:translate-y-[1px]">
          Save Contact
        </span>
        <span className="text-xs uppercase tracking-[0.35em] text-black/60 group-active:translate-y-[1px]">
          + Text Tamillow
        </span>
      </button>

      {showForm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm space-y-4 rounded-2xl border border-white/15 bg-[#131a1f] p-5 text-left"
          >
            <h2 className="text-lg font-semibold text-white">Text Your Details</h2>
            <p className="text-sm text-zinc-300">
              Fill this out to create a shareable contact link in your SMS.
            </p>

            <label className="block text-sm text-zinc-200">
              Full Name
              <input
                required
                type="text"
                value={formState.fullName}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, fullName: event.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-white/15 bg-[#0f1418] px-3 py-2 text-white outline-none focus:border-[#39FF14]"
              />
            </label>

            <label className="block text-sm text-zinc-200">
              Email
              <input
                required
                type="email"
                value={formState.email}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, email: event.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-white/15 bg-[#0f1418] px-3 py-2 text-white outline-none focus:border-[#39FF14]"
              />
            </label>

            <label className="block text-sm text-zinc-200">
              Phone
              <input
                required
                type="tel"
                value={formState.phone}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, phone: event.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-white/15 bg-[#0f1418] px-3 py-2 text-white outline-none focus:border-[#39FF14]"
              />
            </label>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="w-1/2 rounded-lg border border-white/20 px-3 py-2 text-sm text-zinc-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 rounded-lg border border-[#39FF14] bg-[#39FF14] px-3 py-2 text-sm font-semibold text-black"
              >
                Open SMS
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}
