import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextType {
  isLeftSidebarOpen: boolean;
  isLeftSidebarCollapsed: boolean;
  toggleLeftSidebar: () => void;
  collapseLeftSidebar: () => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const toggleLeftSidebar = () => {
    setIsLeftSidebarOpen(prev => !prev);
  };

  const collapseLeftSidebar = () => {
    setIsLeftSidebarCollapsed(prev => !prev);
  };

  return (
    <SidebarContext.Provider value={{
      isLeftSidebarOpen,
      isLeftSidebarCollapsed,
      toggleLeftSidebar,
      collapseLeftSidebar,
      activeCategory,
      setActiveCategory,
    }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarContext() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebarContext must be used within SidebarProvider');
  return ctx;
}
