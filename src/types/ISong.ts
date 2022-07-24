export interface ISong {
  id: number;
  name: string;
  author: string;
  duration: number;
  src: string;
}

export class Song implements ISong {
  id: number;
  name: string;
  author: string;
  duration: number;
  src: string;

  constructor(
    id: number,
    name: string,
    author: string,
    duration: number,
    src: string
  ) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.duration = duration;
    this.src = src;
  }
}
