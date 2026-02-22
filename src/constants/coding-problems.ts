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
    title: 'Master Designer',
    content: `Welcome to the Master Designer challenge! Your task is to write a program that prints a series of connected diamonds of increasing and then decreasing sizes, based on an integer input N .
For a given integer N , the pattern consists of a sequence of diamonds.
\n The sequence of the maximum width of each diamond grows up to N and then shrinks back down to 2.
\n For example, if N = 4 , the sequence of diamond sizes will be: 2, 3, 4, 3, 2 .
\n The Overlap Rule: Adjacent diamonds in the series share their connecting point.
\n The bottom tip of one diamond (which is a single * ) serves as the top tip of the very next diamond.
\n All stars in a row are separated by a single space, and the entire pattern must be properly aligned to the center relative to the largest diamond of size N .`,
    inputConstraints: `A single integer, N , representing the maximum diamond size in the series.\nConstraints: 1 <= N <= 50`,
    outputConstraints: `Print the ASCII pattern using asterisks ( * ) and spaces.\n(Ensure there are no invisible trailing spaces after the right-most asterisk on each line).`,
    example: [
      {
        id: 1,
        input: `3`,
        output: `
              *
             * *        
              *
             * *
            * * *
             * *
              *
             * *
              *
        
        `,
      },
    ],
  },
  {
    id: 7,
    title: 'Beta Test Selection – JSS Tech Club',
    content: `The JSS College Tech Club is organizing a Hackathon. There are N students standing in a queue, each with a Skill Rating Sᵢ .
The club wants to select the longest continuous group of students to form a special “Beta Test” team.

To ensure fairness and proper coordination, the team must satisfy the following rules:
Budget Rule: Each student requires a licensed software kit equal in cost to their Skill Rating.
However, the student with the highest Skill Rating in the selected group gets their kit for free.
The remaining total cost must not exceed the given budget B .
Year Synergy Rule: The first and last student in the selected group must belong to the same batch.
Two students are considered to be in the same batch if their Skill Ratings leave the same remainder when divided by 3.
Minimum Size Rule: The selected group must contain at least 2 students.

The Challenge-Determine the maximum possible size of a continuous group that satisfies all the rules.
If no valid group exists, output 0.

Explanation for Example 1: One possible valid group has length 4 where the total cost after removing the highest Skill Rating does not exceed the budget, and the first and last students belong to the same batch (same remainder when divided by 3).`,
    inputConstraints: `The first line contains two integers N and B , representing the number of students and the available budget.
The second line contains N integers S₁, S₂, …, Sₙ , representing the Skill Ratings of the students.
Constraints: 
\n 1 ≤ N ≤ 2 × 10⁵
\n 0 ≤ B ≤ 10¹⁸
\n 0 ≤ Sᵢ ≤ 10⁹
\n Time limit is set such that an O(N) or O(N log N) solution is required.`,
    outputConstraints: `Print a single integer representing the maximum possible size of a valid group.
If no valid group exists, print 0.`,
    example: [
      {
        id: 1,
        input: `10 100
        \n20 30 10 50 40 60 20 30 10 80`,
        output: `5`,
      },
    ],
  },
  {
    id: 8,
    title: 'Unity Parade – JSS Cultural Fest',
    content: `The Annual Cultural Fest at JSS College is about to begin.
The highlight of the opening ceremony is the “Unity Parade,” where N student representatives from different branches must stand in a single straight line.
Each student has a Vibe Score Vᵢ and belongs to a Branch Bᵢ To ensure the parade is successful, the Student Council has imposed the following rules:

Monotony Rule: No more than two students from the same branch may stand consecutively.
In other words, three consecutive students from the same branch are not allowed.
Rivalry Constraint: You are given P pairs of students who refuse to stand next to each other.
Any lineup where such a pair stands adjacent is invalid.
Harmony Calculation: The Harmony of a lineup is calculated as follows.
Start with a Harmony of 0. For every pair of adjacent students:
If both students belong to the same branch, add the product of their Vibe Scores.
If they belong to different branches, add the absolute difference of their Vibe Scores.
The total Harmony is the sum of these contributions.

The Challenge
Determine the maximum possible Harmony among all valid parade lineups using all N students.
If no valid lineup exists, output -1.

Explanation for Example 1: Students 1 and 2 cannot stand next to each other.
The valid arrangements are 1 3 2 and 2 3 1 .
In both cases, the total Harmony is 2, which is the maximum possible.`,
    inputConstraints: `The first line contains two integers N and P , representing the number of students and the number of rivalry pairs.
The second line contains N integers V₁, V₂, …, Vₙ , representing the Vibe Scores.
The third line contains N integers B₁, B₂, …, Bₙ , representing the Branch IDs.
The next P lines each contain two integers u and v , indicating that student u and student v cannot stand next to each other.
Constraints:
\n 1 ≤ N ≤ 12
\n 0 ≤ P ≤ N(N−1)/2
\n 1 ≤ Vᵢ ≤ 100
\n 1 ≤ Bᵢ ≤ N
\n Time limit is set such that an O(N!) backtracking solution with pruning is expected.`,
    outputConstraints: `Print a single integer representing the maximum possible Harmony. If no valid lineup exists, print -1.`,
    example: [
      {
        id: 1,
        input: `4 1
\n 10 20 30 40
\n 1 1 2 2
\n 1 4`,
        output: `1420`,
      },
    ],
  },
  {
    id: 9,
    title: 'The Campus Connectivity Project – JSS Infrastructure',
    content: `The JSS College administration is upgrading the campus network by installing high-speed optical fiber.
The campus is structured as a Tree, where N buildings are connected by N-1 fiber cables.
Each building j has a Network Importance Value I_j .

To prevent a total network collapse, the administration has decided to create "Safe Zones."
A Safe Zone is a subset of buildings that are connected to each other (they must form a connected subgraph/subtree).

The Student Council wants to maximize the efficiency of this upgrade, but they must follow these specific constraints:
The Budget Rule: The total Importance Value of the buildings in the Safe Zone must be exactly K .
The Proximity Constraint: To minimize signal loss, the Safe Zone must contain the building with the highest Importance Value on campus.
(If multiple buildings share the same maximum value, the Safe Zone must contain at least one of them).
The Structural Rule: The selected buildings must be contiguous (connected) within the tree structure.

The Challenge
Determine the minimum number of buildings required to form a valid Safe Zone that satisfies all the rules.
If it is impossible to form a Safe Zone with a total importance of exactly K , output -1.`,
    inputConstraints: `The first line contains two integers N and K , representing the number of buildings and the required total Importance Value.
The second line contains N integers I_1, I_2,....., I_N , representing the Importance Value of each building.
The next N-1 lines each contain two integers u and v , indicating a fiber cable connection between building u and building v .
Constraints:

1 <=N<= 500

1 <= K <= 10^5

1 <= I_i <= 1000

1 <= u, v <= N
`,

    outputConstraints: `Print a single integer representing the minimum number of buildings in a valid Safe Zone.
If no such zone exists, print -1.`,
    example: [
      {
        id: 1,
        input: `5 10
        \n 3 5 2 7 1
        \n 1 2
        \n 1 3
        \n 2 4
        \n 2 5`,
        output: `-1`,
      },
    ],
  },
  {
    id: 10,
    title: 'The Adaptive Hardware Scheduler (AHS)',
    content: `You are designing a firmware scheduler for a next-generation parallel processor.
The processor must execute a set of N tasks, labeled 0 to N-1.
Each task i is assigned to a specific Hardware Port P_i.
To successfully execute all tasks in the minimum number of clock cycles, your scheduler must obey three strict hardware constraints:
\n Logical Dependency: A task v can only start if all its prerequisite tasks u (where a directed edge u \\to v exists) were completed in a previous cycle.
\n Port Mutex: Each hardware port can handle only one task per cycle. If two tasks share the same Port ID, they must be executed in different cycles.
\n System Capacity: The processor has a global limit C.
No more than C total tasks can be executed in any single cycle, regardless of port availability.
\n Every task takes exactly one clock cycle to complete.
Your goal is to determine the absolute minimum number of cycles required to finish all tasks.

Example Walkthrough Explanation (The "Greedy Trap"):
\n Tasks: 6 total (0, 1, 2, 3, 4, 5).
\n Ports: Task 0 & 3 use Port 0; Task 1 & 4 use Port 1;
\n Task 2 & 5 use Port 2.
\n Capacity (C): Only 2 tasks can run per cycle.
\n Dependencies: 0 -> 3 -> 4 -> 5 (A long chain of 4 tasks).
\n Analysis:
At t=0, tasks 0, 1, and 2 are all "Ready" (in-degree 0).
Wrong Choice: If you pick {1, 2} for Cycle 1, you satisfy the capacity (C=2) and ports.
However, Task 0 is delayed. The chain 0 -> 3 -> 4 -> 5 still needs 4 cycles.
Total cycles = 1 + 4 = 5.
Optimal Choice: Pick {0, 1} for Cycle 1. This kicks off the long chain immediately.
Cycle 1: {0, 1}
Cycle 2: {3, 2} (Task 3 is now ready, Task 2 was waiting)
Cycle 3: {4}
Cycle 4: {5}
Total Minimum Cycles: 4.`,
    inputConstraints: `The first line contains $T$, the number of test cases.
\n For each test case:
\n The first line contains three integers: $N$ (number of tasks), $M$ (number of ports), and $C$ (global capacity).
\n The second line contains $N$ integers, where the $i$-th integer is the Port ID assigned to Task $i$ (Port IDs range from $0$ to $M-1$).
\n The third line contains $E$, the number of dependency edges.
\n The next $E$ lines each contain two integers $u$ and $v$, representing a directed dependency $u \\to v$.
\n Constraints:
\n 1 <= T <= 50
\n 1 <= N <= 1000
\n 1 <= M <= 1000
\n 1 <= C <= N
\n 0 <= E <= N(N-1)/2
\n The graph is guaranteed to be a Directed Acyclic Graph (DAG).`,
    outputConstraints: `For each test case, output a single integer: the minimum number of cycles required.`,
    example: [
      {
        id: 1,
        input: `1
        \n6 3 2
        \n0 1 2 0 1 2
        \n3
        \n0 3
        \n3 4
        \n4 5`,
        output: `4`,
      },
    ],
  },
];

