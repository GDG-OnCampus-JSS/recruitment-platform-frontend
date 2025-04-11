export interface Example {
  id: number;
  input: string;
  output: string;
}

export interface Problems {
  id: number;
  title: string;
  content: string;
  tags?: string[];
  example: Example[];
}

export const firstYearProblems: Problems[] = [
  {
    id: 1,
    title: 'Add Two Numbers',
    tags: ['easy', 'math', 'arithmetic'],
    content:
      'In this introductory problem, you are given two numbers, a and b, and your task is to calculate their sum. This challenge helps you get comfortable with basic arithmetic operations and input/output handling, making it a perfect starting point for beginners.',
    example: [
      { id: 1, input: '1 2', output: '3' },
      { id: 2, input: '8 2', output: '10' },
    ],
  },
];

export const secondYearProblems: Problems[] = [
  {
    id: 1,
    title: 'Add Two Numbers',
    tags: ['easy', 'math', 'arithmetic'],
    content:
      'In this introductory problem, you are given two numbers, a and b, and your task is to calculate their sum. This challenge helps you get comfortable with basic arithmetic operations and input/output handling, making it a perfect starting point for beginners.',
    example: [
      { id: 1, input: '1 2', output: '3' },
      { id: 2, input: '8 2', output: '10' },
    ],
  },
];

export const problems: Problems[] = [
  {
    id: 1,
    title: 'Add Two Numbers',
    tags: ['easy', 'math', 'arithmetic'],
    content:
      'In this introductory problem, you are given two numbers, a and b, and your task is to calculate their sum. This challenge helps you get comfortable with basic arithmetic operations and input/output handling, making it a perfect starting point for beginners.',
    example: [
      { id: 1, input: '1 2', output: '3' },
      { id: 2, input: '8 2', output: '10' },
    ],
  },
  {
    id: 2,
    title: 'Check Palindrome',
    tags: ['medium', 'string', 'manipulation'],
    content:
      'In this problem, you are asked to determine whether a given string is a palindrome. A palindrome reads the same backward as forward. You will practice string manipulation, conditional checks, and looping constructs. This problem builds on basic string operations and introduces you to handling edge cases in input data.',
    example: [
      { id: 1, input: 'racecar', output: 'true' },
      { id: 2, input: 'hello', output: 'false' },
    ],
  },
  {
    id: 3,
    title: 'Merge Two Sorted Arrays',
    tags: ['medium-hard', 'array', 'sorting'],
    content:
      'Given two sorted arrays, your task is to merge them into one single sorted array. This problem simulates the merge operation in merge sort and requires you to carefully traverse both arrays simultaneously. It reinforces concepts such as array manipulation, index tracking, and handling multiple data structures concurrently.',
    example: [
      { id: 1, input: '[1,3,5] [2,4,6]', output: '[1,2,3,4,5,6]' },
      { id: 2, input: '[0,2,4] [1,3,5]', output: '[0,1,2,3,4,5]' },
    ],
  },
  {
    id: 4,
    title: 'Longest Increasing Subsequence',
    tags: ['hard', 'array', 'dynamic programming'],
    content:
      'This problem requires you to find the length of the longest increasing subsequence in a given array of integers. It is a classic example of dynamic programming. You need to explore various subproblem solutions and utilize recursion or iterative memoization to build the final answer. This problem challenges you to optimize and consider efficient time complexity in your approach.',
    example: [
      { id: 1, input: '[10,9,2,5,3,7,101,18]', output: '4' },
      { id: 2, input: '[0,1,0,3,2,3]', output: '4' },
    ],
  },
  {
    id: 5,
    title: 'Regular Expression Matching',
    tags: ['very hard', 'string', 'dynamic programming'],
    content:
      "Implement a function to perform regular expression matching with support for '.' and '*'. The pattern matching should cover the entire input string, not just a subset. This problem is very challenging as it requires you to account for multiple edge cases, such as matching zero or more occurrences of a character, and to design an efficient algorithm using recursion and dynamic programming techniques. It is a great test of your problem-solving skills and ability to optimize complex algorithms. ",
    example: [
      { id: 1, input: '"aa", "a"', output: 'false' },
      { id: 2, input: '"aa", "a*"', output: 'true' },
      { id: 3, input: '"ab", ".*"', output: 'true' },
    ],
  },
];
