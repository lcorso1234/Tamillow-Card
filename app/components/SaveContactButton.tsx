'use client';

type Location = {
  label: string;
  street: string;
  suite: string;
  city: string;
  state: string;
  postalCode: string;
};

type SaveContactButtonProps = {
  vcardLink: string;
  contactName: string;
  contactOrg: string;
  contactPhone: string;
  contactEmail: string;
  locations: Location[];
};

const formatDateForICS = (date: Date) =>
  date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

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

export default function SaveContactButton({
  vcardLink,
  contactName,
  contactOrg,
  contactPhone,
  contactEmail,
  locations,
}: SaveContactButtonProps) {
  const handleClick = () => {
    triggerDownload(vcardLink, 'maureen-tamillow.vcf');

    const now = new Date();
    const oneDayLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const reminderEnd = new Date(oneDayLater.getTime() + 30 * 60 * 1000);

    const locationLines = locations.map(
      ({ label, street, suite, city, state, postalCode }) =>
        `${label}: ${street} ${suite}, ${city}, ${state} ${postalCode}`,
    );

    const descriptionLines = [
      `Saved contact for ${contactName}`,
      contactOrg,
      `Phone: ${contactPhone}`,
      `Email: ${contactEmail}`,
      'Locations:',
      ...locationLines,
    ];

    const icsPayload = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Tamillow Institute//Contact Reminder//EN',
      'BEGIN:VEVENT',
      `UID:${now.getTime()}@tamillow-card`,
      `DTSTAMP:${formatDateForICS(now)}`,
      `DTSTART:${formatDateForICS(oneDayLater)}`,
      `DTEND:${formatDateForICS(reminderEnd)}`,
      `SUMMARY:Follow up with ${contactName}`,
      `DESCRIPTION:${descriptionLines.join('\\n')}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsPayload], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, 'tamillow-contact-reminder.ics', false);
    setTimeout(() => URL.revokeObjectURL(url), 0);
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
        + Calendar Reminder
      </span>
    </button>
  );
}
