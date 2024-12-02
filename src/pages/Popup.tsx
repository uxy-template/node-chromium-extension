import { createEffect, createSignal } from 'solid-js';
import { IconLeft, IconLogin, IconLogout, IconRight } from '@icons';
import { SvgAvatar } from '@components';
import { Preference, User } from '@pages';
import '@assets/styles/pages/popup.css';

export interface PopupProps {
  user?: User;
  preference?: Preference;
}

export const Popup = (props: PopupProps) => {
  const [collapsed, setCollapsed] = createSignal<boolean>(false);
  const [login, setLogin] = createSignal<boolean>(false);
  const [user, setUser] = createSignal<User>(
    props.user || {
      name: '张三',
      avatar: '',
      age: 18,
    },
  );
  const [preference] = createSignal<Preference>(
    props.preference ||
      ({
        theme: 'light',
        fontSize: 'medium',
        language: 'zh-CN',
      } as any),
  );

  const renderCollapseAction = () => {
    return collapsed() ? <IconLeft /> : <IconRight />;
  };

  const renderLoginAction = () => {
    return login() ? <IconLogout /> : <IconLogin />;
  };

  const renderAvatar = () => {
    if (user().avatar && /https?:\/\/.*/.test(user().avatar!)) {
      return <img src={user().avatar} alt={'avatar'} />;
    } else {
      return <SvgAvatar text={user().name} />;
    }
  };

  createEffect(() => {
    if (!login()) {
      setUser({
        name: '',
        avatar: '',
        age: 0,
      });
    }
  });

  return (
    <div class={`uxy-chromium-plugin-popup`}>
      <div class={`content`}>
        <div class={`theme`}>
          <label>主题：</label>
          <label>{preference().theme === 'light' ? '浅色' : '深色'}</label>
        </div>
        <div class={`font-size`}>
          <label>字号：</label>
          <label>{preference().fontSize}</label>
        </div>
        <div class={`language`}>
          <label>语言：</label>
          <label>{preference().language}</label>
        </div>
      </div>
      <div class={`profile${collapsed() ? ' collapsed' : ''}`}>
        <div class={`action`}>
          <div
            class={`collapse`}
            onClick={() => setCollapsed((prevent) => !prevent)}
          >
            {renderCollapseAction()}
          </div>
          <div class={`login`} onClick={() => setLogin((prevent) => !prevent)}>
            {renderLoginAction()}
          </div>
        </div>
        <div class={`avatar`}>{renderAvatar()}</div>
        <div class={`name`}>{user().name}</div>
        <div class={`age`}>{user().age}</div>
      </div>
    </div>
  );
};

export default Popup;
