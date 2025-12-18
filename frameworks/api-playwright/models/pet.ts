export type Pet = {
  id: number;
  name: string;
  photoUrls: string[];
  tags?: { id: number; name: string }[];
  status: string;
};
