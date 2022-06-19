import { ObjectId } from "mongodb";
import uuid  from "uuid-int";
const generator = uuid(0);


interface IPost {
  _id?: ObjectId;
  id?: number;
  title: string;
  shortDescription: string;
  content: string;
  bloggerId: number;
  bloggerName?: string;
}

class Post {
  _id?: ObjectId;
  id?: number;
	title: string;
	shortDescription: string;
	content: string;
  bloggerId: number;
  bloggerName?: string;

  constructor(post: IPost) {
    this.id = generator.uuid();
    this.title = post.title; 
    this.shortDescription = post.shortDescription;
    this.content = post.content;
    this.bloggerId = post.bloggerId;
    this.bloggerName = post.bloggerName;
  }

  static toResponse(post: IPost) {
    const {id, title, shortDescription, content, bloggerId , bloggerName} = post;
    return {id, title, shortDescription, content, bloggerId, bloggerName};
  }
}

export { IPost, Post } 