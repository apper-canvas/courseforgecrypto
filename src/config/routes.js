import HomePage from '@/components/pages/HomePage';
import DashboardPage from '@/components/pages/DashboardPage';
import CoursesPage from '@/components/pages/CoursesPage';
import CourseEditorPage from '@/components/pages/CourseEditorPage';
import UsersPage from '@/components/pages/UsersPage';
import AnalyticsPage from '@/components/pages/AnalyticsPage';
import ModerationPage from '@/components/pages/ModerationPage';
import SettingsPage from '@/components/pages/SettingsPage';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
path: '/',
    icon: 'Home',
    component: HomePage
  },
  dashboard: {
    id: 'dashboard',
    label: 'Dashboard',
path: '/dashboard',
    icon: 'LayoutDashboard',
    component: DashboardPage
  },
  courses: {
    id: 'courses',
    label: 'Courses',
path: '/courses',
    icon: 'BookOpen',
    component: CoursesPage
  },
  courseEditor: {
    id: 'courseEditor',
    label: 'Course Editor',
path: '/courses/:id/edit',
    icon: 'Edit',
    component: CourseEditorPage,
    hidden: true
  },
  users: {
    id: 'users',
    label: 'Users',
path: '/users',
    icon: 'Users',
    component: UsersPage
  },
  analytics: {
    id: 'analytics',
    label: 'Analytics',
path: '/analytics',
    icon: 'BarChart3',
    component: AnalyticsPage
  },
  moderation: {
    id: 'moderation',
    label: 'Moderation',
path: '/moderation',
    icon: 'Shield',
    component: ModerationPage
  },
  settings: {
    id: 'settings',
    label: 'Settings',
path: '/settings',
    icon: 'Settings',
    component: SettingsPage
  }
};

export const routeArray = Object.values(routes);