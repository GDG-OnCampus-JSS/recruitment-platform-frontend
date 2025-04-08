export const androidTasks = [
  {
    year: 1,
    tasks: [
      {
        type: 'form-app',
        title: 'User Registration App',
        description: [
          'Make a mobile app that consists of:',
          'App Functionality:',
          'First Screen :The user can enter his name , email , dob , etc. and on pressing submit button , page will navigate to next screen.',
          'Second Screen : This screen shows all the details filled by the user on first screen.',
        ],
        link: 'https://developer.android.com/jetpack/guide',
        criteria: [
          'Implementation of proper input validation',
          'Usage of modern Android components',
          'Handling screen orientation changes',
          'Clean XML layouts and proper event handling',
          'Material Design guidelines compliance',
        ],
        browniePoints: [
          'Advanced form controls implementation',
          'Smooth animation transitions',
          'Local data persistence using Room/SQLite',
          'Dark mode support',
        ],
        imageUrl: '/task-example.png',
      },
    ],
  },
  {
    year: 2,
    tasks: [
      {
        type: 'news-app',
        title: 'News Application',
        description: [
          'Create a News App with:',
          'Firebase authentication (Phone OTP verification).',
          'News API integration with category filtering.',
          'Proper session management and API security.',
        ],
        link: 'https://newsapi.org/docs/getting-started',
        criteria: [
          'Implementation of MVVM architecture',
          'RecyclerView optimization techniques',
          'Proper error handling and fallback UI',
          'Secure API key management',
          'Support for multiple news categories',
        ],
        browniePoints: [
          'Clean Architecture implementation',
          'Offline support with caching',
          'Bookmark functionality implementation',
          'Advanced search features',
          'Push notification integration',
        ],
        imageUrl: '/task-example.png',
      },
    ],
  },
];

export const mlTasks = [
  {
    year: 1,
    tasks: [
      {
        type: 'stroke-prediction',
        title: 'Stroke Prediction Analysis',
        description: [
          'Download the Stroke Prediction dataset from Kaggle',
          'Perform data preprocessing and exploratory data analysis (EDA)',
          'Bonus: Build and evaluate a classification model for stroke prediction',
        ],
        link: 'https://www.kaggle.com/datasets/fedesoriano/stroke-prediction-dataset',
        criteria: [
          'Data cleaning effectiveness',
          'EDA completeness',
          'Model accuracy',
          'Code quality',
        ],
        browniePoints: [
          'Advanced visualization techniques',
          'Feature engineering',
          'Model optimization',
        ],
        imageUrl: '/task-example.png',
      },
    ],
  },
  {
    year: 2,
    tasks: [
      {
        type: 'generative-ai',
        title: 'Generative AI - RAG System',
        description: [
          'Create RAG system using provided document.',
          'Use Gemini or open-source models.',
          'Bonus: Integrate with REST API.',
        ],
        link: 'https://www.kaggle.com/datasets/abhishekkrthakur/gemini-1-5-tasks',
        criteria: [
          'System functionality',
          'Document processing',
          'Response accuracy',
          'API implementation',
        ],
        browniePoints: [
          'LangChain integration',
          'Performance optimization',
          'Advanced query handling',
        ],
        imageUrl: '/task-example.png',
      },
      {
        type: 'sentiment-analysis',
        title: 'Twitter Sentiment Analysis',
        description: [
          'Download Twitter Sentiment dataset.',
          'Create classification model.',
          'Bonus: Integrate with REST API.',
        ],
        criteria: [
          'Preprocessing quality',
          'Model accuracy',
          'API implementation',
          'Evaluation metrics',
        ],
        browniePoints: ['Advanced NLP techniques', 'Real-time processing', 'Deployment readiness'],
        imageUrl: '/task-example.png',
      },
    ],
  },
];

