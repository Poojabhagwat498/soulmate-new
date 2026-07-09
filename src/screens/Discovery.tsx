import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, SlidersHorizontal, CheckCircle2, MapPin, Briefcase, Heart, 
  X, Star, Sliders, ArrowUpDown, ShieldCheck, Award, User, RefreshCw,
  ChevronDown, ChevronUp, BookOpen, DollarSign, Home, Globe, Activity, Crown,
  Maximize2
} from 'lucide-react';
import { PROFILES } from '../data';
import { useToast } from '../context/ToastContext';
import { VerificationStatus } from '../components/VerificationStatus';
import { FullscreenImageViewer } from '../components/FullscreenImageViewer';

interface DiscoveryProps {
  onProfileClick: (id: string) => void;
}

function DiscoverySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div 
          key={i} 
          className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-slate-900 flex flex-col justify-end p-6 border border-white/5 shadow-inner group"
        >
          {/* Animated gradient shimmer overlay */}
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.6, 
              ease: "linear" 
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent z-0 pointer-events-none"
          />

          {/* Background loading glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0 pointer-events-none" />

          {/* Top Badge Skeletons */}
          <div className="absolute top-4 right-4 flex gap-1.5 z-10">
            <div className="bg-white/10 w-20 h-6 rounded-full relative overflow-hidden">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "linear", delay: 0.2 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />
            </div>
          </div>

          {/* Detail Skeletons */}
          <div className="space-y-4 z-10 w-full relative">
            {/* Title / Name Skeleton */}
            <div className="h-7 bg-white/10 rounded-xl w-3/5 relative overflow-hidden">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "linear", delay: 0.4 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />
            </div>

            {/* Subtitle Community / Location Skeleton */}
            <div className="h-4 bg-white/5 rounded-lg w-2/5 relative overflow-hidden">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "linear", delay: 0.6 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />
            </div>

            {/* Bio line items skeletons */}
            <div className="space-y-2 pt-1 border-t border-white/5">
              <div className="h-4 bg-white/5 rounded-lg w-4/5 relative overflow-hidden">
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: "linear", delay: 0.8 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />
              </div>
              <div className="h-4 bg-white/5 rounded-lg w-3/4 relative overflow-hidden">
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: "linear", delay: 1.0 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />
              </div>
            </div>

            {/* Actions / Badges bottom line skeleton */}
            <div className="flex justify-between items-center pt-3 border-t border-white/5">
              <div className="w-24 h-6 rounded-full bg-white/10 relative overflow-hidden">
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: "linear", delay: 1.2 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />
              </div>
              <div className="flex gap-2">
                <div className="w-9 h-9 rounded-full bg-white/10 relative overflow-hidden">
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "linear", delay: 1.4 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  />
                </div>
                <div className="w-9 h-9 rounded-full bg-white/10 relative overflow-hidden">
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "linear", delay: 1.6 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Discovery({ onProfileClick }: DiscoveryProps) {
  const { showToast } = useToast();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState('Recommended');

  // Advanced Collapsible Categories on Sidebar
  const [expandedSection, setExpandedSection] = useState<string | null>('basic');

  // Filter States
  const [filters, setFilters] = useState({
    name: '',
    gender: 'Any',
    minAge: 20,
    maxAge: 45,
    minHeight: 145, // in cm
    maxHeight: 195,
    religion: 'Any',
    community: 'Any',
    subCommunity: '',
    gotra: '',
    motherTongue: 'Any',
    qualification: 'Any',
    degree: '',
    occupation: 'Any',
    company: '',
    incomeRange: 'Any',
    country: 'Any',
    state: '',
    city: '',
    familyType: 'Any',
    familyValues: 'Any',
    diet: 'Any',
    smoking: 'Any',
    drinking: 'Any',
    verifiedOnly: false,
    premiumOnly: false,
    onlineNow: false,
    hasPhoto: false,
    hasBio: false,
  });

  // Applied Filter State copy to trigger refiltering
  const [appliedFilters, setAppliedFilters] = useState({ ...filters });

  // Saved Filters preset list
  const [savedFiltersCount, setSavedFiltersCount] = useState(0);

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

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchQuery, appliedFilters, sortOption]);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
    setIsFilterOpen(false);
    showToast('Filters applied successfully!', 'success');
  };

  const handleResetFilters = () => {
    const defaultFilters = {
      name: '',
      gender: 'Any',
      minAge: 20,
      maxAge: 45,
      minHeight: 145,
      maxHeight: 195,
      religion: 'Any',
      community: 'Any',
      subCommunity: '',
      gotra: '',
      motherTongue: 'Any',
      qualification: 'Any',
      degree: '',
      occupation: 'Any',
      company: '',
      incomeRange: 'Any',
      country: 'Any',
      state: '',
      city: '',
      familyType: 'Any',
      familyValues: 'Any',
      diet: 'Any',
      smoking: 'Any',
      drinking: 'Any',
      verifiedOnly: false,
      premiumOnly: false,
      onlineNow: false,
      hasPhoto: false,
      hasBio: false,
    };
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    setIsFilterOpen(false);
    showToast('All filters have been reset.', 'info');
  };

  const handleSaveFilterPreset = () => {
    setSavedFiltersCount(prev => prev + 1);
    showToast('Active filters saved as a quick launch preset!', 'success');
  };

  const [savedProfileIds, setSavedProfileIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('saved_interests_profiles');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleToggleSave = (e: React.MouseEvent, profileId: string, profileName: string) => {
    e.stopPropagation();
    const isSaved = savedProfileIds.includes(profileId);
    let updated: string[];
    if (isSaved) {
      updated = savedProfileIds.filter(id => id !== profileId);
      showToast(`${profileName.split(' ')[0]} removed from saved interests.`, 'info');
    } else {
      updated = [...savedProfileIds, profileId];
      showToast(`${profileName.split(' ')[0]} saved to your interests!`, 'success');
    }
    setSavedProfileIds(updated);
    localStorage.setItem('saved_interests_profiles', JSON.stringify(updated));
  };

  const handleLike = (name: string) => {
    showToast(`Interest request sent to ${name.split(' ')[0]}! We will notify you once they accept.`, 'success');
  };

  // Profile Filtering Logic
  const filteredProfiles = PROFILES.filter(profile => {
    // Search Query (covers name, location, profession, community)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        profile.name.toLowerCase().includes(q) ||
        profile.occupation.toLowerCase().includes(q) ||
        profile.location.toLowerCase().includes(q) ||
        (profile.community && profile.community.toLowerCase().includes(q));
      if (!matchesSearch) return false;
    }

    // Name filter
    if (appliedFilters.name && !profile.name.toLowerCase().includes(appliedFilters.name.toLowerCase())) {
      return false;
    }

    // Gender
    if (appliedFilters.gender !== 'Any') {
      if (profile.gender && profile.gender !== appliedFilters.gender) {
        return false;
      }
    }

    // Age
    if (profile.age < appliedFilters.minAge || profile.age > appliedFilters.maxAge) {
      return false;
    }

    // Height
    if (profile.height) {
      const heightInCm = profile.height.includes('ft') 
        ? 170 // standard conversion fallback
        : parseInt(profile.height) || 170;
      if (heightInCm < appliedFilters.minHeight || heightInCm > appliedFilters.maxHeight) {
        // Just let it pass unless strictly mismatching
      }
    }

    // Religion / Community
    if (appliedFilters.religion !== 'Any') {
      if (profile.community && !profile.community.toLowerCase().includes(appliedFilters.religion.toLowerCase())) {
        return false;
      }
    }

    // Community
    if (appliedFilters.community !== 'Any') {
      if (profile.community && !profile.community.toLowerCase().includes(appliedFilters.community.toLowerCase())) {
        return false;
      }
    }

    // Verified
    if (appliedFilters.verifiedOnly && !profile.verified) {
      return false;
    }

    // Premium
    if (appliedFilters.premiumOnly && profile.id === '4') { // Mock premium constraint for Rohan
      return false;
    }

    // Diet
    if (appliedFilters.diet !== 'Any' && profile.diet && profile.diet !== appliedFilters.diet) {
      return false;
    }

    return true;
  });

  // Sorting Logic
  const sortedProfiles = [...filteredProfiles].sort((a, b) => {
    switch (sortOption) {
      case 'Age Low → High':
        return a.age - b.age;
      case 'Age High → Low':
        return b.age - a.age;
      case 'Newest':
        return b.id.localeCompare(a.id);
      case 'Oldest':
        return a.id.localeCompare(b.id);
      case 'Recommended':
      default:
        return b.verified ? 1 : -1;
    }
  });

  // Clean label generator for active filters list
  const getActiveFilterChips = () => {
    const chips = [];
    if (appliedFilters.name) chips.push({ key: 'name', val: `Name: ${appliedFilters.name}` });
    if (appliedFilters.gender !== 'Any') chips.push({ key: 'gender', val: `Gender: ${appliedFilters.gender}` });
    if (appliedFilters.minAge !== 20 || appliedFilters.maxAge !== 45) chips.push({ key: 'age', val: `Age: ${appliedFilters.minAge}-${appliedFilters.maxAge}` });
    if (appliedFilters.religion !== 'Any') chips.push({ key: 'religion', val: `Religion: ${appliedFilters.religion}` });
    if (appliedFilters.community !== 'Any') chips.push({ key: 'community', val: `Community: ${appliedFilters.community}` });
    if (appliedFilters.verifiedOnly) chips.push({ key: 'verifiedOnly', val: 'Verified Only' });
    if (appliedFilters.premiumOnly) chips.push({ key: 'premiumOnly', val: 'Premium Only' });
    return chips;
  };

  const removeFilterChip = (key: string) => {
    const nextFilters = { ...filters };
    if (key === 'name') nextFilters.name = '';
    if (key === 'gender') nextFilters.gender = 'Any';
    if (key === 'age') { nextFilters.minAge = 20; nextFilters.maxAge = 45; }
    if (key === 'religion') nextFilters.religion = 'Any';
    if (key === 'community') nextFilters.community = 'Any';
    if (key === 'verifiedOnly') nextFilters.verifiedOnly = false;
    if (key === 'premiumOnly') nextFilters.premiumOnly = false;

    setFilters(nextFilters);
    setAppliedFilters(nextFilters);
    showToast('Removed filter chip.', 'info');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full min-h-screen bg-background pb-24"
    >
      {/* Top Banner / Hero Header */}
      <div className="w-full bg-gradient-to-br from-primary/5 via-transparent to-transparent py-6 border-b border-outline-variant/10">
        <div className="w-full px-4 md:px-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
          <div>
            <span className="text-primary font-sans text-[10px] font-extrabold uppercase tracking-widest pl-0.5">Discover SoulMate Matches</span>
            <h1 className="font-heading text-3xl font-black text-on-surface tracking-tight mt-1">Refined Partner Discovery</h1>
          </div>
          <span className="text-xs font-bold text-on-surface-variant bg-surface-container border border-outline-variant/30 px-3 py-1.5 rounded-full font-mono">
            {filteredProfiles.length} candidate profiles matches active criteria
          </span>
        </div>
      </div>

      <div className="w-full px-4 md:px-10 max-w-7xl mx-auto mt-6">
        <div className="w-full">
          
          {/* ==========================================
              MAIN DISCOVERY INTERFACE (FULL WIDTH)
              ========================================== */}
          <div className="flex-1 w-full space-y-6">
            
            {/* Control Bar: Real-time search, Filter Drawer Trigger, Sorting */}
            <div className="bg-surface/60 backdrop-blur-md p-4 rounded-2xl border border-outline-variant/20 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Search Field */}
              <div className="relative group w-full md:max-w-md">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type name, community, occupation or location..." 
                  className="w-full h-11 pl-11 pr-4 rounded-xl border border-outline-variant/30 bg-surface text-on-surface placeholder:text-on-surface-variant/70 focus:ring-1 focus:ring-primary outline-none transition-all duration-300 font-sans text-xs font-semibold"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant group-focus-within:text-primary" />
              </div>

              {/* Filter and Sorting Actions */}
              <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-between md:justify-end">
                {/* Filter Trigger Button */}
                <button 
                  onClick={() => setIsFilterOpen(true)}
                  className="flex items-center gap-1.5 px-4 h-11 bg-primary text-white font-extrabold text-xs rounded-xl shadow-xs active:scale-95 transition-transform"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filter</span>
                </button>

                {/* Sorting Select */}
                <div className="flex items-center gap-1.5 bg-surface border border-outline-variant/30 rounded-xl px-3 h-11">
                  <ArrowUpDown className="w-3.5 h-3.5 text-on-surface-variant" />
                  <select 
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="bg-transparent outline-none text-xs font-extrabold font-sans text-on-surface cursor-pointer pr-1"
                  >
                    <option value="Recommended">Recommended</option>
                    <option value="Age Low → High">Age: Low → High</option>
                    <option value="Age High → Low">Age: High → Low</option>
                    <option value="Newest">Newest Members</option>
                    <option value="Oldest">Oldest Members</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Active Filter Chips */}
            {getActiveFilterChips().length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 bg-surface-container-low/50 p-3 rounded-xl border border-outline-variant/10">
                <span className="text-[10px] text-on-surface-variant font-extrabold uppercase font-mono mr-1">Active Criteria:</span>
                {getActiveFilterChips().map(chip => (
                  <div 
                    key={chip.key}
                    className="flex items-center gap-1 bg-primary/10 text-primary border border-primary/15 px-3 py-1 rounded-full text-xs font-bold"
                  >
                    <span>{chip.val}</span>
                    <button onClick={() => removeFilterChip(chip.key)} className="hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={handleResetFilters}
                  className="text-[10px] text-red-500 hover:underline font-bold ml-auto pr-1"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Profiles Feed (Responsive Grid, 100% full-screen width) */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <DiscoverySkeleton />
                </motion.div>
              ) : sortedProfiles.length > 0 ? (
                <motion.div 
                  key="grid"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.08
                      }
                    }
                  }}
                  className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {sortedProfiles.map((profile) => (
                    <motion.div 
                      key={profile.id} 
                      onClick={() => onProfileClick(profile.id)}
                      variants={{
                        hidden: { opacity: 0, y: 20, scale: 0.95 },
                        visible: { 
                          opacity: 1, 
                          y: 0, 
                          scale: 1,
                          transition: { type: 'spring', stiffness: 100, damping: 15 }
                        }
                      }}
                      whileHover={{ 
                        y: -8, 
                        scale: 1.02,
                        boxShadow: '0 15px 25px -5px rgba(0,0,0,0.3), 0 0 15px 4px rgba(225, 29, 72, 0.12)'
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="group relative aspect-[3.7/5] rounded-2xl overflow-hidden bg-surface-container-highest shadow-xs hover:shadow-lg transition-all duration-500 cursor-pointer border border-outline-variant/10"
                    >
                      <img 
                        src={profile.imageUrl} 
                        alt={profile.name} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-zoom-in" 
                        onClick={(e) => {
                          const imgs = profile.images && profile.images.length > 0 ? profile.images : [profile.imageUrl];
                          handleOpenViewer(imgs, 0, e);
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-300 group-hover:via-black/50 pointer-events-none"></div>
                      
                      {/* Top-Left: Photos Preview Button */}
                      <div className="absolute top-3 left-3 z-10">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            const imgs = profile.images && profile.images.length > 0 ? profile.images : [profile.imageUrl];
                            handleOpenViewer(imgs, 0, e);
                          }}
                          className="bg-black/45 hover:bg-black/65 text-white border border-white/10 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1 shadow-md text-[8px] font-extrabold uppercase tracking-wider transition-all"
                        >
                          <Maximize2 className="w-2.5 h-2.5" />
                          <span>Photos</span>
                        </motion.button>
                      </div>

                      {/* Top Badges */}
                      <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-1">
                        {profile.verified && (
                          <div className="bg-emerald-500 text-white border border-emerald-400/25 px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-md">
                            <CheckCircle2 className="w-2.5 h-2.5 fill-current" />
                            <span className="text-[8px] font-extrabold uppercase tracking-wider">Verified</span>
                          </div>
                        )}
                        {profile.id === '1' && (
                          <div className="bg-amber-500 text-white border border-amber-400/25 px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-md">
                            <Crown className="w-2.5 h-2.5 fill-current" />
                            <span className="text-[8px] font-extrabold uppercase tracking-wider">Premium</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Details Area */}
                      <div className="absolute bottom-0 w-full p-4 text-white z-10 space-y-2">
                        <div className="transform transition-transform duration-300 group-hover:-translate-y-0.5">
                          <h3 className="font-sans text-sm sm:text-base font-black flex items-center gap-1.5 truncate">
                            {profile.name}, {profile.age}
                          </h3>
                          <p className="text-[8px] sm:text-[9px] text-amber-300 font-bold tracking-wider font-mono uppercase mt-0.5">
                            {profile.community} • {profile.location}
                          </p>
                        </div>

                        <div className="flex flex-col gap-0.5 text-[10px] opacity-85 font-sans font-medium transform transition-all duration-300 group-hover:-translate-y-0.5">
                          <span className="flex items-center gap-1 truncate">
                            <Briefcase className="w-3 h-3 shrink-0 text-primary-container" />
                            {profile.occupation}
                          </span>
                          <span className="flex items-center gap-1 truncate">
                            <User className="w-3 h-3 shrink-0 text-primary-container" />
                            {profile.height ? `${profile.height}` : 'Not Specified'} • {profile.maritalStatus}
                          </span>
                        </div>

                        <div className="flex justify-between items-center gap-1.5 pt-2 border-t border-white/10">
                          <span className="text-[8px] bg-secondary-container/90 text-on-secondary-container font-extrabold px-2 py-0.5 rounded-full border border-secondary/15">
                            95% Match
                          </span>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {/* Save to interest / Bookmark */}
                            <motion.button 
                              whileHover={{ scale: 1.15, rotate: 12 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => handleToggleSave(e, profile.id, profile.name)}
                              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all shadow-md ${
                                savedProfileIds.includes(profile.id)
                                  ? 'bg-amber-500 text-white'
                                  : 'bg-white/20 backdrop-blur-md text-white hover:bg-white/35 border border-white/15'
                              }`}
                              title="Bookmark Profile"
                            >
                              <Star className={`w-3.5 h-3.5 ${savedProfileIds.includes(profile.id) ? 'fill-current' : ''}`} />
                            </motion.button>

                            {/* Direct Like / Send Interest */}
                            <motion.button 
                              whileHover={{ scale: 1.15, rotate: -12 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLike(profile.name);
                              }}
                              className="w-7 h-7 rounded-full bg-white hover:bg-rose-50 text-rose-600 flex items-center justify-center shadow-md"
                              title="Express Interest"
                            >
                              <Heart className="w-3.5 h-3.5 fill-current" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-16 text-center bg-surface-container-low/50 rounded-3xl border border-dashed border-outline-variant p-6 space-y-4"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Search className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-sans text-lg font-bold text-on-surface">No matches correspond to active filters</h3>
                    <p className="text-on-surface-variant text-xs px-4">
                      Try resetting your community criteria, demographics ranges, or name input to display more candidates.
                    </p>
                  </div>
                  <button 
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold shadow-sm active:scale-95 transition-all"
                  >
                    Clear Filter Restrictions
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </div>

      {/* ==========================================
          MOBILE ADVANCED DRAWER FILTER PANEL
          ========================================== */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-xs"
            />
            
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-surface z-[70] shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-outline-variant/20">
                <h3 className="font-heading text-lg font-bold text-primary">Refine Search Filters</h3>
                <button onClick={() => setIsFilterOpen(false)} className="p-2 -mr-2 text-on-surface-variant hover:text-primary">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                
                {/* Collapsible Basic Info */}
                <div className="space-y-3 font-sans text-xs font-semibold">
                  <h4 className="text-[10px] font-extrabold uppercase text-on-surface-variant/80 tracking-widest">Basic & Demographics</h4>
                  <div className="space-y-1">
                    <label className="text-on-surface-variant">Name keyword</label>
                    <input 
                      type="text" 
                      value={filters.name}
                      onChange={(e) => setFilters({...filters, name: e.target.value})}
                      placeholder="e.g. Priya"
                      className="w-full bg-surface border border-outline-variant/30 rounded-xl px-3 py-2 outline-none text-on-surface"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-on-surface-variant">Looking For</label>
                    <select 
                      value={filters.gender}
                      onChange={(e) => setFilters({...filters, gender: e.target.value})}
                      className="w-full bg-surface border border-outline-variant/30 rounded-xl px-2.5 py-2 outline-none text-on-surface"
                    >
                      <option value="Any">Any Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                {/* Collapsible Community Info */}
                <div className="space-y-3 font-sans text-xs font-semibold border-t border-outline-variant/10 pt-4">
                  <h4 className="text-[10px] font-extrabold uppercase text-on-surface-variant/80 tracking-widest">Community Details</h4>
                  <div className="space-y-1">
                    <label className="text-on-surface-variant">Religion</label>
                    <select 
                      value={filters.religion}
                      onChange={(e) => setFilters({...filters, religion: e.target.value})}
                      className="w-full bg-surface border border-outline-variant/30 rounded-xl px-2.5 py-2 outline-none text-on-surface"
                    >
                      <option value="Any">Any Religion</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Sikh">Sikh</option>
                      <option value="Jain">Jain</option>
                      <option value="Muslim">Muslim</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-on-surface-variant">Community</label>
                    <select 
                      value={filters.community}
                      onChange={(e) => setFilters({...filters, community: e.target.value})}
                      className="w-full bg-surface border border-outline-variant/30 rounded-xl px-2.5 py-2 outline-none text-on-surface"
                    >
                      <option value="Any">Any Community</option>
                      <option value="Brahmin">Brahmin</option>
                      <option value="Maratha">Maratha</option>
                      <option value="Gujarati">Gujarati</option>
                      <option value="Bengali">Bengali</option>
                      <option value="Tamil Brahmin">Tamil Brahmin</option>
                    </select>
                  </div>
                </div>

                {/* Status switches */}
                <div className="space-y-2 font-sans text-xs font-bold border-t border-outline-variant/10 pt-4">
                  <label className="flex items-center gap-2 cursor-pointer py-1 text-on-surface">
                    <input 
                      type="checkbox"
                      checked={filters.verifiedOnly}
                      onChange={(e) => setFilters({...filters, verifiedOnly: e.target.checked})}
                      className="rounded accent-primary w-4 h-4"
                    />
                    <span>Verified Profiles Only</span>
                  </label>
                </div>

              </div>

              <div className="p-5 border-t border-outline-variant/25 flex gap-3">
                <button onClick={handleResetFilters} className="flex-1 py-3 border border-primary text-primary rounded-xl font-sans text-xs font-bold">
                  Reset
                </button>
                <button onClick={handleApplyFilters} className="flex-[2] py-3 bg-primary text-white rounded-xl font-sans text-xs font-bold shadow-md">
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <FullscreenImageViewer 
        isOpen={viewerIsOpen}
        onClose={() => setViewerIsOpen(false)}
        images={viewerImages}
        initialIndex={viewerInitialIndex}
      />

    </motion.div>
  );
}
