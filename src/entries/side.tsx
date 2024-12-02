import { render } from 'solid-js/web';
import { Side } from '@pages';

document.title = chrome.i18n.getMessage('pages_side');
const root = document.getElementById('root');
if (root) {
  render(() => <Side />, root);
}
