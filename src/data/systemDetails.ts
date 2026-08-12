export type SystemDetailItem = {
  key: "status" | "location" | "focus" | "availability";
  label: string;
  value: string;
};

export const SYSTEM_DETAILS: SystemDetailItem[] = [
  {
    key: "status",
    label: "System Status",
    value: "Online",
  },
  {
    key: "location",
    label: "Location",
    value: "India",
  },
  {
    key: "focus",
    label: "Focus",
    value: "AI Engineering",
  },
  {
    key: "availability",
    label: "Available For",
    value: "Opportunities",
  },
];
