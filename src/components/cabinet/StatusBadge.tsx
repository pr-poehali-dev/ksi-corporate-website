import {
  TASK_STATUSES,
  COMPANY_STATUSES,
  MODULE_STATUSES,
  KM_OPERATION_TYPES,
  TASK_PRIORITIES,
  STATUS_COLOR_MAP,
  type StatusConfig,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  type?: "task" | "company" | "module" | "km" | "priority";
  className?: string;
}

function getConfig(
  status: string,
  type: StatusBadgeProps["type"]
): StatusConfig | null {
  switch (type) {
    case "task":
      return TASK_STATUSES[status] ?? null;
    case "company":
      return COMPANY_STATUSES[status] ?? null;
    case "module":
      return MODULE_STATUSES[status] ?? null;
    case "km": {
      const km = KM_OPERATION_TYPES[status];
      return km ? { label: km.label, color: km.color } : null;
    }
    case "priority":
      return TASK_PRIORITIES[status] ?? null;
    default:
      return (
        TASK_STATUSES[status] ??
        COMPANY_STATUSES[status] ??
        MODULE_STATUSES[status] ??
        null
      );
  }
}

export default function StatusBadge({
  status,
  type = "task",
  className,
}: StatusBadgeProps) {
  const config = getConfig(status, type);

  if (!config) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
          "bg-zinc-500/10 text-zinc-400",
          className
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
        {status}
      </span>
    );
  }

  const colors = STATUS_COLOR_MAP[config.color] ?? STATUS_COLOR_MAP.gray;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        colors.bg,
        colors.text,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", colors.dot)} />
      {config.label}
    </span>
  );
}
