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

  {
  id: 'brightsmile-dental',
  title: 'BrightSmile Dental Clinic Booking System',
  emphasis: 'Primary',
  summary:
    'Full-stack clinic booking platform where patients can book dental appointments online and admins can manage services, schedules, homepage content, and appointment workflows.',
  tags: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'Supabase',
    'PostgreSQL',
    'Supabase Auth',
    'RLS',
    'Supabase Storage',
    'Role-Based Access',
  ],
  links: {
    github: 'https://github.com/macyhood2527-oss/DentalBooking',
    demo: 'https://YOUR-VERCEL-URL.vercel.app', // replace with your live link
  },
  details: {
    architecture:
      'Next.js App Router frontend connected to Supabase for authentication, PostgreSQL data storage, Row Level Security, and image storage. Middleware protects patient/admin routes, while the booking flow validates unavailable dates and occupied slots before creating appointments.',
    responsibilities: [
      'Built patient flows for signup, login, booking appointments, and viewing appointment history',
      'Implemented role-based route protection for patient and admin pages',
      'Created admin tools for services, appointment status updates, unavailable clinic dates, and homepage content editing',
      'Integrated Supabase Storage for service images and homepage gallery management',
      'Designed a polished clinic website experience with hero CTA, gallery, About page, and responsive navigation',
    ],
    problemsSolved: [
      'Prevented invalid bookings by checking past dates, Sundays, unavailable dates, and occupied slots',
      'Separated patient vs admin permissions using middleware and role-aware access rules',
      'Made clinic content easier to maintain by adding editable homepage/about content from the admin side',
      'Improved usability with AM/PM time formatting, search, gallery lightbox behavior, and clearer admin flows',
    ],
    mediaNote:
      'Includes patient booking flow, admin scheduling tools, editable homepage content, and deployed production-ready UI.',
  },
  media: [
    {
      type: 'image',
      src: '/media/brightsmile/homepage.png',
      caption: 'Homepage with strong CTA, services preview, gallery, and clinic branding.',
    },
    {
      type: 'image',
      src: '/media/brightsmile/booking-page.png',
      caption: 'Patient booking flow with service selection, unavailable date blocking, and time slot validation.',
    },
    {
      type: 'image',
      src: '/media/brightsmile/appointments.png',
      caption: 'Patient appointment history showing service details, schedule, status, and notes.',
    },
    {
      type: 'image',
      src: '/media/brightsmile/admin-dashboard.png',
      caption: 'Admin dashboard overview with appointment summaries and clinic activity.',
    },
    {
      type: 'image',
      src: '/media/brightsmile/admin-services.png',
      caption: 'Admin service management with image upload and service visibility controls.',
    },
    {
      type: 'image',
      src: '/media/brightsmile/admin-calendar.png',
      caption: 'Admin calendar view for tracking appointments and clinic unavailable dates.',
    },
  ],
}
];
