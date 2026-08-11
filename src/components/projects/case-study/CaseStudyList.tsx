interface CaseStudyListProps {
  items: string[];
}

export function CaseStudyList({ items }: CaseStudyListProps) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="type-body text-fg-muted">
          {item}
        </li>
      ))}
    </ul>
  );
}
