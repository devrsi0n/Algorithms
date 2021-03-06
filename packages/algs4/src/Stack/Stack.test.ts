import Stack from './index';

test('Stack pop, push, toString', () => {
  const numbers = new Stack<number>();
  numbers.push(1);
  numbers.push(2);
  numbers.push(3);
  numbers.push(4);
  let sum = 0;
  for (const item of numbers) {
    sum += item;
  }
  expect(sum / numbers.size()).toEqual(2.5);
  expect(numbers.isEmpty()).toBe(false);
  expect(numbers.pop()).toBe(4);
  expect(numbers.pop()).toBe(3);
  expect(numbers.toString().startsWith('Stack'));
});

test('Stack exception', () => {
  const numbers = new Stack<number>();
  numbers.push(1);
  numbers.push(2);
  numbers.push(3);
  numbers.push(4);
  expect(() => {
    for (const item of numbers) {
      console.log(item);
      numbers.push(5);
    }
  }).toThrowError('ConcurrentModificationException');
});
