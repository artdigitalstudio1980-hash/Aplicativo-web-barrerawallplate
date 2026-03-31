import bwipjs from 'bwip-js';

export type BarcodeFormat = 'ean13' | 'code128' | 'qrcode';

interface BarcodeOptions {
  text: string;
  format?: BarcodeFormat;
  scale?: number;
  height?: number;
  includeText?: boolean;
}

/**
 * Generates a barcode as a PNG buffer
 */
export async function generateBarcode(options: BarcodeOptions): Promise<Buffer> {
  const { text, format = 'code128', scale = 3, height = 10, includeText = true } = options;

  const buffer = await bwipjs.toBuffer({
    bcid: format,
    text: text,
    scale: scale,
    height: height,
    includetext: includeText,
    textxalign: 'center',
    backgroundcolor: 'FFFFFF',
  });

  return buffer;
}

/**
 * Generates a barcode as a base64 data URI
 */
export async function generateBarcodeDataUri(options: BarcodeOptions): Promise<string> {
  const buffer = await generateBarcode(options);
  return `data:image/png;base64,${buffer.toString('base64')}`;
}

/**
 * Generates a unique EAN-13 code with check digit
 */
export function generateEAN13(prefix: string = '200'): string {
  // Prefix (3) + random (9) + check digit (1) = 13
  const random = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  const partial = prefix + random;
  const checkDigit = calculateEAN13CheckDigit(partial);
  return partial + checkDigit;
}

/**
 * Generates a unique SKU-based Code128
 */
export function generateCode128(prefix: string = 'BWP'): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

function calculateEAN13CheckDigit(partial: string): string {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(partial[i]);
    sum += i % 2 === 0 ? digit : digit * 3;
  }
  const check = (10 - (sum % 10)) % 10;
  return check.toString();
}
