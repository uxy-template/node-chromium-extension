import { render } from 'solid-js/web';
import { Option } from '@pages';

document.title = chrome.i18n.getMessage('pages_option');
const root = document.getElementById('root');
if (root) {
  render(() => <Option />, root);
}
