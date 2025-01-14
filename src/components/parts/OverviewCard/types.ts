export interface OverviewCardProps {
  icon: React.JSX.Element;
  total: number | string | null | undefined;
  category: string | null;
  isUser?: boolean;
}
