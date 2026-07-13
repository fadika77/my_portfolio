import { Badge } from '@/components/ui/Badge';

export function TechBadge({ label }: { label: string }) {
  return <Badge className="hover:border-accent/60 hover:text-text-main transition-colors">{label}</Badge>;
}
