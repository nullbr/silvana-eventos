import { EventTagType } from "./EventTag";
import { ImageType } from "./Image";

export type EventType = {
  title: string;
  slug: string;
  date: Date;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  eventImages: ImageType[];
  eventTags: EventTagType[];
};
