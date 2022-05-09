const DB: IDB = {
	bloggers: [],
	posts: []
  };

  interface IDB {
	[key: string]: IObjectId[];
  }

  export interface IObjectId {
	id: number;
  }  
  
  export { DB };