export const designTasks = [
  {
    year: 1,
    gfx: [
      {
        description: [
          'Logo for a company',
          'Create a text based logo for a brand called “ChipSwift Logistics” which specialises in transportation and supply chain of advanced technology all over the world. The logo should portray a sense of trust, safety and reliability of the company.',
          'Social Media Post',
          'Design an instagram post for an upcoming hackathon event titled "ByteBash". The hackathon is open for college students and focuses on AI/ML development, The event starts at 10:00 AM on 25th April 2024 at JSS Campus.',
          'The post should provide all the necessary information and should also portray the theme of the hackathon.',
        ],
        link: 'https://www.instagram.com/gdgoncampus.jss',
        criteria: ['Relevance to industry', 'Typography quality', 'Color scheme'],
        browniePoints: ['Vector format', 'Multiple variations'],
      },
    ],
    ux: [
      {
        description: [
          'Redesign Blinkit / Zepto',
          'Deliverables : User research, wireframes, Prototype and visual designs are must.',
          'Design style guide is a plus.',
          'Redesign Rapido / Ola',
          'Deliverables : User research, wireframes, Prototype and visual designs are must.',
          'Design style guide is a plus.',
        ],
        link: 'https://www.zepto.com',
        criteria: ['User flow improvements', 'Accessibility'],
        browniePoints: ['Design system implementation'],
      },
    ],
    vfx: [
      {
        description: [
          'Create a basic text and confetti animation using any video animation software.',
          'Create a music video that features dynamic and fast-paced typography animations that are synchronised with the tempo and beat of the music.',
        ],
        link: 'https://www.youtube.com/watch?v=8ZtV6c4qY9o',
        criteria: ['Smooth animation', 'Creative execution'],
        browniePoints: ['Complex transitions'],
      },
    ],
  },
  {
    year: 2,
    gfx: [
      {
        description: [
          'Logo for a company',
          'Create an icon based logo for "LinkWave Solutions" - a network solutions provider for both individuals and businesses. The icon should clearly communicate networking concepts while remaining visible and effective on various surfaces (plastic covers, t-shirts, advertisements).',
          'Rebranding Cosmix',
          'Rebrand Cosmix with a new design language. Deliverables must include all mockups, case studies detailing design choices, and implementation across different platforms.',
        ],
        link: 'https://cosmix.in',
        criteria: [
          'Clarity of networking theme',
          'Scalability across surfaces',
          'Brand adaptability',
          'Rebrand consistency',
        ],
        browniePoints: [
          'Multi-format export capabilities',
          'Comprehensive brand guidelines',
          'Packaging mockups',
          'Monochrome variations',
        ],
        imageUrl: '/task-example.png',
      },
    ],
    ux: [
      {
        description: [
          'Case Study: Redesign BHIM',
          'Include user research, competitive analysis, wireframes, prototype, visual designs, and design style guide. Focus on financial accessibility and transaction security.',
          'Case Study: Fashion Brand Website',
          'Design an e-commerce platform for a luxury fashion brand. Deliver visual designs, wireframes, prototype, competitive analysis, and design style guide with focus on product showcasing.',
          'Case Study: Redesign X (Twitter)',
          'Reimagine the social media platform with emphasis on content discovery and creator tools. Include user research, competitive analysis, wireframes, prototype, and design style guide.',
        ],
        link: 'https://www.bhimupi.org.in',
        criteria: [
          'User flow optimization',
          'Accessibility compliance',
          'Visual hierarchy',
          'Platform consistency',
        ],
        browniePoints: [
          'Micro-interaction design',
          'Dark mode implementation',
          'User testing results',
          'Design system documentation',
        ],
      },
    ],
    vfx: [
      {
        description: [
          '3D Logo Animation',
          'Create a 3D animated logo for a music streaming service that works as both a static favicon (256x256) and animated loading screen (1080p). Ensure smooth transitions between states.',
          'CGI Integration',
          'Enhance stock footage (from Pexels) by adding animated CGI characters to pastoral scene. Maintain realistic lighting and shadows while adding fantastic elements.',
        ],
        link: 'https://www.pexels.com',
        criteria: [
          'Technical precision (favicon scaling)',
          'Animation smoothness',
          'Lighting consistency',
          'Asset optimization',
        ],
        browniePoints: [
          'Seamless loop animation',
          'Dynamic LOD adjustments',
          'Particle effects',
          'Sound-sync for music logo',
        ],
        imageUrl: '/task-example.png',
      },
    ],
  },
];

export const webDevTasks = [
  {
    year: 1,
    tasks: [
      {
        type: 'frontend',
        title: 'Frontend (Clone)',
        description: [
          'This task will assess your abilities of developing UI.',
          "Clone the UI of Slack's homepage using HTML, CSS, and JS.",
          'Focus on frontend implementation; backend mocking is acceptable.',
        ],
        link: 'https://slack.com/intl/en-in',
        criteria: [
          'UI similarity with original',
          'Responsive layout',
          'JavaScript interactivity',
          'Code quality',
        ],
        browniePoints: ['Hosted demo', 'React/Vue implementation', 'UI libraries usage'],
        imageUrl: '/task-example.png',
      },
      {
        type: 'backend',
        title: 'Backend',
        description: ['Implement a CRUD API with database integration'],
        link: 'https://www.postman.com',
        criteria: [
          'Functional endpoints',
          'Database integration',
          'Error handling',
          'Code organization',
        ],
        browniePoints: ['Authentication implementation', 'API documentation', 'Unit tests'],
      },
    ],
  },
  {
    year: 2,
    tasks: [
      {
        type: 'frontend',
        title: 'Frontend (asd)',
        description: [
          'This task will assess your abilities of developing UI.',
          "Clone the UI of Slack's homepage using HTML, CSS, and JS.",
          'Focus on frontend implementation; backend mocking is acceptable.',
        ],
        link: 'https://slack.com/intl/en-in',
        criteria: [
          'UI similarity with original',
          'Responsive layout',
          'JavaScript interactivity',
          'Code quality',
        ],
        browniePoints: ['Hosted demo', 'React/Vue implementation', 'UI libraries usage'],
        imageUrl: '/task-example.png',
      },
      {
        type: 'backend',
        title: 'Backend',
        description: ['Implement a CRUD API with database integration'],
        link: 'https://www.postman.com',
        criteria: [
          'Functional endpoints',
          'Database integration',
          'Error handling',
          'Code organization',
        ],
        browniePoints: ['Authentication implementation', 'API documentation', 'Unit tests'],
        keyPoints: ['Clean code with comments', 'Modular folder structure', 'Descriptive naming'],
      },
    ],
  },
];
