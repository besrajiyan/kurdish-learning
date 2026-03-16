interface Props {
  mood?: 'happy' | 'excited' | 'thinking' | 'sad';
  size?: 'sm' | 'md' | 'lg';
}

const MOODS: Record<string, string> = {
  happy: '🦋',
  excited: '🌟',
  thinking: '🦉',
  sad: '🐣',
};

const SIZES = { sm: 'text-4xl', md: 'text-6xl', lg: 'text-8xl' };

export default function Mascot({ mood = 'happy', size = 'md' }: Props) {
  return (
    <span className={`${SIZES[size]} float inline-block select-none`} role="img">
      {MOODS[mood]}
    </span>
  );
}
