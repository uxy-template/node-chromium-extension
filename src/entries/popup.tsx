import { render } from 'solid-js/web';
import { Popup } from '@pages';

document.title = chrome.i18n.getMessage('pages_popup');
const root = document.getElementById('root');
if (root) {
  render(() => <Popup />, root);
}
