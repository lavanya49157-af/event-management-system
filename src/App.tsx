import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/public/HomePage';
import FacultyLogin from './pages/auth/FacultyLogin';
import FacultyRegister from './pages/auth/FacultyRegister';
import CoordinatorLogin from './pages/auth/CoordinatorLogin';
import CoordinatorRegister from './pages/auth/CoordinatorRegister';
import StudentLogin from './pages/auth/StudentLogin';
import StudentRegister from './pages/auth/StudentRegister';
import AdminDashboardLayout from './layouts/AdminDashboardLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDepartments from './pages/admin/AdminDepartments';
import AdminEvents from './pages/admin/AdminEvents';
import AdminCoordinators from './pages/admin/AdminCoordinators';
import AdminParticipants from './pages/admin/AdminParticipants';
import AdminCategories from './pages/admin/AdminCategories';
import AdminUsers from './pages/admin/AdminUsers';
import AdminMedia from './pages/admin/AdminMedia';
import AdminReports from './pages/admin/AdminReports';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminAnnouncements from './pages/admin/AdminAnnouncements';
import AdminLogs from './pages/admin/AdminLogs';
import AdminSettings from './pages/admin/AdminSettings';
import StudentDashboardLayout from './layouts/StudentDashboardLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import ExploreEvents from './pages/student/ExploreEvents';
import EventDetails from './pages/student/EventDetails';
import MyRegistrations from './pages/student/MyRegistrations';
import SavedEvents from './pages/student/SavedEvents';
import Achievements from './pages/student/Achievements';
import Certificates from './pages/student/Certificates';
import Notifications from './pages/student/Notifications';
import StudentProfile from './pages/student/StudentProfile';
import CoordinatorDashboardLayout from './layouts/CoordinatorDashboardLayout';
import CoordinatorDashboard from './pages/coordinator/CoordinatorDashboard';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Public Website (Landing Page) */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="events" element={<div className="p-8 text-center text-2xl font-bold">Public Events Page (Coming Soon)</div>} />
          <Route path="reports" element={<div className="p-8 text-center text-2xl font-bold">Public Reports Page (Coming Soon)</div>} />
          
          {/* Public login routes not advertised on the main menu */}
          <Route path="faculty-login" element={<FacultyLogin />} />
          <Route path="faculty-register" element={<FacultyRegister />} />
          <Route path="coordinator-login" element={<CoordinatorLogin />} />
          <Route path="coordinator-register" element={<CoordinatorRegister />} />
          <Route path="student-login" element={<StudentLogin />} />
          <Route path="student-register" element={<StudentRegister />} />
          <Route path="login" element={<Navigate to="/" replace />} />
        </Route>
          
        <Route 
          path="student" 
          element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentDashboardLayout />
            </ProtectedRoute>
          } 
        >
          <Route index element={<StudentDashboard />} />
          <Route path="explore" element={<ExploreEvents />} />
          <Route path="explore/:id" element={<EventDetails />} />
          <Route path="registrations" element={<MyRegistrations />} />
          <Route path="saved" element={<SavedEvents />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<StudentProfile />} />
        </Route>
          
        <Route 
          path="admin" 
          element={<AdminDashboardLayout />} 
        >
          <Route index element={<AdminDashboard />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="departments" element={<AdminDepartments />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="coordinators" element={<AdminCoordinators />} />
          <Route path="participants" element={<AdminParticipants />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="media" element={<AdminMedia />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="announcements" element={<AdminAnnouncements />} />
          <Route path="logs" element={<AdminLogs />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        
        <Route 
          path="coordinator" 
          element={<CoordinatorDashboardLayout />} 
        >
          <Route index element={<CoordinatorDashboard />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="participants" element={<AdminParticipants />} />
          <Route path="achievements" element={<AdminEvents />} />
          <Route path="media" element={<AdminMedia />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          {/* Catch-all redirect for any removed/invalid coordinator routes */}
          <Route path="*" element={<Navigate to="/coordinator" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
