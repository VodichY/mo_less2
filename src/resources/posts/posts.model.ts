import { ObjectId } from "mongodb";

interface IPost {
  _id?: ObjectId;
  title: string;
  shortDescription: string;
  content: string;
  bloggerId: number;
}

class Post {
  _id?: ObjectId;
	title: string;
	shortDescription: string;
	content: string;
  bloggerId: number;

  constructor(post: IPost) {
    this.title = post.title; 
    this.shortDescription = post.shortDescription;
    this.content = post.content;
    this.bloggerId = post.bloggerId;
  }

  static toResponse(blogger: IPost) {
    const {_id, title, shortDescription, content, bloggerId } = blogger;
    return {id: _id, title, shortDescription, content, bloggerId };
  }
}

export { IPost, Post } 