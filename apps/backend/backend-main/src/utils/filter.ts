// remove null and undefined values from the object
export function filterEmptyValues(obj: any): { [key: string]: any } {
  const newObj: { [key: string]: any } = {};
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}
