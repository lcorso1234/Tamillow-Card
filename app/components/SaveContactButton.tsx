'use client';

type SaveContactButtonProps = {
  vcardLink: string;
  contactName: string;
  contactOrg: string;
  contactPhone: string;
};

const buildMessageTemplate = (contactName: string, contactOrg: string) =>
  `Hello ${contactName} at ${contactOrg}! I just saved your contact from the Tamillow card and would love to connect.`;

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

export default function SaveContactButton({
  vcardLink,
  contactName,
  contactOrg,
  contactPhone,
}: SaveContactButtonProps) {
  const handleClick = () => {
    triggerDownload(vcardLink, 'maureen-tamillow.vcf');
    openMessagingApp(contactPhone, buildMessageTemplate(contactName, contactOrg));
  };

  return (
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
  );
}
