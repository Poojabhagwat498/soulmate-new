import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Eye, Clock, CheckCircle2, Heart, ArrowUpRight, Crown, Sparkles, 
  MessageSquare, User, TrendingUp, Bell, AlertTriangle, ShieldCheck, 
  ArrowRight, Search, Edit3, Settings 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  BarChart, Bar, CartesianGrid 
} from 'recharts';
import { PROFILES } from '../data';
import { useToast } from '../context/ToastContext';
import { FullscreenImageViewer } from '../components/FullscreenImageViewer';

interface DashboardProps {
  setCurrentTab: (tab: string) => void;
}

export function Dashboard({ setCurrentTab }: DashboardProps) {
  const { showToast } = useToast();
  const recommendedProfiles = PROFILES.slice(0, 4);

  // Fullscreen Image Viewer States
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [viewerImages, setViewerImages] = useState<string[]>([]);
  const [viewerInitialIndex, setViewerInitialIndex] = useState(0);

  const handleOpenViewer = (images: string[], index: number = 0, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card navigation
    setViewerImages(images);
    setViewerInitialIndex(index);
    setViewerIsOpen(true);
  };

  // Dynamic state for received interests
  const [receivedInterests, setReceivedInterests] = useState([
    {
      id: 'interest-1',
      name: 'Aditi Verma',
      profile: PROFILES[2],
      type: 'interest',
      time: '2 hours ago',
      verified: true
    },
    {
      id: 'interest-2',
      name: 'Ritika Sen',
      profile: PROFILES[1],
      type: 'visit',
      time: 'Yesterday',
      verified: false
    }
  ]);

  const handleAccept = (id: string, name: string) => {
    setReceivedInterests(prev => prev.filter(item => item.id !== id));
    showToast(`You accepted ${name}'s interest! Connection is now active.`, 'success');
  };

  const handleDismiss = (id: string, name: string) => {
    setReceivedInterests(prev => prev.filter(item => item.id !== id));
    showToast(`Notification for ${name} dismissed.`, 'info');
  };

  // Mock data for beautiful charts
  const statsData = [
    { name: 'Mon', views: 12, likes: 3 },
    { name: 'Tue', views: 19, likes: 6 },
    { name: 'Wed', views: 15, likes: 4 },
    { name: 'Thu', views: 24, likes: 9 },
    { name: 'Fri', views: 18, likes: 5 },
    { name: 'Sat', views: 30, likes: 12 },
    { name: 'Sun', views: 22, likes: 8 },
  ];

  const matchCompatibilityData = [
    { name: 'Priya', match: 94 },
    { name: 'Arjun', match: 88 },
    { name: 'Ananya', match: 92 },
    { name: 'Rohan', match: 78 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full px-4 md:px-10 py-6 space-y-8 max-w-7xl mx-auto pb-24"
    >
      {/* Welcome Greeting Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-primary/5 via-transparent to-transparent p-6 rounded-3xl border border-primary/5 shadow-xs">
        <div className="space-y-1">
          <h2 className="font-heading text-3xl font-extrabold text-on-surface tracking-tight">Welcome back, Arnav</h2>
          <p className="font-sans text-sm text-on-surface-variant/90 font-medium">Your journey to finding the perfect life partner is securely managed and updated.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button 
            onClick={() => setCurrentTab('discovery')}
            className="flex items-center gap-1.5 px-4.5 py-2.5 bg-primary hover:bg-primary/95 text-white font-extrabold text-xs rounded-xl transition-all active:scale-95 shadow-sm"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Find Matches</span>
          </button>
          <button 
            onClick={() => setCurrentTab('profile')}
            className="flex items-center gap-1.5 px-4.5 py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline-variant/30 font-extrabold text-xs rounded-xl transition-all active:scale-95"
          >
            <Edit3 className="w-3.5 h-3.5 text-primary" />
            <span>Edit Profile</span>
          </button>
        </div>
      </section>

      {/* Top 6 KPI Cards Row */}
      <section className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Card 1: Profile Completion */}
        <div className="bg-surface/60 backdrop-blur-md p-4.5 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-extrabold font-mono">Completion</span>
            <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
              <User className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-black text-primary tracking-tight">85%</p>
            <div className="w-full bg-outline-variant/30 h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>

        {/* Card 2: Interests Received */}
        <div className="bg-surface/60 backdrop-blur-md p-4.5 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-extrabold font-mono">Received</span>
            <div className="p-1.5 bg-pink-500/10 rounded-lg text-pink-500">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <p className="text-2xl font-black text-pink-500 tracking-tight">12</p>
            <p className="text-[9px] text-on-surface-variant/75 font-semibold">4 pending approval</p>
          </div>
        </div>

        {/* Card 3: Interests Sent */}
        <div className="bg-surface/60 backdrop-blur-md p-4.5 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-extrabold font-mono">Sent</span>
            <div className="p-1.5 bg-sky-500/10 rounded-lg text-sky-500">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <p className="text-2xl font-black text-sky-500 tracking-tight">8</p>
            <p className="text-[9px] text-on-surface-variant/75 font-semibold">3 accepted by partners</p>
          </div>
        </div>

        {/* Card 4: Matches */}
        <div className="bg-surface/60 backdrop-blur-md p-4.5 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-extrabold font-mono">Matches</span>
            <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-500">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <p className="text-2xl font-black text-emerald-500 tracking-tight">24</p>
            <p className="text-[9px] text-on-surface-variant/75 font-semibold">Based on community filters</p>
          </div>
        </div>

        {/* Card 5: Premium Status */}
        <div className="bg-surface/60 backdrop-blur-md p-4.5 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-extrabold font-mono">Membership</span>
            <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-500">
              <Crown className="w-4 h-4 fill-current" />
            </div>
          </div>
          <div className="space-y-0.5">
            <p className="text-lg font-black text-amber-600 tracking-tight">Gold Active</p>
            <p className="text-[9px] text-on-surface-variant/75 font-semibold">Expires: Oct 2026</p>
          </div>
        </div>

        {/* Card 6: Notifications */}
        <div className="bg-surface/60 backdrop-blur-md p-4.5 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-extrabold font-mono">Alerts</span>
            <div className="p-1.5 bg-violet-500/10 rounded-lg text-violet-500">
              <Bell className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <p className="text-2xl font-black text-violet-500 tracking-tight">3 New</p>
            <p className="text-[9px] text-on-surface-variant/75 font-semibold">Unread matching activities</p>
          </div>
        </div>
      </section>

      {/* Main Grid: Statistics & Charts, Recommended Matches, Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col (2 Columns wide on Desktop): Statistics / Activity Charts */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Glassmorphic Chart Activity Card */}
          <div className="bg-surface/40 backdrop-blur-md rounded-3xl p-6 border border-outline-variant/20 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div className="space-y-0.5">
                <h3 className="font-heading text-lg font-bold text-primary flex items-center gap-1.5">
                  <TrendingUp className="w-5 h-5" />
                  <span>Profile Engagement Tracking</span>
                </h3>
                <p className="text-xs text-on-surface-variant font-semibold">Tally of profile views and active likes over the past 7 days</p>
              </div>
              <span className="text-[10px] bg-primary/10 text-primary border border-primary/25 px-2.5 py-0.5 rounded-full font-extrabold font-mono uppercase tracking-wide">
                Live Data
              </span>
            </div>

            {/* Recharts Area Chart */}
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={statsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="rgba(0, 0, 0, 0.4)" fontSize={11} fontWeight={600} />
                  <YAxis stroke="rgba(0, 0, 0, 0.4)" fontSize={11} fontWeight={600} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      borderColor: 'rgba(0, 0, 0, 0.05)', 
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }} 
                  />
                  <Area type="monotone" dataKey="views" name="Profile Views" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                  <Area type="monotone" dataKey="likes" name="Likes / Interests" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorLikes)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recommended Profiles section */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <h3 className="font-sans text-lg font-bold text-on-surface">Recommended For You</h3>
              <button 
                onClick={() => setCurrentTab('discovery')}
                className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
              >
                <span>View All Recommendation Rules</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedProfiles.map((profile) => (
                <div 
                  key={profile.id} 
                  className="bg-surface/60 backdrop-blur-md rounded-2xl overflow-hidden border border-outline-variant/30 shadow-xs flex hover:shadow-md transition-shadow cursor-pointer relative"
                  onClick={() => setCurrentTab('discovery')}
                >
                  <div 
                    className="w-1/3 aspect-square relative shrink-0 cursor-zoom-in group"
                    onClick={(e) => {
                      const imgs = profile.images && profile.images.length > 0 ? profile.images : [profile.imageUrl];
                      handleOpenViewer(imgs, 0, e);
                    }}
                  >
                    <img src={profile.imageUrl} alt={profile.name} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" />
                    {profile.verified && (
                      <div className="absolute top-1.5 left-1.5 bg-emerald-500/10 text-emerald-600 border border-emerald-500/25 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <p className="font-heading text-sm font-bold text-on-surface">{profile.name}, {profile.age}</p>
                      <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">{profile.occupation}</p>
                      <p className="text-[10px] text-primary font-bold mt-1.5 font-mono">{profile.community} community</p>
                    </div>
                    <span className="text-[9px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-bold self-start border border-secondary/10">
                      92% Match Score
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: Received Interests, Announcements, Quick Actions */}
        <div className="space-y-6">
          
          {/* Received Interests Panel */}
          <div className="bg-surface/50 backdrop-blur-md p-5 rounded-3xl border border-outline-variant/20 shadow-xs space-y-4">
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-3">
              <h3 className="font-sans text-sm font-extrabold text-on-surface tracking-wide uppercase">Received Interests</h3>
              <span className="bg-primary-container text-on-primary-container font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
                {receivedInterests.length} pending
              </span>
            </div>

            {receivedInterests.length > 0 ? (
              <div className="space-y-3">
                {receivedInterests.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-3 bg-surface border border-outline-variant/30 rounded-xl flex items-center gap-3 shadow-xs hover:border-primary/20 transition-all cursor-pointer"
                  >
                    <img 
                      src={item.profile.imageUrl} 
                      alt={item.name} 
                      className="w-10 h-10 rounded-full object-cover shrink-0 cursor-zoom-in hover:ring-2 hover:ring-primary transition-all" 
                      onClick={(e) => {
                        const imgs = item.profile.images && item.profile.images.length > 0 ? item.profile.images : [item.profile.imageUrl];
                        handleOpenViewer(imgs, 0, e);
                      }}
                    />
                    <div className="flex-grow min-w-0">
                      <p className="text-xs font-bold text-on-surface truncate flex items-center gap-1">
                        {item.name} {item.verified && <CheckCircle2 className="w-3 h-3 text-primary" />}
                      </p>
                      <p className="text-[10px] text-on-surface-variant/70 truncate">
                        {item.type === 'interest' ? 'Sent you an interest request' : 'Visited your profile'}
                      </p>
                    </div>
                    
                    {item.type === 'interest' ? (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAccept(item.id, item.name);
                        }}
                        className="bg-primary hover:bg-primary/95 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-lg shrink-0 active:scale-95 transition-transform"
                      >
                        Accept
                      </button>
                    ) : (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDismiss(item.id, item.name);
                        }}
                        className="border border-outline-variant text-on-surface-variant hover:bg-surface-container text-[10px] font-extrabold px-3 py-1.5 rounded-lg shrink-0"
                      >
                        Dismiss
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-on-surface-variant font-medium text-center py-4">No pending interests or visits.</p>
            )}
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-surface/50 backdrop-blur-md p-5 rounded-3xl border border-outline-variant/20 shadow-xs space-y-3">
            <h3 className="font-sans text-sm font-extrabold text-on-surface tracking-wide uppercase">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2 font-sans text-xs">
              <button 
                onClick={() => setCurrentTab('profile')}
                className="p-3 bg-surface hover:bg-primary/5 rounded-2xl border border-outline-variant/30 text-left space-y-1 transition-colors"
              >
                <Edit3 className="w-5 h-5 text-primary" />
                <p className="font-bold">Edit Bio</p>
                <p className="text-[9px] text-on-surface-variant/80">Keep details up to date</p>
              </button>
              
              <button 
                onClick={() => setCurrentTab('discovery')}
                className="p-3 bg-surface hover:bg-primary/5 rounded-2xl border border-outline-variant/30 text-left space-y-1 transition-colors"
              >
                <Search className="w-5 h-5 text-primary" />
                <p className="font-bold">Search Filters</p>
                <p className="text-[9px] text-on-surface-variant/80">Manage match criteria</p>
              </button>

              <button 
                onClick={() => setCurrentTab('premium')}
                className="p-3 bg-surface hover:bg-primary/5 rounded-2xl border border-outline-variant/30 text-left space-y-1 transition-colors animate-pulse"
              >
                <Crown className="w-5 h-5 text-amber-500 fill-amber-500/20" />
                <p className="font-bold text-amber-600">Upgrade</p>
                <p className="text-[9px] text-amber-600/80">Get 10x more matches</p>
              </button>

              <button 
                onClick={() => showToast('Verify your Identity Card to earn double match priority!', 'info')}
                className="p-3 bg-surface hover:bg-primary/5 rounded-2xl border border-outline-variant/30 text-left space-y-1 transition-colors"
              >
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <p className="font-bold">Verify ID</p>
                <p className="text-[9px] text-on-surface-variant/80">Upload documents safely</p>
              </button>
            </div>
          </div>

          {/* Announcements Card */}
          <div className="bg-gradient-to-br from-amber-500/5 to-amber-500/10 border border-amber-500/10 rounded-3xl p-5 space-y-3 shadow-xs">
            <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1.5 font-sans">
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>Community Announcements</span>
            </h4>
            <div className="space-y-3 font-sans text-xs font-medium">
              <div className="space-y-1 border-l-2 border-amber-500/30 pl-2.5">
                <p className="font-bold text-on-surface">Annual Maratha & Kunbi Meetup</p>
                <p className="text-[10px] text-on-surface-variant leading-relaxed">Join our massive offline community networking meetup this Sunday at Pune Orchid Grand!</p>
              </div>
              <div className="space-y-1 border-l-2 border-amber-500/30 pl-2.5">
                <p className="font-bold text-on-surface">Secure Verification Priority</p>
                <p className="text-[10px] text-on-surface-variant leading-relaxed">Profiles with verified official ID cards receive 3x higher display visibility on the Search Feed.</p>
              </div>
            </div>
          </div>

        </div>

      </section>

      <FullscreenImageViewer 
        isOpen={viewerIsOpen}
        onClose={() => setViewerIsOpen(false)}
        images={viewerImages}
        initialIndex={viewerInitialIndex}
      />
    </motion.div>
  );
}
