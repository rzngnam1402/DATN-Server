export function formatMoney(amount: string): string {
  const amountStr = amount;
  const reversedAmountStr = amountStr.split('').reverse().join('');
  const formattedReversedAmountStr = reversedAmountStr.replace(
    /(\d{3})(?=\d)/g,
    '$1.',
  );
  return formattedReversedAmountStr.split('').reverse().join('') + ' ';
}
type ScaleUnit = { limit: number; value: string };
type CurrencyDetails = { [key: string]: string };

const scale: ScaleUnit[] = [
  { limit: 1e12, value: 'trillion' },
  { limit: 1e9, value: 'billion' },
  { limit: 1e6, value: 'million' },
  { limit: 1e3, value: 'thousand' },
  { limit: 1e2, value: 'hundred' },
];

const tens = [
  '',
  'ten',
  'twenty',
  'thirty',
  'forty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety',
];
const ones = [
  '',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
];

const currencyNames: CurrencyDetails = {
  USD: 'US dollars',
  VND: 'Vietnamese dong',
};

function convertHundreds(num: number): string {
  const remainder = num % 100;
  const part = (num - remainder) / 100;
  const hundreds = part > 0 ? ones[part] + ' hundred ' : '';
  const rest =
    remainder < 20
      ? ones[remainder]
      : tens[Math.floor(remainder / 10)] +
        (remainder % 10 !== 0 ? ' ' + ones[remainder % 10] : '');
  return hundreds + rest;
}

function convert(num: number): string {
  if (num === 0) return 'zero';
  if (num < 0) return 'negative ' + convert(-num);

  const parts: string[] = [];
  for (const unit of scale) {
    if (num >= unit.limit) {
      parts.push(convert(Math.floor(num / unit.limit)) + ' ' + unit.value);
      num %= unit.limit;
    }
  }

  if (num > 0) {
    parts.push(convertHundreds(num));
  }

  return parts.join(' ').trim();
}

export function readMoney(
  value: number,
  currencyCode: keyof CurrencyDetails = 'USD',
): string {
  const currencyName = currencyNames[currencyCode] || currencyNames['USD'];
  return convert(value) + ' ' + currencyName;
}
