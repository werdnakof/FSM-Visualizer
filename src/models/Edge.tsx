export default class Edge {
  from: number;
  to: number;
  alphabetId: number;
  label: string;

  constructor(from: number, to: number, alphabetId: number) {
      this.from = from;
      this.to = to;
      this.alphabetId = alphabetId;
  }

  getCode(): string {
    return `${this.from}-${this.to}`
  }
}
