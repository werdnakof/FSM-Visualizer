export default class Transition {
  from: number;
  to: number;
  alphabetId: number;
  label: string;
  arrows: string = 'to';

  constructor(from: number, to: number, alphabetId: number) {
      this.from = from;
      this.to = to;
      this.alphabetId = alphabetId;
  }

  getId(): string {
    return `${this.from}-${this.to}`
  }
}
