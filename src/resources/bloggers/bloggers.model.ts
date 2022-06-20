import { ObjectId } from "mongodb";
import uuid  from "uuid-int";
const generator = uuid(0);

interface IBlogger {
  _id?: ObjectId;
  id?: number;
  name: string;
  youtubeUrl: string;
}

class Blogger {
  _id?: ObjectId;
  id?: number;
  name: string;
  youtubeUrl: string;

  constructor(blogger: IBlogger) {
    this.id = generator.uuid();
    this.name = blogger.name;
    this.youtubeUrl = blogger.youtubeUrl;
  }

  static toResponse(bloger: IBlogger) {
    const { id, name, youtubeUrl } = bloger;
    return { id, name, youtubeUrl };
  }

  static pagination(result: { bloggers: IBlogger[]; bloggersCount: number; pagesCount: number; pageNumber: number; pageSize: number  }) {
    return {
      pagesCount: result.pagesCount,
      page: result.pageNumber,
      pageSize: result.pageSize, 
      totalCount: result.bloggersCount, 
      items: result.bloggers.map((elem) => Blogger.toResponse(elem))
    }
  }
}

export { IBlogger, Blogger } 