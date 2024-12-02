import { createSignal } from 'solid-js';
import '@assets/styles/pages/option.css';

export interface Preference {
  theme: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
  language: 'zh_CN' | 'en_US';
}

export interface OptionProps {
  preference?: Preference;
  editing?: boolean;
}

export const Option = (props: OptionProps) => {
  const [themeEditing, setThemeEditing] = createSignal<boolean>(
    props.editing || false,
  );
  const [fontSizeEditing, setFontSizeEditing] = createSignal<boolean>(
    props.editing || false,
  );
  const [languageEditing, setLanguageEditing] = createSignal<boolean>(
    props.editing || false,
  );
  const [preference, setPreference] = createSignal<Preference>(
    props.preference || {
      theme: 'light',
      fontSize: 'medium',
      language: 'zh_CN',
    },
  );
  const handleThemeChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.value === 'light' || target.value === 'dark') {
      setPreference((prev) => ({
        ...prev,
        theme: target.value === 'light' ? 'light' : 'dark',
      }));
    }
  };
  const handleFontSizeChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.value === 'light' || target.value === 'dark') {
      setPreference((prev) => ({
        ...prev,
        theme: target.value === 'light' ? 'light' : 'dark',
      }));
    }
  };
  const handleLanguageChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.value === 'light' || target.value === 'dark') {
      setPreference((prev) => ({
        ...prev,
        theme: target.value === 'light' ? 'light' : 'dark',
      }));
    }
  };
  return (
    <div class={`uxy-chromium-plugin-option`}>
      <div class={`theme`}>
        <label for="theme"></label>
        <input
          disabled={!themeEditing()}
          type="radio"
          name="theme"
          value="light"
          checked={preference().theme === 'light'}
          onChange={handleThemeChange}
        />
        Light
        <input
          disabled={!themeEditing()}
          type="radio"
          name="theme"
          value="dark"
          checked={preference().theme === 'dark'}
          onChange={handleThemeChange}
        />
        Dark
        <button onClick={() => setThemeEditing((prevent) => !prevent)}>
          {themeEditing() ? '保存' : '修改'}
        </button>
      </div>

      <div class={`font-size`}>
        <label for="font-size"></label>
        <input
          disabled={!fontSizeEditing()}
          type="radio"
          name="font-size"
          value="small"
          checked={preference().fontSize === 'small'}
          onChange={handleFontSizeChange}
        />
        Small
        <input
          disabled={!fontSizeEditing()}
          type="radio"
          name="font-size"
          value="medium"
          checked={preference().fontSize === 'medium'}
          onChange={handleFontSizeChange}
        />
        Medium
        <input
          disabled={!fontSizeEditing()}
          type="radio"
          name="font-size"
          value="large"
          checked={preference().fontSize === 'large'}
          onChange={handleFontSizeChange}
        />
        Large
        <button onClick={() => setFontSizeEditing((prevent) => !prevent)}>
          {fontSizeEditing() ? '保存' : '修改'}
        </button>
      </div>

      <div class={`language`}>
        <label for="language"></label>
        <input
          disabled={!languageEditing()}
          type="radio"
          name="language"
          value="zh_CN"
          checked={preference().language === 'zh_CN'}
          onChange={handleLanguageChange}
        />
        Light
        <input
          disabled={!languageEditing()}
          type="radio"
          name="language"
          value="en_US"
          checked={preference().language === 'en_US'}
          onChange={handleLanguageChange}
        />
        Dark
        <button onClick={() => setLanguageEditing((prevent) => !prevent)}>
          {languageEditing() ? '保存' : '修改'}
        </button>
      </div>
    </div>
  );
};
