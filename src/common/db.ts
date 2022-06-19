import { IBlogger } from "../resources/bloggers/bloggers.model";
import { IPost } from "../resources/posts/posts.model";


interface IDB {
  bloggers: Array<IBlogger>;
  posts: Array<IPost>;
}

export const dataDB: IDB = {
  'bloggers': [],
  'posts': []
};