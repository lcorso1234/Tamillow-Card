import { readFileSync } from 'node:fs';
import path from 'node:path';

const CONTACT_NAME = 'Maureen Tamillow';
const CONTACT_ORG = 'Tamillow Institute';
const CONTACT_PHONE = '7082613028';
const CONTACT_EMAIL = 'info@maureentamillow.com';
const LOCATIONS = [
  {
    label: 'Oak Park',
    street: '1101 Lake Street',
    suite: 'Suite #401',
    city: 'Oak Park',
    state: 'IL',
    postalCode: '60301',
  },
  {
    label: 'Hinsdale',
    street: '15 Salt Creek Ln',
    suite: 'Suite #401',
    city: 'Hinsdale',
    state: 'IL',
    postalCode: '60521',
  },
];

const CONTACT_PHOTO_BASE64 = readFileSync(
  path.join(process.cwd(), 'public', 'Sun.png'),
).toString('base64');

const foldVcardLine = (line: string) => {
  const maxFirstLineLength = 75;
  const maxContinuedLineLength = 74;

  if (line.length <= maxFirstLineLength) {
    return line;
  }

  const chunks: string[] = [];
  let index = 0;

  while (index < line.length) {
    if (chunks.length === 0) {
      chunks.push(line.slice(index, index + maxFirstLineLength));
      index += maxFirstLineLength;
    } else {
      chunks.push(` ${line.slice(index, index + maxContinuedLineLength)}`);
      index += maxContinuedLineLength;
    }
  }

  return chunks.join('\r\n');
};

export async function GET() {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Tamillow;Maureen;;;',
    `FN:${CONTACT_NAME}`,
    `ORG:${CONTACT_ORG}`,
    `TEL;TYPE=CELL,VOICE:${CONTACT_PHONE}`,
    `EMAIL;TYPE=INTERNET:${CONTACT_EMAIL}`,
    foldVcardLine(`PHOTO;ENCODING=b;TYPE=PNG:${CONTACT_PHOTO_BASE64}`),
    'NOTE:Become Competent, Confident and Self-Aware.',
    ...LOCATIONS.map(
      ({ label, street, suite, city, state, postalCode }) =>
        `ADR;TYPE=WORK;LABEL="${label}":;;${street} ${suite};${city};${state};${postalCode};USA`,
    ),
    'END:VCARD',
  ].join('\r\n');

  return new Response(vcard, {
    headers: {
      'Content-Type': 'text/x-vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="maureen-tamillow.vcf"',
      'Cache-Control': 'no-store',
    },
  });
}
