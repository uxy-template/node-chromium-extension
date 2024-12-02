export interface SvgAvatarProps {
  text?: string;
}
const randomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const a = Math.random();
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
const randomCharPair = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const index1 = Math.floor(Math.random() * chars.length);
  const index2 = Math.floor(Math.random() * chars.length);
  return `${chars[index1]}${chars[index2]}`;
};
export const SvgAvatar = (props: SvgAvatarProps) => {
  const text =
    props.text && props.text.replace(/\s/g, '').length > 0
      ? props.text[0]
      : randomCharPair();
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill={randomColor()} />
      <text
        x="50"
        y="50"
        text-anchor="middle"
        dy=".3em"
        fill="white"
        font-size="40"
      >
        {text}
      </text>
    </svg>
  );
};
