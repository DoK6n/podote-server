type Literal = string | number | boolean | undefined | null | void | object;

interface ObjectMark {
  type: string;
  attrs?: Record<string, Literal>;
}

export class RemirrorJSON {
  type: string;
  marks?: Array<ObjectMark | string>;
  text?: string;
  content?: RemirrorJSON[];
  attrs?: Record<string, Literal>;
}
