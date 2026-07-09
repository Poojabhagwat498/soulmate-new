import React, { useState } from 'react';
import { 
  Heart, Shield, User, UserCheck, Bell, Settings, ChevronDown, 
  Menu, X, LayoutDashboard, Search, Crown, Check 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useToast } from '../context/ToastContext';

type AppRole = 'SUPER_ADMIN' | 'COMMUNITY_ADMIN' | 'USER';

interface HeaderProps {
  activeRole: AppRole;
  setActiveRole: (role: AppRole) => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  selectedCasteAdmin: { id: string; name: string; username: string };
  setSelectedCasteAdmin: (admin: { id: string; name: string; username: string }) => void;
  castes: { id: string; name: string; username: string }[];
}

export function Header({
  activeRole,
  setActiveRole,
  currentTab,
  setCurrentTab,
  selectedCasteAdmin,
  setSelectedCasteAdmin,
  castes
}: HeaderProps) {
  const { showToast } = useToast();
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const navigationTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'discovery', label: 'Search', icon: Search },
    { id: 'interests', label: 'Interests', icon: Heart },
    { id: 'premium', label: 'Premium', icon: Crown },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const handleRoleChange = (role: AppRole) => {
    setActiveRole(role);
    setIsRoleDropdownOpen(false);
    if (role === 'USER') {
      setCurrentTab('dashboard');
    }
    showToast(`Switched active workspace role to: ${role.replace('_', ' ')}`, 'success');
  };

  const getRoleLabel = (role: AppRole) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'Super Admin';
      case 'COMMUNITY_ADMIN': return `${selectedCasteAdmin.name} Admin`;
      case 'USER': return 'User Profile';
    }
  };

  const getRoleBadgeColor = (role: AppRole) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'bg-red-500/10 text-red-600 border border-red-500/20';
      case 'COMMUNITY_ADMIN': return 'bg-amber-500/10 text-amber-600 border border-amber-500/20';
      case 'USER': return 'bg-primary/10 text-primary border border-primary/20';
    }
  };

  const getRoleIcon = (role: AppRole) => {
    switch (role) {
      case 'SUPER_ADMIN': return <Shield className="w-4 h-4 text-red-600" />;
      case 'COMMUNITY_ADMIN': return <UserCheck className="w-4 h-4 text-amber-600" />;
      case 'USER': return <User className="w-4 h-4 text-primary" />;
    }
  };

  const notifications = [
    { id: 1, text: 'Priya Sharma accepted your interest! 🎉', time: '5m ago', unread: true },
    { id: 2, text: 'Arjun Mehta sent you an interest request.', time: '2h ago', unread: true },
    { id: 3, text: 'Your profile got verified by Super Admin.', time: '1d ago', unread: false },
  ];

  return (
    <header className="sticky top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-primary/5 px-4 md:px-8 h-16 flex items-center justify-between shadow-xs">
      {/* Left: Logo & Web Name */}
      <div 
        className="flex items-center gap-2 cursor-pointer active:scale-95 transition-transform"
        onClick={() => {
          setActiveRole('USER');
          setCurrentTab('landing');
        }}
      >
        <div className="text-primary flex items-center justify-center bg-primary/5 p-2 rounded-xl">
          <Heart className="w-6 h-6 fill-current text-primary animate-pulse" />
        </div>
        <span className="font-heading text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          SoulMate
        </span>
      </div>

      {/* Center: Empty or administrative mode active banner */}
      <nav className="hidden md:flex items-center gap-1">
        {activeRole !== 'USER' && (
          <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant/30 font-mono">
            🛡️ Administrative Mode Active
          </span>
        )}
      </nav>

      {/* Right: Notifications, Role Switcher, Avatar, Settings */}
      <div className="flex items-center gap-2 md:gap-3">
        
        {/* Notifications Icon with Badge */}
        <div className="relative">
          <button 
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              setIsSettingsOpen(false);
              setIsRoleDropdownOpen(false);
            }}
            className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 active:scale-95 transition-all rounded-xl border border-outline-variant/30"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-bounce" />
          </button>

          <AnimatePresence>
            {isNotificationsOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsNotificationsOpen(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 bg-surface border border-outline-variant/40 rounded-2xl p-4 shadow-xl z-20 space-y-3"
                >
                  <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                    <h4 className="font-heading font-bold text-sm text-primary">Notifications</h4>
                    <span className="text-[10px] text-primary font-bold cursor-pointer hover:underline" onClick={() => showToast('All notifications marked as read.', 'success')}>
                      Mark all read
                    </span>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-2.5 rounded-xl text-xs transition-colors hover:bg-primary/5 cursor-pointer ${n.unread ? 'bg-primary/5 border-l-2 border-primary' : ''}`}>
                        <p className="text-on-surface font-medium">{n.text}</p>
                        <p className="text-[10px] text-on-surface-variant/60 mt-1">{n.time}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Unified Premium User Profile Pill */}
        <div 
          onClick={() => {
            setActiveRole('USER');
            setCurrentTab('profile');
          }}
          className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-full bg-primary/5 hover:bg-primary/10 border border-primary/10 cursor-pointer active:scale-95 transition-all text-[10px] font-bold font-sans text-primary"
          id="header-user-profile-pill"
        >
          <div className="w-5.5 h-5.5 rounded-full overflow-hidden border border-primary/20 shadow-sm shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256" 
              alt="Arnav's Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="leading-tight text-on-surface font-black text-[10px] sm:text-[10.5px]">Arnav S.</span>
            <span className="text-[8px] text-amber-500 font-extrabold flex items-center gap-0.5">
              <Crown className="w-2 h-2 fill-current" /> Premium
            </span>
          </div>
        </div>

        {/* Settings Menu Button */}
        <div className="relative">
          <button 
            onClick={() => {
              setIsSettingsOpen(!isSettingsOpen);
              setIsNotificationsOpen(false);
              setIsRoleDropdownOpen(false);
            }}
            className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 active:scale-95 transition-all rounded-xl border border-outline-variant/30"
          >
            <Settings className="w-4 h-4" />
          </button>

          <AnimatePresence>
            {isSettingsOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsSettingsOpen(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-52 bg-surface border border-outline-variant/40 rounded-2xl p-2.5 shadow-xl z-20 space-y-1"
                >
                  <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest px-2.5 pb-1 border-b border-outline-variant/20 mb-1">
                    Settings Menu
                  </p>
                  <button 
                    onClick={() => {
                      setCurrentTab('profile');
                      setIsSettingsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all"
                  >
                    Edit My Profile
                  </button>
                  <button 
                    onClick={() => {
                      setCurrentTab('premium');
                      setIsSettingsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all"
                  >
                    My Membership Details
                  </button>
                  <button 
                    onClick={() => {
                      showToast('Security and log controls securely configured.', 'success');
                      setIsSettingsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all"
                  >
                    Privacy Settings
                  </button>

                  <div className="border-t border-outline-variant/20 pt-2 mt-2 space-y-1">
                    <p className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-widest px-2.5">
                      Operator Consoles
                    </p>
                    <button 
                      onClick={() => {
                        setActiveRole('USER');
                        setCurrentTab('dashboard');
                        setIsSettingsOpen(false);
                        showToast('Switched to User Profile', 'success');
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all flex items-center justify-between ${activeRole === 'USER' ? 'text-primary bg-primary/5' : 'text-on-surface-variant/70 hover:text-primary hover:bg-primary/5'}`}
                    >
                      <span>User Client</span>
                      {activeRole === 'USER' && <span className="w-1.5 h-1.5 bg-primary rounded-full" />}
                    </button>
                    <button 
                      onClick={() => {
                        setActiveRole('COMMUNITY_ADMIN');
                        setIsSettingsOpen(false);
                        showToast('Switched to Community Caste Admin', 'success');
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all flex items-center justify-between ${activeRole === 'COMMUNITY_ADMIN' ? 'text-primary bg-primary/5' : 'text-on-surface-variant/70 hover:text-primary hover:bg-primary/5'}`}
                    >
                      <span>Caste Admin Portal</span>
                      {activeRole === 'COMMUNITY_ADMIN' && <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />}
                    </button>
                    <button 
                      onClick={() => {
                        setActiveRole('SUPER_ADMIN');
                        setIsSettingsOpen(false);
                        showToast('Switched to Super Admin Console', 'success');
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all flex items-center justify-between ${activeRole === 'SUPER_ADMIN' ? 'text-primary bg-primary/5' : 'text-on-surface-variant/70 hover:text-primary hover:bg-primary/5'}`}
                    >
                      <span>Super Admin Portal</span>
                      {activeRole === 'SUPER_ADMIN' && <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />}
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile menu trigger */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-on-surface-variant hover:text-primary rounded-xl hover:bg-primary/5 transition-colors border border-outline-variant/30"
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-16 bg-black/60 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-16 right-0 bottom-0 w-64 bg-surface border-l border-primary/5 z-50 p-4 md:hidden flex flex-col gap-4 shadow-2xl"
            >
              <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest border-b border-outline-variant/20 pb-1.5">
                Navigation
              </p>
              
              <div className="flex flex-col gap-1.5">
                {activeRole === 'USER' ? (
                  navigationTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = currentTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setCurrentTab(tab.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold font-sans transition-all ${
                          isActive 
                            ? 'text-primary bg-primary/5' 
                            : 'text-on-surface-variant/70 hover:text-primary hover:bg-primary/5'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })
                ) : (
                  <div className="p-3 bg-primary/5 border border-primary/10 rounded-xl text-center">
                    <p className="text-xs font-bold text-primary">Administrative Panel Active</p>
                    <p className="text-[10px] text-on-surface-variant/80 mt-1">Please use role dropdown to return to user client flow</p>
                  </div>
                )}
              </div>

              <div className="mt-auto border-t border-outline-variant/20 pt-4 text-center">
                <p className="text-[11px] text-on-surface-variant/60 font-mono">SoulMate Workspace v1.4</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
