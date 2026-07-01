import {
  Search,
  Package,
  Settings,
  GraduationCap,
  Brain,
  Link,
  Cpu,
  Code,
  Smartphone,
  Globe,
  Database,
  Radio,
  BarChart3,
} from 'lucide-react';

export const SERVICE_ICON_MAP = {
  Search,
  Package,
  Settings,
  GraduationCap,
  Brain,
  Link,
  Cpu,
  Code,
  Smartphone,
  Globe,
  Database,
  Radio,
  BarChart3,
};

export const PILLAR_ICON_MAP = {
  research: Search,
  product: Package,
  engineering: Settings,
  talent: GraduationCap,
};

export const getServiceIcon = (name, fallback = Search) => SERVICE_ICON_MAP[name] || fallback;

export const getPillarIcon = (id, fallback = Search) => PILLAR_ICON_MAP[id] || fallback;
