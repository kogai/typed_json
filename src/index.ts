const jsonObj = {
  a: "a",
  b: 2,
  c: true
};

const walk = (json: Object) => {
  const definitions = Array.from(Object.entries(json))
    .map(([key, value]) => `${key}: ${typeof value}`)
    .join(",");
  return `type Json = {|
    ${definitions}
|};`;
};

console.log(walk(jsonObj));
/*
type Json = {|
  a: string,
  b: number,
  c: boolean
|};

*/
