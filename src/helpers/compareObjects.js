export function compareObjects(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 == null ||
    obj2 == null
  ) {
    return false;
  }

  const keysA = Object.keys(obj1);
  const keysB = Object.keys(obj2);

  if (keysA.length !== keysB.length) {
    return false;
  }

  let result = true;

  keysA.forEach((key) => {
    if (!keysB.includes(key)) {
      result = false;
    }

    if (typeof obj1[key] === "function" || typeof obj2[key] === "function") {
      if (obj1[key].toString() !== obj2[key].toString()) {
        result = false;
      }
    }

    if (!compareObjects(obj1[key], obj2[key])) {
      result = false;
    }
  });

  return result;
}
