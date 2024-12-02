import { AES, enc, mode, pad } from 'crypto-js';

export const decode_ecb = (key: string, text: string) => {
  const key_bytes = enc.Utf8.parse(key);
  return AES.decrypt(text, key_bytes, {
    mode: mode.ECB,
    padding: pad.Pkcs7,
  }).toString(enc.Utf8);
};
