import React from 'react';
import { X, Dices, Monitor, Trophy, Table2, Gift, Crown, Home, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSidebarContext } from '../context/SidebarContext';
import { useNavigate } from '@tanstack/react-router';

const CATEGORIES = [
  { id: 'All', label: 'Home', icon: Home },
  { id: 'Slots', label: 'Slots', icon: Dices },
  { id: 'Live Casino', label: 'Live Casino', icon: Monitor },
  { id: 'Sports', label: 'Sports', icon: Trophy },
  { id: 'Table Games', label: 'Table Games', icon: Table2 },
  { id: 'Promotions', label: 'Promotions', icon: Gift },
  { id: 'VIP', label: 'VIP Club', icon: Crown },
];

export default function LeftSidebar() {
  const { isLeftSidebarOpen, isLeftSidebarCollapsed, toggleLeftSidebar, collapseLeftSidebar, activeCategory, setActiveCategory } = useSidebarContext();
  const navigate = useNavigate();

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
    if (id === 'Promotions') {
      navigate({ to: '/promo' });
    } else {
      navigate({ to: '/' });
    }
    // Close mobile drawer
    if (isLeftSidebarOpen) toggleLeftSidebar();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isLeftSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 md:hidden"
          onClick={toggleLeftSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-[88px] left-0 bottom-0 z-40 flex flex-col
          transition-all duration-300 ease-in-out
          border-r border-charcoal-border
          ${isLeftSidebarOpen ? 'translate-x-0 slide-in-left' : '-translate-x-full md:translate-x-0'}
          ${isLeftSidebarCollapsed ? 'w-16' : 'w-56'}
        `}
        style={{ background: '#111111' }}
      >
        {/* Collapse toggle (desktop only) */}
        <div className="hidden md:flex justify-end p-2 border-b border-charcoal-border">
          <button
            onClick={collapseLeftSidebar}
            className="p-1.5 rounded text-gray-500 hover:text-gold transition-colors duration-150"
          >
            {isLeftSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Mobile close */}
        <div className="flex md:hidden justify-between items-center px-4 py-3 border-b border-charcoal-border">
          <span className="text-gold font-heading font-bold text-lg">MENU</span>
          <button onClick={toggleLeftSidebar} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-3 overflow-y-auto scrollbar-thin">
          {CATEGORIES.map(({ id, label, icon: Icon }) => {
            const isActive = activeCategory === id;
            return (
              <button
                key={id}
                onClick={() => handleCategoryClick(id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-150
                  ${isActive ? 'sidebar-item-active' : 'sidebar-item-inactive'}
                `}
                title={isLeftSidebarCollapsed ? label : undefined}
              >
                <Icon size={18} className={isActive ? 'text-gold' : 'text-gray-500'} />
                {!isLeftSidebarCollapsed && (
                  <span className="font-heading tracking-wide">{label}</span>
                )}
                {isActive && !isLeftSidebarCollapsed && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gold" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Trust badges */}
        {!isLeftSidebarCollapsed && (
          <div className="p-4 border-t border-charcoal-border space-y-2">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="px-2 py-0.5 rounded border border-red-500/50 text-red-400 font-bold text-xs">18+</span>
              <span>Only</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="px-2 py-0.5 rounded border border-green-500/50 text-green-400 font-bold text-xs">🔒</span>
              <span>Secure & Certified</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
