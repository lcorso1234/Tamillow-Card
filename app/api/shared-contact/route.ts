import { readFileSync } from 'node:fs';
import path from 'node:path';

const escapeVcardValue = (value: string) =>
  value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');

const onlyDigitsPlus = (value: string) => value.replace(/[^\d+]/g, '');

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

const CONTACT_PHOTO_BASE64 = readFileSync(
  path.join(process.cwd(), 'public', 'Sun.png'),
).toString('base64');

const buildVcard = (fullName: string, email: string, phone: string) => {
  const safeName = escapeVcardValue(fullName);
  const safeEmail = escapeVcardValue(email);
  const safePhone = escapeVcardValue(onlyDigitsPlus(phone));

  const nameParts = fullName.trim().split(/\s+/);
  const givenName = nameParts.shift() || fullName;
  const familyName = nameParts.join(' ');

  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escapeVcardValue(familyName)};${escapeVcardValue(givenName)};;;`,
    `FN:${safeName}`,
    `TEL;TYPE=CELL,VOICE:${safePhone}`,
    `EMAIL;TYPE=INTERNET:${safeEmail}`,
    foldVcardLine(`PHOTO;ENCODING=b;TYPE=PNG:${CONTACT_PHOTO_BASE64}`),
    'END:VCARD',
  ].join('\r\n');
};

const decodeBase64Url = (value: string) => {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const withPadding = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
  return Buffer.from(withPadding, 'base64').toString('utf8');
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const encodedData = searchParams.get('data');
  let fullName = (searchParams.get('fullName') || '').trim();
  let email = (searchParams.get('email') || '').trim();
  let phone = (searchParams.get('phone') || '').trim();

  if (encodedData) {
    try {
      const decoded = JSON.parse(decodeBase64Url(encodedData)) as {
        fullName?: string;
        email?: string;
        phone?: string;
      };
      fullName = (decoded.fullName || '').trim();
      email = (decoded.email || '').trim();
      phone = (decoded.phone || '').trim();
    } catch {
      return new Response('Invalid data payload.', { status: 400 });
    }
  }

  if (!fullName || !email || !phone) {
    return new Response('Missing fullName, email, or phone parameter.', { status: 400 });
  }

  const vcard = buildVcard(fullName, email, phone);
  const safeFilename = fullName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  return new Response(vcard, {
    headers: {
      'Content-Type': 'text/x-vcard; charset=utf-8',
      'Content-Disposition': `attachment; filename="${safeFilename || 'contact'}.vcf"`,
      'Cache-Control': 'no-store',
    },
  });
}
