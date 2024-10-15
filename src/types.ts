export type Characters = {
  id: string;
  race: string;
  name: string;
  className: string;
  level: number;
  createdAt: string;
}[];

export type Character = {
  id: string;
  race: string;
  name: string;
  className: string;
  level: number;
  createdAt: string;
};

export type Links = {
  name: string;
  path: string;
}[];
