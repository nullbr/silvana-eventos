import { EventTagType } from "./EventTag";
import { ImageType } from "./Image";
import { TagType } from "./Tag";

export type EventType = {
  id: string;
  title: string;
  slug: string;
  date: Date;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  eventImages: ImageType[];
  eventTags: EventTagType[];
};

export type EventWithTagsType = EventType & {
  tags: TagType[];
};
