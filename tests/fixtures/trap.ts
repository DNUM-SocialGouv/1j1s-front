export function Trap<T> () {
  let value: T|undefined = undefined;
  function t(p: T) {
    value = p;
    return true;
  }

  t.value = () => value;

  return t;
}
