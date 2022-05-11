
interface IDB {
  bloggers: Array<IBlogger>;
  posts: Array<IPosts>;
}

export let dataDB1 = "1";

export const dataDB: IDB = {
  'bloggers': [],
  'posts': []
};

export interface IBlogger {
  id: number;
  name: string;
  youtubeUrl: string;
}

export interface IPosts {
  id: number,
  title: string,
  shortDescription: string,
  content: string,
  bloggerId: number
}  