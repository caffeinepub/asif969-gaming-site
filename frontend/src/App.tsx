import React from 'react';
import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from './context/AuthContext';
import { SidebarProvider } from './context/SidebarContext';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Home from './pages/Home';
import Wallet from './pages/Wallet';
import Promotions from './pages/Promotions';
import Admin from './pages/Admin';
import Profile from './pages/Profile';

function Layout() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <div className="min-h-screen bg-charcoal flex flex-col">
          <Header />
          <LeftSidebar />
          <main className="flex-1 pt-[88px]">
            <Outlet />
            <Footer />
          </main>
          <BottomNav />
          <AuthModal />
          <Toaster
            theme="dark"
            toastOptions={{
              style: {
                background: '#1a1a1a',
                border: '1px solid #2a2a2a',
                color: '#f0f0f0',
              },
            }}
          />
        </div>
      </SidebarProvider>
    </AuthProvider>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const walletRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/wallet',
  component: Wallet,
});

const promoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/promo',
  component: Promotions,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: Admin,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: Profile,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  walletRoute,
  promoRoute,
  adminRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
