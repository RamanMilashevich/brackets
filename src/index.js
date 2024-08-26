module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const openBrackets = [];
  const closeBrackets = {};
  const sameBrackets = new Set();

  bracketsConfig.forEach(([open, close]) => {
    openBrackets.push(open);
    closeBrackets[close] = open;
    if (open === close) {
      sameBrackets.add(open);
    }
  });

  for (let char of str) {
    if (sameBrackets.has(char)) {
      if (stack.length > 0 && stack[stack.length - 1] === char) {
        stack.pop();
      } else {
        stack.push(char); 
      }
    } else if (openBrackets.includes(char)) {
      stack.push(char);
    } else if (closeBrackets[char]) {
      if (stack.length === 0 || stack.pop() !== closeBrackets[char]) {
        return false;
      }
    }
  }
  return stack.length === 0;
}
