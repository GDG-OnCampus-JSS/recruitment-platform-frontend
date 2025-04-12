export interface Example {
  id: number;
  input: string;
  output: string;
}

export interface ProblemsInterface {
  id: number;
  title: string;
  content: string;
  tags?: string[];
  example: Example[];
  inputConstraints?: string;
  outputConstraints?: string;
  timeLimit?: number;
}

export const secondYearProblems: ProblemsInterface[] = [
  {
    id: 6,
    title: 'Matrix Mastery',
    tags: ['Patterns'],
    content: `You are tasked with printing a matrix corresponding to a specific number pattern, given an input number N.`,
    inputConstraints: `An integer N where 1 <= N <= 100    
    1 <= N <= 10^2`,
    outputConstraints: `Print a 2D array of integers that represent the number pattern`,
    timeLimit: 1,
    example: [
      {
        id: 1,
        input: `    N = 4`,
        output: `4444444    
                4333334    
                4322234    
                4321234    
                4322234    
                4333334    
                4444444`,
      },
    ],
  },
  {
    id: 7,
    title: 'Galaxy Fortune',
    tags: ['Sorting'],
    content: `Galaxy Fortune is a busy Casino known all over the solar system, and they have just started a new card game everyone is excited about. The game uses a pile of n cards, and each card has m numbers written on it. There are n players like miners, travelers from Pluto, or even a cook from the casino and each gets one card.   
    Here is how it goes: every player faces off against every other player, one-on-one, and each pair plays just once. If there are four players say, a miner, a traveler, a mechanic, and a cook that is six games: miner vs. traveler, miner vs. mechanic, miner vs. cook, traveler vs. mechanic, traveler vs. cook, and mechanic vs. cook. Out there, they are tossing in bets under the casino bright lights.   
    Each game has a winner, what matters is how many chips are paid out to the winner. When two players face off, if one player card shows numbers a1, a2, ..., am and the other shows b1, b2, ..., bm, the winner collects |a1 - b1| + |a2 - b2| + ... + |am - bm| chips from the pot. Here, |x| simply means the absolute value of x.   
    The casino boss, needs to know how many chips the pot should hold. That is the total sum of all the chips winners grab from every game. With lots of cards and players you are picked to figure out that number so the game keeps going without any problem.   
    `,
    inputConstraints: `Each test consists of several test cases. The first line contains one integer t (1 <= t <= 1000) the number of test cases. The description of the test cases follows.
The first line of each test case contains two integers n and m (1 <= n x m <= 3 x 10^5) the number of cards in the deck and the count of numbers on the one card.
Each of the following n lines of the test case set contains m integers ci,j(1 <= ci , j <= 10^6) a description of the i-th card.
It is guaranteed that the total n x m in all tests does not exceed 3 x 10^5.`,
    outputConstraints: `For each test case, print one number the total amount of winnings from all games.`,
    timeLimit: 1,
    example: [
      {
        id: 1,
        input: `3
3 5   
1 4 2 8 5   
7 9 2 1 4   
3 8 5 3 1   
1 4   
4 15 1 10   
4 3   
1 2 3   
3 2 1   
1 2 1   
4 2 7   
`,
        output: `50   
0   
31   
`,
      },
    ],
  },
  {
    id: 8,
    title: 'Crave the cupcake',
    tags: ['DP'],
    content: `In a busy little town between hills and a river, Yasin and Amir head to the bakery one sunny morning to get cupcakes. The shop has n different kinds of cupcakes, lined up from 1 to n, and they have got plenty of each like they will never run out. Each type i has a flavor score ai, which can be a big positive number if it is yummy, zero if it is just okay, or a negative number if it is yucky.   
    Yasin loves trying everything, so he grabs one of each kind, no skipping. Amir is pickier he picks a chunk of cupcakes from l to r (where 1 <= l <= r <= n), but he will not take all of them from 1 to n because that is copying Yasin. He takes one of each from his chosen stretch.   
    After, they sit by the river, add up their flavor scores, and compare. Yasin wants his total to beat Amir every time, no matter what chunk Amir picks. For example, if there is three types with scores [7,4,-1], Yasin gets all three for 7+4-1=10. Amir might pick [7] for 7, [4] for 4, [-1] for -1, [7,4] for 11, or [4,-1] for 3. Since Amir can get 11, and 10 is not bigger, Yasin is not happy.   
    Your job is to see if Yasin total will always be bigger than Amir, no matter what Amir chooses.`,
    inputConstraints: `The tale begins with a number t (where 1 <= t <= 10^4), counting how many testcases you will judge.   
     Each testcase consists of:   
     1. First, a number n (where 2 <= n <= 10^5), the count of cupcake types on display.   
     2. Then, n numbers a1,a2,...,an (where -10^9 <= ai <= 10^9), the flavor scores for each type, from first to last.   
     Across all trips, the total n will not climb past 10^5, keeping the bakery shelves in check.`,
    outputConstraints: `For each trip, say "YES" if Yasin full haul of cupcakes will always taste better by a clear margin than any stretch Amir picks. If not, say "NO."`,
    timeLimit: 1,
    example: [
      {
        id: 1,
        input: `3   
4   
1 2 3 4   
3   
7 4 -1   
3   
5 -5 5   
`,
        output: `YES   
NO   
NO   
`,
      },
    ],
  },
  {
    id: 9,
    title: 'Get This Party Started',
    tags: ['Arrays'],
    content: `In a fun part of town where people are always laughing, Amit is planning a big party and wants everyone to have a good time. He has n friends, and each one has a certain amount of money the i-th friend has exactly i bucks.      
    Here is the tricky part: his i-th friend will only come and stay happy if the party fits them just right. They are okay as long as there are not more than ai people with more money than their i bucks and not more than bi people with less money. If too many are richer or poorer, they will not stick around.    
    Amit wants a full house he is not into tiny parties. Imagine him checking his phone, figuring out who can join to keep everyone happy. How many friends can he invite so they all leave smiling?   `,
    inputConstraints: `The first line contains a single integer t(1 <= t <= 10^4) the number of test cases. The description of the test cases follows.
The first line of each test case contains a single integer n (1 <= n <= 2 x 10^5) the number of Keshi friends.
The i-th of the following n lines contains two integers ai and bi (0 <= ai,bi < n).
It is guaranteed that the sum of n over all test cases does not exceed 2 x 10^5.`,
    outputConstraints: `For each test case print the maximum number of people Amit can invite.`,
    timeLimit: 1,
    example: [
      {
        id: 1,
        input: `3   
3   
3   
1 2   
2 1   
1 1   
2   
0 0   
0 1   
2   
1 0      
0 1   
`,
        output: `2   
1   
2   
`,
      },
    ],
  },
  {
    id: 10,
    title: 'Sunny Lines and Pines',
    tags: ['Traversal'],
    content: `Sunny Sketcher has a bunch of n-1 edges that show how to link up n vertices into a tree shape. He has got a way to sketch it out step-by-step:   
    1. Start: He draws vertex 1 all by itself, then moves on.   
    2. Next Bit: He looks at each edge one by one. If an edge ties a vertex he has already drawn, to one he has not, he adds the new vertex and draws the edge. When he has checked all the edges, he moves forward.   
    3. Check Time: If every vertex is on his paper, he is done. If not, he goes back to the "Next Bit."   
    The "readings" are how many times he has to do that "Next Bit" part. Figure out how many times (readings) Sunny Sketcher needs to go through it to finish his tree picture.`,

    inputConstraints: `Each test contains multiple test cases. The first line of input contains a single integer t(1 <= t <= 10^4) the number of test cases. The description of test cases follows.
The first line of each test case contains a single integer n (2 <= n <= 2 x 10^5) the number of vertices of the tree.
The following n-1 lines of each test case contain two integers ui and vi (1 <= ui,vi <= n, ui != vi) indicating that (ui,vi) is the i-th edge in the list. It is guaranteed that the given edges form a tree.
It is guaranteed that the sum of n over all test cases does not exceed 2 x 10^5.`,
    outputConstraints: `For each puzzle, give the number of times Sunny Sketcher has to do the "Next Bit" part to get all the vertices drawn.`,
    timeLimit: 1,
    example: [
      {
        id: 1,
        input: `3   
3   
3   
1 2   
2 1   
1 1   
2   
0 0   
0 1   
2   
1 0      
0 1   
`,
        output: `2   
1   
2   
`,
      },
    ],
  },
];

