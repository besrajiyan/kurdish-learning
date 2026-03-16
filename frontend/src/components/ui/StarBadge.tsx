interface Props {
  count: number;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = { sm: 'text-sm', md: 'text-base', lg: 'text-2xl' };

export default function StarBadge({ count, size = 'md' }: Props) {
  return (
    <span className={`inline-flex items-center gap-1 font-bold text-accent ${sizes[size]}`}>
      ★ {count}
    </span>
  );
}
