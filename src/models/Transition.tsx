export default class Transition {
  from: string;
  to: string;
  label: string;
  arrows: string = 'to';

  constructor(from: string, to: string, label: string) {
      this.from = from;
      this.to = to;
      this.label = label;
  }

  getId(): string {
    return `${this.from}-${this.to}`
  }
}