export const firstYearProblems: ProblemsInterface[] = [
  {
    id: 1,
    title: 'Picky Pandas',
    tags: ['Maths'],
    content: `At JSS University, hidden among lots of bamboo, Professor Ankur has a cool classroom. It has got two rows of seats, each with m chairs. He has got a + b + c pandas as students, and he wants to fit as many as possible. The rule is simple: one panda per chair.   
    Some pandas are picky. The a pandas only want the front row. The b pandas only want the back row. The c pandas do not mind they will sit anywhere. If a panda picks a row, Professor Ankur has to let them sit there if they get a seat.   
    Outside, there are fun weekend parties with lights and dancing, but that does not change this puzzle. Figure out how many pandas can sit in the chairs.   `,
    inputConstraints: `The opening line provides an integer t (where 1 <= t <= 10^4), representing the number of distinct testcases to evaluate.
Each testcase is defined by a quartet of integers m, a, b, and c (each satisfying 1 <= m, a, b, c <= 10^8), delivered on a single line.`,
    outputConstraints: `For every scenario, reveal the maximum count of pandas that can be seated.`,
    timeLimit: 1,
    example: [
      {
        id: 1,
        input: `5   
10 5 5 10   
3 6 1 1   
15 14 12 4   
1 1 1 1   
420 6 9 69   
`,
        output: `20   
5   
30   
2   
84   
`,
      },
    ],
  },
  {
    id: 2,
    title: 'Sweet Butterfly',
    tags: ['Patterns'],
    content: ` Given an integer N, print the following pattern :`,
    inputConstraints: `1 <= n <= 20`,
    outputConstraints: `Print the pattern for the given N`,
    timeLimit: 1,
    example: [
      {
        id: 1,
        input: `N = 6`,
        output: `
        *          *     
        **        **   
        ***      ***   
        ****    ****   
        *****  *****   
        ************ 
        *****  *****   
        ****    ****   
        ***      ***   
        **        **   
        *          *`,
      },
    ],
  },
  {
    id: 3,
    title: 'Battle of the brains',
    tags: ['Arrays'],
    content: `In the little village of Kanpur, where stone paths twist past willow trees, Avinash and Shishir play a game by an old chalkboard. The board has n numbers written on it n is even and they are labeled x1,x2,...,xn. There is a special number k that guides their game, and they start with a score of zero. The game goes for exactly n/2 turns.   
    Here is how it works: Avinash picks a number from the board and erases it off let us call it a. Then Shishir picks one from what is left and erases it off too call that b. If a plus b equals k, they add 1 to the score.   
    Avinash tries to keep the score as low as possible , while Shishir wants it as high as possible. Both are super smart and play the best they can, using tricks they have learned from the village. While the bell tower rings far off, figure out what the score will be when they are done.   
    `,
    inputConstraints: `The first line contains an integer t (1 <= t <= 10^4), indicating the number of test cases.
Each test case begins with two numbers: n and k (where 2 <= n <= 2 x 10^5, 1 <= k <= 2 x n and n is even). The next line contains n integers x1,x2,...,xn (where 1 <= xi <= n).
The sum of n across all test cases will not exceed 2 x 10^5.`,
    outputConstraints: `For each test case, output the final score achieved when both players play optimally.`,
    timeLimit: 1,
    example: [
      {
        id: 1,
        input: `4   
4 4   
1 2 3 2   
8 15   
1 2 3 4 5 6 7 8   
6 1   
1 1 1 1 1 1   
16 9   
3 1 4 1 5 9 2 6 5 3 5 8 9 7 9 3   
`,
        output: `
2   
1   
0   
4   
`,
      },
    ],
  },
  {
    id: 4,
    title: 'Galaxy Fortune',
    tags: ['Sorting'],
    content: `Galaxy Fortune is a busy Casino known all over the solar system, and they have just started a new card game everyone is excited about. The game uses a pile of n cards, and each card has m numbers written on it. There are n players like miners, travelers from Pluto, or even a cook from the casino and each gets one card.   
    Here is how it goes: every player faces off against every other player, one-on-one, and each pair plays just once. If there are four players say, a miner, a traveler, a mechanic, and a cook that is six games: miner vs. traveler, miner vs. mechanic, miner vs. cook, traveler vs. mechanic, traveler vs. cook, and mechanic vs. cook. Out there, they are tossing in bets under the casino bright lights.   
    Each game has a winner, what matters is how many chips are paid out to the winner. When two players face off, if one player card shows numbers a1, a2, ..., am and the other shows b1, b2, ..., bm, the winner collects |a1 - b1| + |a2 - b2| + ... + |am - bm| chips from the pot. Here, |x| simply means the absolute value of x.   
    The casino boss, needs to know how many chips the pot should hold. That is the total sum of all the chips winners grab from every game. With lots of cards and players you are picked to figure out that number so the game keeps going without any problem.   
    `,
    inputConstraints: `Each test consists of several test cases. The first line contains one integer t (1 <= t <= 1000) the number of test cases. The description of the test cases follows.
The first line of each test case contains two integers n and m (1 <= n x m <= 3 x 10^5) the number of cards in the deck and the count of numbers on the one card.
Each of the following n lines of the test case set contains m integers ci,j(1 <= ci , j <= 10^6) a description of the i-th card.
It is guaranteed that the total n x m in all tests does not exceed 3 x 10^5.`,
    outputConstraints: `For each test case, print one number the total amount of winnings from all games.`,
    timeLimit: 1,
    example: [
      {
        id: 1,
        input: `3
3 5   
1 4 2 8 5   
7 9 2 1 4   
3 8 5 3 1   
1 4   
4 15 1 10   
4 3   
1 2 3   
3 2 1   
1 2 1   
4 2 7   
`,
        output: `50   
0   
31   
`,
      },
    ],
  },
  {
    id: 5,
    title: 'Crave the cupcake',
    tags: ['DP'],
    content: `In a busy little town between hills and a river, Yasin and Amir head to the bakery one sunny morning to get cupcakes. The shop has n different kinds of cupcakes, lined up from 1 to n, and they have got plenty of each like they will never run out. Each type i has a flavor score ai, which can be a big positive number if it is yummy, zero if it is just okay, or a negative number if it is yucky.   
    Yasin loves trying everything, so he grabs one of each kind, no skipping. Amir is pickier he picks a chunk of cupcakes from l to r (where 1 <= l <= r <= n), but he will not take all of them from 1 to n because that is copying Yasin. He takes one of each from his chosen stretch.   
    After, they sit by the river, add up their flavor scores, and compare. Yasin wants his total to beat Amir every time, no matter what chunk Amir picks. For example, if there is three types with scores [7,4,-1], Yasin gets all three for 7+4-1=10. Amir might pick [7] for 7, [4] for 4, [-1] for -1, [7,4] for 11, or [4,-1] for 3. Since Amir can get 11, and 10 is not bigger, Yasin is not happy.   
    Your job is to see if Yasin total will always be bigger than Amir, no matter what Amir chooses.`,
    inputConstraints: `The tale begins with a number t (where 1 <= t <= 10^4), counting how many testcases you will judge.   
     Each testcase consists of:   
     1. First, a number n (where 2 <= n <= 10^5), the count of cupcake types on display.   
     2. Then, n numbers a1,a2,...,an (where -10^9 <= ai <= 10^9), the flavor scores for each type, from first to last.   
     Across all trips, the total n will not climb past 10^5, keeping the bakery shelves in check.`,
    outputConstraints: `For each trip, say "YES" if Yasin full haul of cupcakes will always taste better by a clear margin than any stretch Amir picks. If not, say "NO."`,
    timeLimit: 1,
    example: [
      {
        id: 1,
        input: `3   
4   
1 2 3 4   
3   
7 4 -1   
3   
5 -5 5   
`,
        output: `YES   
NO   
NO   
`,
      },
    ],
  },
];
