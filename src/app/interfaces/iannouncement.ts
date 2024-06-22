import { IProfile } from './iprofile';

export interface IAnnouncement {
  _id: string;
  user: IProfile;
  title: string;
  description: string;
  category: string;
  price?: number | null;
  image?: BufferImage;
  isOnHold: boolean;
  onHoldUntil: string;
  onHoldBy: IProfile | null;
  created_at: string;
  imageUrl: string;
}

export interface BufferImage {
  data: number[];
}
