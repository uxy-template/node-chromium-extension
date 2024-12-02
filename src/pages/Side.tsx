import { createSignal } from 'solid-js';
import '@assets/styles/pages/side.css';

export interface User {
  name?: string;
  avatar?: string;
  age?: number;
  email?: string;
}

export interface SideProps {
  user?: User;
}

export const Side = (props: SideProps) => {
  const [user, setUser] = createSignal<User>(
    props.user || {
      name: '',
      avatar: '',
      age: 0,
      email: '',
    },
  );
  const [action, setAction] = createSignal<'sign-in' | 'sign-up'>('sign-in');

  const handleUserChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSignIn = () => {
    if (user()) {
    }
  };
  const handleSignUp = () => {
    if (user()) {
    }
  };
  return (
    <div class={`uxy-chromium-plugin-side`}>
      <div class={`action`}>
        <div onClick={() => setAction('sign-in')}>登录</div>
        <div onClick={() => setAction('sign-up')}>注册</div>
      </div>
      <div class={`sign-in ${action() === 'sign-in' ? 'show' : 'hide'}`}>
        <label for="username">姓名：</label>
        <input name="username" type="text" onChange={handleUserChange} />
        <label for="password">密码：</label>
        <input name="password" type="password" onChange={handleUserChange} />
        <button onClick={handleSignIn}>登录</button>
      </div>
      <div class={`sign-up ${action() === 'sign-up' ? 'show' : 'hide'}`}>
        <label for="username">姓名：</label>
        <input name="username" type="text" onChange={handleUserChange} />
        <label for="password">密码：</label>
        <input name="password" type="password" onChange={handleUserChange} />
        <label for="email">邮箱：</label>
        <input name="email" type="email" onChange={handleUserChange} />
        <button onClick={handleSignUp}>注册</button>
      </div>
    </div>
  );
};
