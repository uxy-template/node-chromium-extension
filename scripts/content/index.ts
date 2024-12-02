import { encode_ecb } from '@content/module-content';

chrome.runtime.sendMessage(
  {
    action: 'decode_ecb',
    key: '1234567890123456',
    text: encode_ecb!('1234567890123456', 'Hello World!'),
  },
  (response) => {
    console.log(response);
  },
);
