import Dashboard from '../pages/Dashboard';
import Courses from '../pages/Courses';
import CourseEditor from '../pages/CourseEditor';
import Users from '../pages/Users';
import Analytics from '../pages/Analytics';
import Moderation from '../pages/Moderation';
import Settings from '../pages/Settings';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'Home',
    component: Home
  },
  dashboard: {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'LayoutDashboard',
    component: Dashboard
  },
  courses: {
    id: 'courses',
    label: 'Courses',
    path: '/courses',
    icon: 'BookOpen',
    component: Courses
  },
  courseEditor: {
    id: 'courseEditor',
    label: 'Course Editor',
    path: '/courses/:id/edit',
    icon: 'Edit',
    component: CourseEditor,
    hidden: true
  },
  users: {
    id: 'users',
    label: 'Users',
    path: '/users',
    icon: 'Users',
    component: Users
  },
  analytics: {
    id: 'analytics',
    label: 'Analytics',
    path: '/analytics',
    icon: 'BarChart3',
    component: Analytics
  },
  moderation: {
    id: 'moderation',
    label: 'Moderation',
    path: '/moderation',
    icon: 'Shield',
    component: Moderation
  },
  settings: {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: 'Settings',
    component: Settings
  }
};

export const routeArray = Object.values(routes);