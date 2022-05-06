import uuid  from "uuid-int";
const generator = uuid(0);

interface IBlogger {
		id: number;
		name: string;
		youtubeUrl: string;
  }

class Blogger {
	id: number;
	name: string;
	youtubeUrl: string;

  constructor(blogger: IBlogger) {
    this.id = generator.uuid();
    this.name = blogger.name;
    this.youtubeUrl = blogger.youtubeUrl;
  }
}

export { Blogger };