export const firstYearProblems: ProblemsInterface[] = [
  {
    id: 1,
    title: 'Pattern Practice',
    tags: ['Easy'],
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
    id: 2,
    title: 'The Grand Gala Buffet',
    tags: ['Medium'],
    content: `The city is hosting a massive gala with two primary food stations: a Vegetarian station (V) and a Non-Vegetarian station (N).\nEach station has a fixed capacity representing the number of meals available.\n
    \nThere are four types of guests, each with different levels of flexibility:
    \nGroup A (Strict Vegetarians) : Guests who only eat from the Vegetarian station.
    \nGroup B (Strict Non-Vegetarians) : B guests who only eat from the Non-Vegetarian station.
    \nGroup C (Flexitarians) : C guests who prefer Non-Veg, but will accept Veg if the Non-Veg station is full.\nGroup D (Omnivores) : D guests who will eat from either station with no preference.
    \n\nThe Challenge
    \nCalculate the maximum number of people you can feed. You must follow a specific organizational rule: Group C (Flexitarians) must be prioritized over Group D (Omnivores) when filling any remaining spots at the Non-Vegetarian station.`,
    inputConstraints: `Two integers, V and N, representing the capacities of the Veg and Non-Veg counters.\nFour integers, A, B, C, D, representing the number of people in each dietary group.`,
    outputConstraints: `4 integers representing the number of guests of each type fed`,
    timeLimit: 1,
    example: [
      {
        id: 1,
        input: `10 10
        \n8 5 10 5`,
        output: `[8,5,7,0]`,
      },
    ],
  },
  {
    id: 3,
    title: 'The Race Against Time',
    tags: ['Medium'],
    content: `The Grand Metropolitan Gallery has just suffered a localized climate control failure in its Renaissance Wing.
    \nN priceless masterpieces have been exposed to humidity and require immediate restoration to prevent permanent decay.
    \nAs the Head Restorer, you are the only one qualified to perform the delicate work.
    \nHowever, you can only work on one painting at a time.
    \n\nFor each painting i:
    \nIt requires T_i hours of continuous labor to fully restore.
    \nFor every hour the painting remains unrestored (from the moment you start working on the first painting until painting i is finished), its market value drops by D_i dollars per hour.
    \nIf you begin working at t = 0, a painting finished at time t_{finish} will have incurred a total loss of D_i * t_{finish}.
    \n\nThe Challenge
    \nDetermine the optimal sequence in which to restore the paintings to minimize the total loss in value across all N masterpieces.
    \nTie-breaking Rule: If two paintings have the exact same damage-to-time ratio, the painting with the smaller ID number must be restored first.`,
    inputConstraints: `An integer N, representing the number of paintings.
    \nNext, N lines contain 3 integers (n,t,d)
    \nn = painting number
    \nt = it's restoration time
    \nd = its damage per hour`,
    outputConstraints: `An ordered list of indices (or the paintings themselves) representing the optimal restoration schedule.`,
    timeLimit: 1,
    example: [
      {
        id: 1,
        input: `4
        \n1 2 10
        \n2 5 15
        \n3 1 8
        \n4 4 16`,
        output: `[3,1,4,2]`,
      },
    ],
  },
  {
    id: 4,
    title: 'Beta Test Selection – JSS Tech Club',
    tags: ['Hard'],
    content: `The JSS College Tech Club is organizing a Hackathon. There are N students standing in a queue, each with a Skill Rating Sᵢ .
    \nThe club wants to select the longest continuous group of students to form a special “Beta Test” team.
    \n\nTo ensure fairness and proper coordination, the team must satisfy the following rules:
    \nBudget Rule: Each student requires a licensed software kit equal in cost to their Skill Rating. \nHowever, the student with the highest Skill Rating in the selected group gets their kit for free. \nThe remaining total cost must not exceed the given budget B .
    \nYear Synergy Rule: The first and last student in the selected group must belong to the same batch. \nTwo students are considered to be in the same batch if their Skill Ratings leave the same remainder when divided by 3.
    \nMinimum Size Rule: The selected group must contain at least 2 students.
    \nThe Challenge-Determine the maximum possible size of a continuous group that satisfies all the rules.
    \nIf no valid group exists, output 0.`,
    inputConstraints: `The first line contains two integers N and B , representing the number of students and the available budget.
    \nThe second line contains N integers S₁, S₂, …, Sₙ , representing the Skill Ratings of the students.
    \n\nConstraints: 1 ≤ N ≤ 2 × 10⁵, 0 ≤ B ≤ 10¹⁸, 0 ≤ Sᵢ ≤ 10⁹
    \nTime limit is set such that an O(N) or O(N log N) solution is required.`,
    outputConstraints: `Print a single integer representing the maximum possible size of a valid group.
    \nIf no valid group exists, print 0.`,
    timeLimit: 1,
    example: [
      {
        id: 1,
        input: `7 10
        \n3 6 2 8 5 4 9`,
        output: `4`,
      },
    ],
  },
  {
    id: 5,
    title: 'Unity Parade – JSS Cultural Fest',
    tags: ['Hard'],
    content: `The Annual Cultural Fest at JSS College is about to begin.
    \nThe highlight of the opening ceremony is the “Unity Parade,” where N student representatives from different branches must stand in a single straight line.
    \nEach student has a Vibe Score Vᵢ and belongs to a Branch Bᵢ 
    \nTo ensure the parade is successful, the Student Council has imposed the following rules:
    \nMonotony Rule: No more than two students from the same branch may stand consecutively. \nIn other words, three consecutive students from the same branch are not allowed.
    \nRivalry Constraint: You are given P pairs of students who refuse to stand next to each other. \nAny lineup where such a pair stands adjacent is invalid.
    \nHarmony Calculation: The Harmony of a lineup is calculated as follows.
    \nStart with a Harmony of 0. For every pair of adjacent students:
    \n -->If both students belong to the same branch, add the product of their Vibe Scores.
    \n --> If they belong to different branches, add the absolute difference of their Vibe Scores.
    \n The total Harmony is the sum of these contributions.
    \n\nThe Challenge
    \nDetermine the maximum possible Harmony among all valid parade lineups using all N students.
    \nIf no valid lineup exists, output -1.`,
    inputConstraints: `The first line contains two integers N and P , representing the number of students and the number of rivalry pairs.
    \nThe second line contains N integers V₁, V₂, …, Vₙ , representing the Vibe Scores.
    \nThe third line contains N integers B₁, B₂, …, Bₙ , representing the Branch IDs.
    \nThe next P lines each contain two integers u and v , indicating that student u and student v cannot stand next to each other.
    \n\nConstraints:
    \n1 ≤ N ≤ 12
    \n0 ≤ P ≤ N(N−1)/2
    \n1 ≤ Vᵢ ≤ 100
    \n1 ≤ Bᵢ ≤ N
    \nTime limit is set such that an O(N!) backtracking solution with pruning is expected.`,
    outputConstraints: `Print a single integer representing the maximum possible Harmony. If no valid lineup exists, print -1.`,
    timeLimit: 1,
    example: [
      {
        id: 1,
        input: `3 1
        \n5 3 4
        \n1 1 2
        \n1 2`,
        output: `2`,
      },
    ],
  },
];
