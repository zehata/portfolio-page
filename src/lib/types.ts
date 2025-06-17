import { Dictionary } from "lodash";

export interface ArticleItem {
  id: string;
  title: string;
}

export interface Article {
  id: string;
  title: string;
  created: string;
  modified: string;
  content: string;
  stamps: Stamps;
}

export enum ArticleType {
  Blog = 0,
  Project = 1,
}

export const tables = ["blogs", "projects"];
export const stampsTables = ["blogs_stamps", "projects_stamps"];

export const stampIcon = [
  "Pause",
  "FastForward",
  "Check",
  "Lightbulb",
  "DraftingCompass",
  "Construction",
  "BugPlay",
  "Rocket",
  "PawPrint",
] as const;
export type StampIcon = (typeof stampIcon)[number];

export interface Stamp {
  id: string;
  label: string;
  value: string;
  color: string;
  icon: StampIcon;
}

export type Stamps = Dictionary<Stamp>;
