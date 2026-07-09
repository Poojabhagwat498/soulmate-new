import React, { useState } from 'react';
import { LayoutDashboard } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { BottomNav } from './components/Navigation';
import { Header } from './components/Header';
import { Dashboard } from './screens/Dashboard';
import { Discovery } from './screens/Discovery';
import { Interests } from './screens/Interests';
import { ProfileDetail } from './screens/ProfileDetail';
import { Profile } from './screens/Profile';
import { ToastProvider } from './context/ToastContext';
import { SuperAdminDashboard } from './screens/SuperAdminDashboard';
import { CommunityAdminDashboard } from './screens/CommunityAdminDashboard';
import { SubscriptionPage } from './screens/SubscriptionPage';
import { LandingPage } from './screens/LandingPage';

type AppRole = 'SUPER_ADMIN' | 'COMMUNITY_ADMIN' | 'USER';

export default function App() {
  // Active Role State
  const [activeRole, setActiveRole] = useState<AppRole>('USER');

  // User tab
  const [currentTab, setCurrentTab] = useState('landing');
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

  // Community Admin state
  const [selectedCasteAdmin, setSelectedCasteAdmin] = useState({
    id: 'c-1',
    name: 'Maratha',
    username: 'maratha_admin'
  });

  const handleProfileClick = (id: string) => {
    setSelectedProfileId(id);
  };

  // Switch community admin roster
  const castes = [
    { id: 'c-1', name: 'Maratha', username: 'maratha_admin' },
    { id: 'c-2', name: 'Kunbi', username: 'kunbi_admin' },
    { id: 'c-5', name: 'Brahmin', username: 'brahmin_admin' }
  ];

  return (
    <ToastProvider>
      <div className="h-screen bg-background text-on-background relative w-full flex flex-col overflow-hidden">
        
        {/* ==========================================
            UNIFIED HEADER / NAVBAR WITH ROLE SWITCHER
            ========================================== */}
        {(activeRole !== 'USER' || currentTab !== 'landing') && (
          <Header 
            activeRole={activeRole}
            setActiveRole={setActiveRole}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            selectedCasteAdmin={selectedCasteAdmin}
            setSelectedCasteAdmin={setSelectedCasteAdmin}
            castes={castes}
          />
        )}

        {/* ==========================================
            LAYOUT: STANDARD USER CLIENT FLOW (FULL SCREEN)
            ========================================== */}
        {activeRole === 'USER' && (
          currentTab === 'landing' ? (
            <div className="w-full h-full overflow-y-auto bg-slate-50">
              <LandingPage onEnterApp={(tab) => {
                setCurrentTab(tab || 'dashboard');
              }} />
            </div>
          ) : (
            <div className="flex-1 flex flex-col relative w-full overflow-hidden">
              
              {/* Content Area - Full screen width, scrollable */}
              <main className="w-full flex-1 overflow-y-auto pb-24">
                {currentTab === 'dashboard' && <Dashboard setCurrentTab={setCurrentTab} />}
                {currentTab === 'discovery' && <Discovery onProfileClick={handleProfileClick} />}
                {currentTab === 'interests' && <Interests />}
                {currentTab === 'premium' && <SubscriptionPage />}
                {currentTab === 'profile' && <Profile />}
              </main>

              {/* Bottom Navigation (Only visible on Mobile viewports) */}
              {!selectedProfileId && (
                <BottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
              )}

              {/* Overlays Detail */}
              <AnimatePresence>
                {selectedProfileId && (
                  <ProfileDetail 
                    profileId={selectedProfileId} 
                    onBack={() => setSelectedProfileId(null)} 
                    onUpgradeClick={() => {
                      setCurrentTab('premium');
                      setSelectedProfileId(null);
                    }}
                  />
                )}
              </AnimatePresence>
            </div>
          )
        )}

        {/* ==========================================
            LAYOUT: ADMINISTRATOR VIEWS (SUPER & CASTE) (FULL SCREEN)
            ========================================== */}
        {(activeRole === 'SUPER_ADMIN' || activeRole === 'COMMUNITY_ADMIN') && (
          <div className="flex-grow flex flex-col bg-background text-on-background h-[calc(100vh-4rem)] overflow-hidden">
            
            {/* Inner Admin Canvas Workspace with Sidebar Grid */}
            <div className="flex-grow flex flex-col lg:flex-row">
              
              {/* Left Admin Navigation Sidebar */}
              <aside className="w-full lg:w-64 bg-surface-container-low border-r border-outline-variant/30 p-5 space-y-6 shrink-0 overflow-y-auto">
                <div className="space-y-1.5">
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest pl-2">Console Scope</p>
                  <div className="p-3 bg-surface rounded-xl border border-primary/5 shadow-sm space-y-1 font-sans">
                    <p className="text-xs font-bold text-primary">Signed Operator:</p>
                    <p className="text-[11px] text-on-surface-variant font-medium truncate">
                      {activeRole === 'SUPER_ADMIN' ? 'admin@soulmate.org' : selectedCasteAdmin.username}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 font-sans text-xs font-bold text-on-surface-variant">
                  <div className="space-y-1">
                    <p className="text-[9px] text-on-surface-variant/70 uppercase tracking-widest pl-2">Core Services</p>
                    <div className="p-1.5 bg-primary text-white rounded-lg flex items-center gap-2">
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Console Dashboard</span>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Main Workspace Frame */}
              <main className="flex-1 p-6 space-y-8 bg-surface-container-low/10 overflow-y-auto custom-scrollbar">
                {activeRole === 'SUPER_ADMIN' ? (
                  <SuperAdminDashboard />
                ) : (
                  <CommunityAdminDashboard 
                    assignedCommunityId={selectedCasteAdmin.id} 
                    assignedCommunityName={selectedCasteAdmin.name} 
                    adminUsername={selectedCasteAdmin.username}
                  />
                )}
              </main>

            </div>

          </div>
        )}

      </div>
    </ToastProvider>
  );
}
