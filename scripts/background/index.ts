import { decode_ecb } from '@background/module-background';

chrome.runtime.onMessage.addListener(async (request, _sender, sendResponse) => {
  if (request.action === 'decode_ecb') {
    const result = decode_ecb(request.key, request.text);
    console.log(request, result);
    sendResponse(result);
  }
});
