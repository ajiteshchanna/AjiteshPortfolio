export type SystemMonitorMetric = {
  label: string;
  value: number;
};

export type SystemMonitorData = {
  headerLine: string;
  onlineLabel: string;
  metrics: SystemMonitorMetric[];
  currentProcessLabel: string;
  currentProcess: string;
  activeModulesLabel: string;
  activeModules: string[];
  locationLabel: string;
  location: string;
  statusLabel: string;
  statusText: string;
  statusValue: number;
};

export const SYSTEM_MONITOR: SystemMonitorData = {
  headerLine: "┌─ AJITESH SYSTEM MONITOR ───────────────┐",
  onlineLabel: "SYSTEM ONLINE",
  metrics: [
    { label: "AGE", value: 21 },
    { label: "AI CORE", value: 91 },
    { label: "CREATIVITY", value: 100 },
  ],
  currentProcessLabel: "CURRENT PROCESS",
  currentProcess: "building intelligent systems",
  activeModulesLabel: "ACTIVE MODULES",
  activeModules: ["RAG", "LLM", "AI AGENTS", "DATA", "AUTOMATION"],
  locationLabel: "LOCATION",
  location: "INDIA / UTC+5:30",
  statusLabel: "STATUS",
  statusText: "READY",
  statusValue: 100,
};
