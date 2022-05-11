import uuid  from "uuid-int";
const generator = uuid(0);

interface IPost {
  id: number;
  title: string;
  shortDescription: string;
  content: string;
  bloggerId: number;
}

class Post {
  id: number;
	title: string;
	shortDescription: string;
	content: string;
  bloggerId: number;

  constructor(post: { title: string; shortDescription: string; content: string; bloggerId: number;}) {
    this.id = generator.uuid();
    this.title = post.title; 
    this.shortDescription = post.shortDescription;
    this.content = post.content;
    this.bloggerId = post.bloggerId;
  }

  static toResponse(bloger: IPost) {
    const {id, title, shortDescription, content, bloggerId } = bloger;
    return {id, title, shortDescription, content, bloggerId };
  }
}

export { IPost, Post } 