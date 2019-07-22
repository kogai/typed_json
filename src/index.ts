import { format } from "prettier";

const jsonObj = {
  a: "a",
  b: 2,
  c: true,
  d: null,
  e: undefined,
  f: [0, 1],
  g: {
    a: "a",
    b: 2,
    c: true,
    d: [true, false]
  },
  h: [
    {
      a: "a",
      b: 2,
      c: true
    }
  ]
};

const walkImpl = (json: Object): string => {
  const typeofValue = (value: Object) => {
    return value === null
      ? "null"
      : typeof value === "undefined"
      ? "void"
      : typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ? typeof value
      : walkImpl(value);
  };

  return Array.isArray(json)
    ? "[".concat(
        json
          .map((value, i) => {
            return typeofValue(value);
          })
          .join(","),
        "]"
      )
    : "{|".concat(
        Array.from(Object.entries(json))
          .map(([key, value]) => {
            return `${key}: ${typeofValue(value)}`;
          })
          .join(","),
        "|}"
      );
};

const walk = (json: Object): string => {
  return format(`type Json = ${walkImpl(json)};`);
};

console.log(walk(jsonObj));
/*
type Json = {|
  a: string,
  b: number,
  c: boolean
|};

*/
