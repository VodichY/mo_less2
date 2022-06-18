import { ObjectId } from "mongodb";

interface IBlogger {
  _id?: ObjectId;
  name: string;
  youtubeUrl: string;
}

class Blogger {
  _id?: ObjectId;
  name: string;
  youtubeUrl: string;

  constructor(blogger: IBlogger) {
    this.name = blogger.name;
    this.youtubeUrl = blogger.youtubeUrl;
  }

  static toResponse(bloger: IBlogger) {
    const { _id, name, youtubeUrl } = bloger;
    return { id: _id, name, youtubeUrl };
  }
}

export { IBlogger, Blogger } 