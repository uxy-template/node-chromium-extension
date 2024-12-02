import { AES, enc, mode, pad } from 'crypto-js';

export const encode_ecb = (key: string, text: string) => {
  const key_bytes = enc.Utf8.parse(key);
  return AES.encrypt(text, key_bytes, {
    mode: mode.ECB,
    padding: pad.Pkcs7,
  }).toString();
};
