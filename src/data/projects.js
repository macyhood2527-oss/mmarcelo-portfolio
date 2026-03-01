export const projects = [
  {
    id: 'inventory-pos',
    title: 'Inventory & POS System',
    emphasis: 'Primary',
    summary:
      'Inventory + point-of-sale system with login roles (admin/cashier), stock tracking, sales recording, and MySQL storage.',
    tags: ['Node.js', 'Express', 'MySQL', 'REST API', 'JWT Auth', 'RBAC', 'SQL Reports'],
    links: {
      github: 'https://github.com/macyhood2527-oss/pos-store',
      demo: null, // add later if deployed
    },
    details: {
      architecture:
        'Express REST API with JWT auth (stored as an httpOnly cookie), role checks per route, and a MySQL database. Includes a simple HTML UI in /public that calls the API with fetch().',
      responsibilities: [
        'Designed the MySQL tables for products, users, sales, and stock movements',
        'Built login/logout endpoints and role-based access (admin vs cashier)',
        'Implemented inventory actions like price updates and stock-in tracking',
        'Implemented the cashier checkout flow (cart → sale record → receipt)',
        'Wrote basic reports using SQL totals (daily sales, low stock, top items)',
      ],
      problemsSolved: [
        'Separated admin vs cashier permissions to prevent unsafe actions',
        'Kept stock accurate by recording movements and deducting on sale',
        'Made sales traceable by storing transactions + generating receipts',
        'Produced simple reporting totals directly from SQL queries',
      ],
    },
    media: [
      {
        type: 'image',
        src: '/media/pos-store/login.png',
        caption: 'Role-based login separating Admin and Cashier permissions.',
      },
      {
        type: 'image',
        src: '/media/pos-store/inventory-admin.png',
        caption: 'Admin inventory panel with stock control and price updates.',
      },
      {
        type: 'image',
        src: '/media/pos-store/pos-cashier.png',
        caption: 'Cashier checkout workflow with live cart and change calculation.',
      },
      {
        type: 'image',
        src: '/media/pos-store/receipt-preview.png',
        caption: 'Printable receipt preview generated from stored sales data.',
      },
      {
        type: 'image',
        src: '/media/pos-store/reports-dashboard.png',
        caption: 'Sales reporting dashboard with SQL-based aggregation.',
      },
    ],
  },

  {
    id: 'lifeos',
    title: 'LifeOS',
    emphasis: 'Primary',
    summary:
      'Pastel, gentle productivity journal for daily tasks, habits, reflections, and reminders — built as a full-stack web app with Google login and MySQL persistence.',
    tags: [
      'React',
      'Vite',
      'Tailwind',
      'Node.js',
      'Express',
      'TypeScript',
      'MySQL (Railway)',
      'Passport (Google OAuth)',
      'Web Push',
      'PWA',
    ],
    links: {
      github: 'https://github.com/macyhood2527-oss/lifeos',
      demo: 'https://lifeos-mauve-beta.vercel.app',
    },
    details: {
      architecture:
        'React (Vite) frontend with a Node.js + Express + TypeScript backend, MySQL on Railway, and Passport Google OAuth. Includes reminders using cron logic and browser push notifications with quiet hours.',
      responsibilities: [
        'Built a full CRUD workflow for tasks, habits, and reflections with MySQL persistence',
        'Implemented Google login (OAuth) using Passport and session/auth middleware',
        'Designed the reminders system (scheduled sends, quiet hours, notification logging)',
        'Connected web push notifications (service worker + push subscription flow)',
        'Created a pastel earthy UI with glass panels, micro-interactions, and soft feedback toasts',
      ],
      problemsSolved: [
        'Kept backend routes consistent with frontend API calls to prevent mismatched responses',
        'Ensured habits check-ins and reflections save correctly and reload reliably',
        'Handled reminder timing safely with quiet-hours rules and timezone-respecting scheduling',
        'Reduced intrusive UX by using gentle feedback (toasts) instead of harsh browser prompts',
      ],
    },
    media: [
      {
        type: 'image',
        src: '/media/lifeos/banner.png',
        caption: 'LifeOS header branding in a pastel earthy style (sage / rose / beige).',
      },
      {
        type: 'image',
        src: '/media/lifeos/today.png',
        caption: 'Today view with daily tasks, gentle progress flow, and clean glass panels.',
      },
      {
        type: 'image',
        src: '/media/lifeos/habits.png',
        caption: 'Habits check-in system with progress per period and soft micro-interactions.',
      },
      {
        type: 'image',
        src: '/media/lifeos/reflections.png',
        caption: 'Reflection composer with structured prompts and mood tracking.',
      },
      {
        type: 'image',
        src: '/media/lifeos/analytics.png',
        caption:
          'Analytics dashboard with weekly breakdowns, habit distribution charts, and progress insights powered by Recharts.',
      },
    ],
  },
];