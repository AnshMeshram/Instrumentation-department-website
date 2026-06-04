/**
 * Icon map for navigation config — avoids `import * as Icons` from lucide-react
 * which defeats tree-shaking and bloats the bundle by ~594 KB.
 *
 * Only the icons referenced in navigation.json are imported here.
 */
import {
  Building2,
  Users,
  FlaskConical,
  BookOpen,
  BadgeCheck,
  Mail,
  FileText,
  Calendar,
  Briefcase,
  TrendingUp,
  Activity,
  ClipboardList,
  Bell,
  HelpCircle,
} from "lucide-react";

const ICON_MAP = {
  Building2,
  Users,
  FlaskConical,
  BookOpen,
  BadgeCheck,
  Mail,
  FileText,
  Calendar,
  Briefcase,
  TrendingUp,
  Activity,
  ClipboardList,
  Bell,
  HelpCircle,
};

/**
 * Resolve an icon name string to its lucide-react component.
 * Falls back to HelpCircle if the name is not in the map.
 */
export function resolveIcon(name) {
  return ICON_MAP[name] || HelpCircle;
}

export default ICON_MAP;
