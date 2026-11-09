"use client";

import {
  Award,
  Book,
  BookOpen,
  Brain,
  Briefcase,
  ChartLine,
  Code2,
  Cloud,
  Database,
  FlaskConical,
  GitBranch,
  GraduationCap,
  Heart,
  LayoutDashboard,
  MessageSquare,
  Network,
  Play,
  Server,
  Shield,
  Sparkles,
  Trophy,
  Users,
  Wrench,
  School,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  award: Award,
  book: Book,
  bookOpen: BookOpen,
  brain: Brain,
  briefcase: Briefcase,
  chart: ChartLine,
  code: Code2,
  cloud: Cloud,
  database: Database,
  flask: FlaskConical,
  gitBranch: GitBranch,
  graduation: GraduationCap,
  heart: Heart,
  layout: LayoutDashboard,
  message: MessageSquare,
  network: Network,
  play: Play,
  server: Server,
  shield: Shield,
  sparkles: Sparkles,
  trophy: Trophy,
  users: Users,
  wrench: Wrench,
  school: School,
};

export function DynamicIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = iconMap[name] ?? Sparkles;
  return <Icon className={className} aria-hidden="true" />;
}
