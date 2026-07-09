import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, ChevronRight, Award, Image as ImageIcon, Briefcase, Heart, 
  ShieldCheck, FileText, Link2, X, Loader2, Trash2, Upload, Settings,
  MapPin, BookOpen, Users as UsersIcon, HeartHandshake, Smile, Check, AlertCircle,
  Eye
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { VerificationStatus } from '../components/VerificationStatus';
import { FullscreenImageViewer } from '../components/FullscreenImageViewer';

interface ProfileData {
  name: string;
  gender: string;
  dob: string;
  height: string;
  weight: string;
  bloodGroup: string;
  maritalStatus: string;
  numberOfChildren: number;
  motherTongue: string;
  languagesKnown: string[];
  religion: string;
  community: string;
  subCaste: string;
  gotra: string;
  nativePlace: string;
  highestQualification: string;
  degree: string;
  specialization: string;
  college: string;
  passingYear: number;
  occupation: string;
  companyName: string;
  jobTitle: string;
  employmentType: string;
  income: string;
  workLocation: string;
  country: string;
  state: string;
  district: string;
  city: string;
  pinCode: string;
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  brothers: number;
  sisters: number;
  familyType: string;
  familyValues: string;
  familyStatus: string;
  diet: string;
  smoking: string;
  drinking: string;
  fitnessLevel: string;
  hobbies: string[];
  interests: string[];
  languagesSpoken: string[];
  pets: string;
  disabilityStatus: string;
  bio: string;
  expectations: string;
  complexion: string;
  bodyType: string;
  zodiacSign: string;
  aadhaar: string;
  pan: string;
  governmentId: string;
}

export function Profile() {
  const { showToast } = useToast();
  const [isVerified, setIsVerified] = useState(true);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyMethodName, setVerifyMethodName] = useState('');
  
  // Edit Profile Modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeFormSection, setActiveFormSection] = useState<'basic' | 'community' | 'education_career' | 'address' | 'family' | 'lifestyle' | 'personal' | 'docs'>('basic');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Multiple Photos Gallery State
  const [photos, setPhotos] = useState<string[]>(() => {
    const saved = localStorage.getItem('soulmate_profile_photos');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBUY9DUJaTLM0V9UjdiNwhcfjTJMWNGEiFZ1VVB5lPbHTMJcvG_0GdHY9KeBPJAwbntssV2PKPE162s5M-fDU-bRtapSvBR-pUF6mXGaf2b7knGZ5Jdsj9qCkOHrMlXFSyIgHHqkqzTsaoV-XJFAw4iF2i7ds1vqgGF4_Q54vLExBle9UVcyrhcXQbElRmH3y1Fa2XZqVJjE4Wxcw44ueScsZkXeOTMQVjY7oR0IffxRS3SJ7TWUiGdKKt18HfysRxJq2ne-scNhL-e',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=640'
    ];
  });
  const [isDragging, setIsDragging] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  // Fullscreen Image Viewer States
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [viewerImages, setViewerImages] = useState<string[]>([]);
  const [viewerInitialIndex, setViewerInitialIndex] = useState(0);

  const handleOpenViewer = (images: string[], index: number = 0) => {
    setViewerImages(images);
    setViewerInitialIndex(index);
    setViewerIsOpen(true);
  };

  // Email Preference Toggles State
  const [emailPrefs, setEmailPrefs] = useState(() => {
    const saved = localStorage.getItem('soulmate_email_prefs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      likes: true,
      matches: true,
      messages: true
    };
  });

  // Matrimonial Details State
  const [profileData, setProfileData] = useState<ProfileData>(() => {
    const saved = localStorage.getItem('soulmate_profile_details');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      name: 'Arnav Singh',
      gender: 'Male',
      dob: '1995-04-12',
      height: '5\'10" (178 cm)',
      weight: '72 kg',
      bloodGroup: 'B+',
      maritalStatus: 'Never Married',
      numberOfChildren: 0,
      motherTongue: 'Hindi',
      languagesKnown: ['Hindi', 'English', 'Punjabi'],
      religion: 'Hindu',
      community: 'Maratha',
      subCaste: 'Patil',
      gotra: 'Kashyap',
      nativePlace: 'Pune, Maharashtra',
      highestQualification: 'Master\'s Degree',
      degree: 'M.Tech',
      specialization: 'Computer Science',
      college: 'COEP Pune',
      passingYear: 2017,
      occupation: 'Lead SDE at Salesforce',
      companyName: 'Salesforce',
      jobTitle: 'Lead Software Engineer',
      employmentType: 'Private Sector',
      income: '₹28L annually',
      workLocation: 'Pune, India',
      country: 'India',
      state: 'Maharashtra',
      district: 'Pune',
      city: 'Pune',
      pinCode: '411001',
      fatherName: 'Rajesh Singh',
      fatherOccupation: 'Retired Government Officer',
      motherName: 'Sunita Singh',
      motherOccupation: 'Homemaker',
      brothers: 1,
      sisters: 0,
      familyType: 'Nuclear',
      familyValues: 'Moderate',
      familyStatus: 'Upper Middle Class',
      diet: 'Vegetarian',
      smoking: 'No',
      drinking: 'No',
      fitnessLevel: 'Active (Regular Gym)',
      hobbies: ['Fitness', 'Hiking', 'Cooking'],
      interests: ['Tech', 'Trekking', 'Reading'],
      languagesSpoken: ['Hindi', 'English', 'Marathi'],
      pets: 'None',
      disabilityStatus: 'None',
      bio: 'Enthusiastic and grounded individual balancing lead engineering responsibilities with family values. Active hiker, amateur cook, looking for an independent companion.',
      expectations: 'Looking for a professional partner who values family relationships, shares outdoor interests, and is independent.',
      complexion: 'Wheatish',
      bodyType: 'Athletic',
      zodiacSign: 'Aries',
      aadhaar: '9012',
      pan: 'XXXXXX412F',
      governmentId: 'ID-90128'
    };
  });

  // Draft Data for Modal Editing
  const [draftProfileData, setDraftProfileData] = useState<ProfileData>({ ...profileData });

  // Save email preferences to localStorage
  useEffect(() => {
    localStorage.setItem('soulmate_email_prefs', JSON.stringify(emailPrefs));
  }, [emailPrefs]);

  // Save photos to localStorage
  useEffect(() => {
    localStorage.setItem('soulmate_profile_photos', JSON.stringify(photos));
  }, [photos]);

  // Save profile details to localStorage
  useEffect(() => {
    localStorage.setItem('soulmate_profile_details', JSON.stringify(profileData));
  }, [profileData]);

  // Dynamic Profile Completion Calculation
  const getCompletionPercentage = () => {
    const requiredKeys: (keyof ProfileData)[] = [
      'name', 'gender', 'dob', 'height', 'religion', 'community', 
      'highestQualification', 'occupation', 'income', 'city', 'pinCode', 
      'fatherName', 'diet', 'bio', 'expectations', 'aadhaar'
    ];
    let filledRequired = 0;
    requiredKeys.forEach(key => {
      const val = profileData[key];
      if (val !== undefined && val !== null && val !== '') {
        filledRequired++;
      }
    });

    const basePercentage = Math.round((filledRequired / requiredKeys.length) * 60);
    const photoPercentage = Math.min(photos.length * 15, 30); // max 30% for 2+ photos
    const emailPrefPercentage = 10; // 10% for setting up alerts

    return Math.min(basePercentage + photoPercentage + emailPrefPercentage, 100);
  };

  const handleAddPhotoUrl = () => {
    if (!newPhotoUrl.trim()) return;
    if (!newPhotoUrl.trim().startsWith('http') && !newPhotoUrl.trim().startsWith('data:image')) {
      showToast('Please enter a valid image URL starting with http://, https:// or data:image', 'error');
      return;
    }
    setPhotos(prev => [...prev, newPhotoUrl.trim()]);
    setNewPhotoUrl('');
    showToast('Photo added to your profile gallery!', 'success');
  };

  const handleDeletePhoto = (index: number) => {
    if (photos.length <= 1) {
      showToast('You must keep at least one profile photo to display on matches.', 'info');
      return;
    }
    setPhotos(prev => prev.filter((_, idx) => idx !== index));
    showToast('Photo removed from your profile gallery.', 'info');
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, WEBP).', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        setPhotos(prev => [...prev, result]);
        showToast('Photo uploaded and added to your gallery!', 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleVerification = (method: 'Government ID' | 'Social Media') => {
    setVerifyMethodName(method);
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      setShowVerifyModal(false);
      showToast(`Identity verified successfully using ${method}!`, 'success');
    }, 1500);
  };

  // Open Edit Modal with Draft Data
  const openEditModal = () => {
    setDraftProfileData({ ...profileData });
    setFormErrors({});
    setShowEditModal(true);
  };

  // Zod-like validations
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!draftProfileData.name.trim()) errors.name = 'Full Name is required';
    if (!draftProfileData.dob) errors.dob = 'Date of Birth is required';
    if (!draftProfileData.community.trim()) errors.community = 'Community / Caste is required';
    if (!draftProfileData.highestQualification.trim()) errors.highestQualification = 'Highest Qualification is required';
    if (!draftProfileData.occupation.trim()) errors.occupation = 'Occupation is required';
    if (!draftProfileData.income.trim()) errors.income = 'Annual Income is required';
    if (!draftProfileData.city.trim()) errors.city = 'City is required';
    if (!draftProfileData.pinCode.trim()) errors.pinCode = 'PIN Code is required';
    if (!draftProfileData.aadhaar.trim()) errors.aadhaar = 'Aadhaar / Passport details are required';
    if (draftProfileData.bio.length < 20) errors.bio = 'About Me bio must be at least 20 characters';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save changes to backend + frontend
  const handleSaveProfile = async () => {
    if (!validateForm()) {
      showToast('Please correct the validation errors in the form.', 'error');
      return;
    }

    try {
      // Persist in mock Express database dynamically
      const res = await fetch('/api/users/u-1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer user-token'
        },
        body: JSON.stringify(draftProfileData)
      });

      if (!res.ok) {
        throw new Error('API update failed');
      }

      const updatedUser = await res.json();
      setProfileData({ ...draftProfileData });
      setShowEditModal(false);
      showToast('Matrimonial profile details saved securely on the server!', 'success');
    } catch (err) {
      console.warn('API sync failed, falling back to local simulation:', err);
      setProfileData({ ...draftProfileData });
      setShowEditModal(false);
      showToast('Matrimonial profile details updated successfully.', 'success');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-24 pt-6 px-6 md:px-10 max-w-7xl mx-auto space-y-8"
    >
      {/* Top Banner Avatar & Info */}
      <div className="flex flex-col items-center justify-center pt-4 text-center">
        <div className="relative">
          <div 
            onClick={() => {
              if (photos.length > 0) handleOpenViewer(photos, 0);
            }}
            className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mb-4 border-4 border-surface shadow-sm overflow-hidden cursor-zoom-in hover:opacity-90 transition-opacity relative group"
          >
            {photos.length > 0 ? (
              <>
                <img src={photos[0]} alt="Display picture" className="w-full h-full object-cover animate-scaleIn" />
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
              </>
            ) : (
              <User className="w-10 h-10 text-primary/50" />
            )}
          </div>
          <button 
            onClick={() => showToast('Display photo updated successfully!', 'success')}
            className="absolute bottom-4 right-0 bg-primary text-white p-1.5 rounded-full shadow-md active:scale-95 transition-transform"
            title="Edit DP"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 mb-1">
          <h2 className="font-heading text-2xl font-bold text-primary">Your Profile</h2>
        </div>
        <div className="text-sm text-on-surface-variant flex flex-col items-center justify-center gap-1.5">
          <span className="font-sans font-bold text-lg text-on-surface leading-none">{profileData.name}</span>
          {isVerified ? (
            <VerificationStatus verified={isVerified} types={['ID_VERIFIED', 'BACKGROUND_CHECKED']} size="sm" />
          ) : (
            <span className="text-xs text-on-surface-variant/70 font-medium italic">Unverified Profile</span>
          )}
        </div>
      </div>

      {/* Trust & Verification CTA Banner */}
      {!isVerified && (
        <section className="bg-gradient-to-r from-tertiary/10 to-transparent border border-tertiary/20 rounded-2xl p-4 flex items-center justify-between soft-shadow">
          <div className="flex flex-col">
            <span className="font-sans font-bold text-sm text-on-surface flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-tertiary" />
              Get Verified Badge
            </span>
            <span className="text-xs text-on-surface-variant mt-0.5">Build trust. Verified profiles get 5x matches.</span>
          </div>
          <button 
            onClick={() => setShowVerifyModal(true)}
            className="px-4 py-2 bg-tertiary text-white rounded-full text-xs font-bold shadow-sm active:scale-95 transition-transform"
          >
            Verify Now
          </button>
        </section>
      )}

      {/* Completion Meter Progress */}
      <section className="bg-surface-container-lowest rounded-2xl p-5 soft-shadow border border-primary/5">
        <div className="flex justify-between items-end mb-3">
          <div>
            <h3 className="font-sans text-sm font-extrabold text-on-surface uppercase tracking-wider">Matrimonial Completeness</h3>
            <p className="text-[11px] text-on-surface-variant mt-0.5">Complete all fields to show in advanced matches.</p>
          </div>
          <span className="font-sans font-extrabold text-lg text-primary">{getCompletionPercentage()}%</span>
        </div>
        <div className="w-full bg-surface-container-low h-2.5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${getCompletionPercentage()}%` }}
            transition={{ type: 'spring', damping: 15 }}
            className="bg-primary h-full rounded-full"
          />
        </div>
      </section>

      {/* Profile Actions Cards */}
      <section className="space-y-4">
        <div className="bg-surface-container-lowest rounded-2xl p-5 soft-shadow border border-primary/5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Smile className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-on-surface">Matrimonial Details</h4>
                <p className="text-[10px] text-on-surface-variant mt-0.5">Comprehensive background fields, family details, lifestyle</p>
              </div>
            </div>
            <button 
              onClick={openEditModal}
              className="bg-primary hover:bg-primary/95 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all active:scale-95 shadow-sm shadow-primary/10"
            >
              Edit Details
            </button>
          </div>
        </div>
      </section>

      {/* Photos Gallery Section */}
      <section className="bg-surface-container-lowest rounded-2xl p-5 soft-shadow border border-primary/5 space-y-4">
        <h3 className="font-sans text-lg font-semibold text-on-surface flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-primary" />
          My Photos Gallery ({photos.length})
        </h3>
        <p className="text-xs text-on-surface-variant">
          Upload and organize multiple images on your matchmaking profile. Standard profiles must have at least <span className="font-bold text-primary">2 photos</span> to satisfy the search completeness algorithms.
        </p>

        {/* Drag and Drop Zone */}
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all ${
            isDragging 
              ? 'border-primary bg-primary/5 scale-[1.01]' 
              : 'border-outline-variant hover:border-primary/50 bg-surface-container-low/20'
          }`}
        >
          <input 
            type="file" 
            id="photo-file-upload" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="hidden" 
          />
          <label 
            htmlFor="photo-file-upload" 
            className="cursor-pointer flex flex-col items-center justify-center space-y-2 group"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-on-surface">
              Drag & drop an image here, or <span className="text-primary hover:underline">browse files</span>
            </p>
            <p className="text-[10px] text-on-surface-variant/70">Supports PNG, JPG, or WEBP formats</p>
          </label>
        </div>

        {/* Add photo via URL */}
        <div className="flex gap-2">
          <input 
            type="text"
            value={newPhotoUrl}
            onChange={(e) => setNewPhotoUrl(e.target.value)}
            placeholder="Or paste an image URL..."
            className="flex-1 bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 rounded-xl px-3 py-2 text-xs border border-outline-variant/35 focus:ring-1 focus:ring-primary outline-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddPhotoUrl();
            }}
          />
          <button 
            onClick={handleAddPhotoUrl}
            className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl active:scale-95 transition-transform"
          >
            Add URL
          </button>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          {photos.map((url, idx) => (
            <div 
              key={idx}
              className="relative aspect-square rounded-xl overflow-hidden bg-surface-container border border-outline-variant/30 group animate-fadeIn cursor-zoom-in"
              onClick={() => handleOpenViewer(photos, idx)}
            >
              <img 
                src={url} 
                alt={`Gallery Photo ${idx + 1}`} 
                className="w-full h-full object-cover animate-scaleIn" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenViewer(photos, idx);
                  }}
                  className="p-1.5 rounded-full bg-primary text-white active:scale-90 transition-transform shadow-md cursor-pointer"
                  title="View Photo"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePhoto(idx);
                  }}
                  className="p-1.5 rounded-full bg-error text-white active:scale-90 transition-transform shadow-md cursor-pointer"
                  title="Delete Photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {idx === 0 && (
                <span className="absolute bottom-2 left-2 bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm z-10">
                  Primary
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Email Notifications Preferences Panel */}
      <section className="bg-surface-container-lowest rounded-2xl p-5 soft-shadow border border-primary/5 space-y-4">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          <h3 className="font-sans text-lg font-semibold text-on-surface">Email Preferences</h3>
        </div>
        <p className="text-xs text-on-surface-variant">
          Toggle email alerts to control how and when you want to receive matches, likes, and messaging updates.
        </p>

        <div className="space-y-4 pt-1">
          {/* Likes Toggle */}
          <div className="flex items-center justify-between py-2 border-b border-outline-variant/10">
            <div>
              <p className="text-xs font-bold text-on-surface">Likes Notifications</p>
              <p className="text-[10px] text-on-surface-variant">Email me when a user likes or shortlists me</p>
            </div>
            <button
              onClick={() => {
                const updated = !emailPrefs.likes;
                setEmailPrefs(prev => ({ ...prev, likes: updated }));
                showToast(`Likes email alerts turned ${updated ? 'ON' : 'OFF'}.`, 'success');
              }}
              className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 ${
                emailPrefs.likes ? 'bg-primary' : 'bg-outline-variant'
              }`}
            >
              <div className="relative w-full h-full">
                <motion.div 
                  layout
                  className="bg-white w-4 h-4 rounded-full shadow-sm absolute top-0.5 left-0.5"
                  animate={{ x: emailPrefs.likes ? 20 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </div>
            </button>
          </div>

          {/* Matches Toggle */}
          <div className="flex items-center justify-between py-2 border-b border-outline-variant/10">
            <div>
              <p className="text-xs font-bold text-on-surface">Daily Match Alerts</p>
              <p className="text-[10px] text-on-surface-variant">Receive automated emails of matches matching your community</p>
            </div>
            <button
              onClick={() => {
                const updated = !emailPrefs.matches;
                setEmailPrefs(prev => ({ ...prev, matches: updated }));
                showToast(`Daily match email alerts turned ${updated ? 'ON' : 'OFF'}.`, 'success');
              }}
              className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 ${
                emailPrefs.matches ? 'bg-primary' : 'bg-outline-variant'
              }`}
            >
              <div className="relative w-full h-full">
                <motion.div 
                  layout
                  className="bg-white w-4 h-4 rounded-full shadow-sm absolute top-0.5 left-0.5"
                  animate={{ x: emailPrefs.matches ? 20 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </div>
            </button>
          </div>

          {/* Messages Toggle */}
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-xs font-bold text-on-surface">Direct Messages</p>
              <p className="text-[10px] text-on-surface-variant">Get instant alerts for chat messages from active matches</p>
            </div>
            <button
              onClick={() => {
                const updated = !emailPrefs.messages;
                setEmailPrefs(prev => ({ ...prev, messages: updated }));
                showToast(`Direct message email alerts turned ${updated ? 'ON' : 'OFF'}.`, 'success');
              }}
              className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 ${
                emailPrefs.messages ? 'bg-primary' : 'bg-outline-variant'
              }`}
            >
              <div className="relative w-full h-full">
                <motion.div 
                  layout
                  className="bg-white w-4 h-4 rounded-full shadow-sm absolute top-0.5 left-0.5"
                  animate={{ x: emailPrefs.messages ? 20 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Account Settings Static Menu */}
      <section className="space-y-3">
        <h3 className="font-sans text-sm font-bold text-outline uppercase tracking-wider px-2">Account Settings</h3>
        <div className="bg-surface-container-lowest rounded-2xl soft-shadow border border-primary/5 overflow-hidden">
          {['Partner Preferences', 'Privacy Settings', 'Help & Support'].map((item, i) => (
            <button 
              key={item} 
              onClick={() => showToast(`Preferences for "${item}" saved.`, 'success')}
              className={`w-full flex items-center justify-between p-4 ${i !== 2 ? 'border-b border-outline-variant/20' : ''} hover:bg-surface-container-low transition-colors`} 
            >
              <span className="font-sans text-sm font-medium text-on-surface">{item}</span>
              <ChevronRight className="w-4 h-4 text-outline" />
            </button>
          ))}
        </div>
      </section>

      {/* Verification Modal */}
      <AnimatePresence>
        {showVerifyModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isVerifying && setShowVerifyModal(false)}
              className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-surface z-[70] rounded-t-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-5 border-b border-outline-variant/30 flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-xl font-bold text-primary flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-tertiary" />
                    Profile Verification
                  </h3>
                  <p className="text-sm text-on-surface-variant mt-1">Choose a method to verify your identity</p>
                </div>
                <button 
                  onClick={() => setShowVerifyModal(false)} 
                  disabled={isVerifying}
                  className="p-2 -mr-2 text-on-surface-variant hover:text-primary transition-colors disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-5 space-y-4">
                <button 
                  onClick={() => handleVerification('Government ID')}
                  disabled={isVerifying}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border border-outline-variant/50 hover:bg-surface-container-low hover:border-tertiary/50 transition-all text-left disabled:opacity-50 disabled:pointer-events-none group"
                >
                  <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center flex-none group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 text-tertiary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-sans font-bold text-on-surface text-sm">Government ID</h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">Upload a driver's license, passport or Aadhaar</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-outline group-hover:text-tertiary" />
                </button>

                <button 
                  onClick={() => handleVerification('Social Media')}
                  disabled={isVerifying}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border border-outline-variant/50 hover:bg-surface-container-low hover:border-tertiary/50 transition-all text-left disabled:opacity-50 disabled:pointer-events-none group"
                >
                  <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center flex-none group-hover:scale-110 transition-transform">
                    <Link2 className="w-6 h-6 text-tertiary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-sans font-bold text-on-surface text-sm">Social Media</h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">Connect LinkedIn, Google or Facebook</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-outline group-hover:text-tertiary" />
                </button>
              </div>

              {isVerifying && (
                <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                  <Loader2 className="w-10 h-10 text-tertiary animate-spin mb-4" />
                  <p className="font-sans font-bold text-on-surface">Verifying your profile using {verifyMethodName}...</p>
                  <p className="text-sm text-on-surface-variant mt-1">This will only take a moment.</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* COMPREHENSIVE MATRIMONIAL DETAIL FORM MODAL */}
      <AnimatePresence>
        {showEditModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEditModal(false)}
              className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-xs"
            />
            
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 h-[92vh] bg-surface z-[110] rounded-t-3xl shadow-2xl flex flex-col md:max-w-xl md:left-1/2 md:-translate-x-1/2 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-outline-variant/30 bg-surface flex-none">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  <div>
                    <h3 className="font-sans font-bold text-base text-primary leading-tight">
                      Edit Matrimonial Profile
                    </h3>
                    <p className="text-[11px] text-on-surface-variant">Update extensive matchmaking details</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowEditModal(false)} 
                  className="p-2 -mr-2 text-on-surface-variant hover:text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Tabs Selector */}
              <div className="flex gap-1.5 overflow-x-auto p-3 border-b border-outline-variant/20 bg-surface-container-lowest flex-none scrollbar-none">
                {[
                  { id: 'basic', label: 'Basic', icon: User },
                  { id: 'community', label: 'Community', icon: UsersIcon },
                  { id: 'education_career', label: 'Career', icon: Briefcase },
                  { id: 'address', label: 'Address', icon: MapPin },
                  { id: 'family', label: 'Family', icon: HeartHandshake },
                  { id: 'lifestyle', label: 'Lifestyle', icon: Smile },
                  { id: 'personal', label: 'Bio', icon: FileText },
                  { id: 'docs', label: 'Documents', icon: ShieldCheck },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveFormSection(tab.id as any)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex-none ${
                        activeFormSection === tab.id 
                          ? 'bg-primary text-white shadow-sm' 
                          : 'bg-surface hover:bg-surface-container-low text-on-surface-variant'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Modal Scrollable Forms Body */}
              <div className="flex-grow overflow-y-auto p-5 space-y-6 bg-surface-container-lowest/40 font-sans text-xs">
                
                {/* 1. BASIC INFORMATION TAB */}
                {activeFormSection === 'basic' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="border-b border-outline-variant/15 pb-2">
                      <h4 className="font-sans font-extrabold text-sm text-primary">Basic Information</h4>
                      <p className="text-[10px] text-on-surface-variant">Essential matchmaking fields for automatic calculations.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Full Name *</label>
                        <input 
                          type="text" 
                          value={draftProfileData.name}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, name: e.target.value })}
                          className={`w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border outline-none ${formErrors.name ? 'border-error' : 'border-outline-variant/40 focus:border-primary'}`}
                        />
                        {formErrors.name && <span className="text-[10px] text-error flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" />{formErrors.name}</span>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Gender *</label>
                        <select 
                          value={draftProfileData.gender}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, gender: e.target.value })}
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Date of Birth *</label>
                        <input 
                          type="date" 
                          value={draftProfileData.dob}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, dob: e.target.value })}
                          className={`w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border outline-none ${formErrors.dob ? 'border-error' : 'border-outline-variant/40 focus:border-primary'}`}
                        />
                        {formErrors.dob && <span className="text-[10px] text-error flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" />{formErrors.dob}</span>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Height (e.g. 5ft 10in)</label>
                        <input 
                          type="text" 
                          value={draftProfileData.height}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, height: e.target.value })}
                          placeholder="e.g. 5ft 10in (178 cm)"
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Weight (e.g. 70 kg)</label>
                        <input 
                          type="text" 
                          value={draftProfileData.weight}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, weight: e.target.value })}
                          placeholder="e.g. 72 kg"
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Marital Status</label>
                        <select 
                          value={draftProfileData.maritalStatus}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, maritalStatus: e.target.value })}
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        >
                          <option value="Never Married">Never Married</option>
                          <option value="Divorced">Divorced</option>
                          <option value="Widowed">Widowed</option>
                          <option value="Awaiting Divorce">Awaiting Divorce</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Mother Tongue</label>
                        <input 
                          type="text" 
                          value={draftProfileData.motherTongue}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, motherTongue: e.target.value })}
                          placeholder="e.g. Hindi, Marathi"
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. COMMUNITY INFORMATION TAB */}
                {activeFormSection === 'community' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="border-b border-outline-variant/15 pb-2">
                      <h4 className="font-sans font-extrabold text-sm text-primary">Community & Religion</h4>
                      <p className="text-[10px] text-on-surface-variant">Information matching based on lineage, gotra and community values.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Religion</label>
                        <input 
                          type="text" 
                          value={draftProfileData.religion}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, religion: e.target.value })}
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Caste / Community *</label>
                        <input 
                          type="text" 
                          value={draftProfileData.community}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, community: e.target.value })}
                          className={`w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border outline-none ${formErrors.community ? 'border-error' : 'border-outline-variant/40 focus:border-primary'}`}
                        />
                        {formErrors.community && <span className="text-[10px] text-error flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" />{formErrors.community}</span>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Sub Caste</label>
                        <input 
                          type="text" 
                          value={draftProfileData.subCaste}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, subCaste: e.target.value })}
                          placeholder="e.g. Patil, Deshmukh"
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Gotra (Optional)</label>
                        <input 
                          type="text" 
                          value={draftProfileData.gotra}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, gotra: e.target.value })}
                          placeholder="e.g. Kashyap, Bhardwaj"
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Native Place</label>
                        <input 
                          type="text" 
                          value={draftProfileData.nativePlace}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, nativePlace: e.target.value })}
                          placeholder="e.g. Pune, Maharashtra"
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. EDUCATION & CAREER TAB */}
                {activeFormSection === 'education_career' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="border-b border-outline-variant/15 pb-2">
                      <h4 className="font-sans font-extrabold text-sm text-primary">Education & Career</h4>
                      <p className="text-[10px] text-on-surface-variant">Help matches understand your professional goals and academic roots.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Highest Qualification *</label>
                        <input 
                          type="text" 
                          value={draftProfileData.highestQualification}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, highestQualification: e.target.value })}
                          placeholder="e.g. B.Tech, MBA"
                          className={`w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border outline-none ${formErrors.highestQualification ? 'border-error' : 'border-outline-variant/40 focus:border-primary'}`}
                        />
                        {formErrors.highestQualification && <span className="text-[10px] text-error flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" />{formErrors.highestQualification}</span>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Degree / Specialization</label>
                        <input 
                          type="text" 
                          value={draftProfileData.degree}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, degree: e.target.value })}
                          placeholder="e.g. Computer Science"
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">College / University</label>
                        <input 
                          type="text" 
                          value={draftProfileData.college}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, college: e.target.value })}
                          placeholder="e.g. IIT Delhi"
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Occupation / Sector *</label>
                        <input 
                          type="text" 
                          value={draftProfileData.occupation}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, occupation: e.target.value })}
                          placeholder="e.g. Software Engineer"
                          className={`w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border outline-none ${formErrors.occupation ? 'border-error' : 'border-outline-variant/40 focus:border-primary'}`}
                        />
                        {formErrors.occupation && <span className="text-[10px] text-error flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" />{formErrors.occupation}</span>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Company Name</label>
                        <input 
                          type="text" 
                          value={draftProfileData.companyName}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, companyName: e.target.value })}
                          placeholder="e.g. Google, Salesforce"
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Annual Income *</label>
                        <input 
                          type="text" 
                          value={draftProfileData.income}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, income: e.target.value })}
                          placeholder="e.g. ₹25L annually"
                          className={`w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border outline-none ${formErrors.income ? 'border-error' : 'border-outline-variant/40 focus:border-primary'}`}
                        />
                        {formErrors.income && <span className="text-[10px] text-error flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" />{formErrors.income}</span>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Employment Type</label>
                        <select 
                          value={draftProfileData.employmentType}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, employmentType: e.target.value })}
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        >
                          <option value="Private Sector">Private Sector</option>
                          <option value="Government Sector">Government Sector</option>
                          <option value="Business / Entrepreneur">Business / Entrepreneur</option>
                          <option value="Self Employed">Self Employed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. ADDRESS INFORMATION TAB */}
                {activeFormSection === 'address' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="border-b border-outline-variant/15 pb-2">
                      <h4 className="font-sans font-extrabold text-sm text-primary">Current Address</h4>
                      <p className="text-[10px] text-on-surface-variant">Specify your current residential details.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Country</label>
                        <input 
                          type="text" 
                          value={draftProfileData.country}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, country: e.target.value })}
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">State</label>
                        <input 
                          type="text" 
                          value={draftProfileData.state}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, state: e.target.value })}
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">City / Town *</label>
                        <input 
                          type="text" 
                          value={draftProfileData.city}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, city: e.target.value })}
                          className={`w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border outline-none ${formErrors.city ? 'border-error' : 'border-outline-variant/40 focus:border-primary'}`}
                        />
                        {formErrors.city && <span className="text-[10px] text-error flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" />{formErrors.city}</span>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">PIN Code *</label>
                        <input 
                          type="text" 
                          value={draftProfileData.pinCode}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, pinCode: e.target.value })}
                          placeholder="e.g. 411001"
                          className={`w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border outline-none ${formErrors.pinCode ? 'border-error' : 'border-outline-variant/40 focus:border-primary'}`}
                        />
                        {formErrors.pinCode && <span className="text-[10px] text-error flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" />{formErrors.pinCode}</span>}
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. FAMILY DETAILS TAB */}
                {activeFormSection === 'family' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="border-b border-outline-variant/15 pb-2">
                      <h4 className="font-sans font-extrabold text-sm text-primary">Family Details</h4>
                      <p className="text-[10px] text-on-surface-variant">Family background information represents traditional bonding values.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Father's Name *</label>
                        <input 
                          type="text" 
                          value={draftProfileData.fatherName}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, fatherName: e.target.value })}
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Father's Occupation</label>
                        <input 
                          type="text" 
                          value={draftProfileData.fatherOccupation}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, fatherOccupation: e.target.value })}
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Mother's Name</label>
                        <input 
                          type="text" 
                          value={draftProfileData.motherName}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, motherName: e.target.value })}
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Mother's Occupation</label>
                        <input 
                          type="text" 
                          value={draftProfileData.motherOccupation}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, motherOccupation: e.target.value })}
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Brothers Count</label>
                        <input 
                          type="number" 
                          value={draftProfileData.brothers}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, brothers: Number(e.target.value) })}
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Sisters Count</label>
                        <input 
                          type="number" 
                          value={draftProfileData.sisters}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, sisters: Number(e.target.value) })}
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Family Type</label>
                        <select 
                          value={draftProfileData.familyType}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, familyType: e.target.value })}
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        >
                          <option value="Nuclear">Nuclear</option>
                          <option value="Joint">Joint</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Family Values</label>
                        <select 
                          value={draftProfileData.familyValues}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, familyValues: e.target.value })}
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        >
                          <option value="Traditional">Traditional</option>
                          <option value="Moderate">Moderate</option>
                          <option value="Liberal">Liberal</option>
                        </select>
                      </div>

                      <div className="col-span-2">
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Family Status</label>
                        <select 
                          value={draftProfileData.familyStatus}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, familyStatus: e.target.value })}
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        >
                          <option value="Middle Class">Middle Class</option>
                          <option value="Upper Middle Class">Upper Middle Class</option>
                          <option value="Rich / Wealthy">Rich / Wealthy</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. LIFESTYLE DETAILS TAB */}
                {activeFormSection === 'lifestyle' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="border-b border-outline-variant/15 pb-2">
                      <h4 className="font-sans font-extrabold text-sm text-primary">Lifestyle & Diet</h4>
                      <p className="text-[10px] text-on-surface-variant">Update lifestyle traits for dietary, fitness and habits compatibility.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Dietary Status *</label>
                        <select 
                          value={draftProfileData.diet}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, diet: e.target.value })}
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        >
                          <option value="Vegetarian">Vegetarian</option>
                          <option value="Non-Vegetarian">Non-Vegetarian</option>
                          <option value="Eggetarian">Eggetarian</option>
                          <option value="Vegan">Vegan</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Smoking Habit</label>
                        <select 
                          value={draftProfileData.smoking}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, smoking: e.target.value })}
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        >
                          <option value="No">No</option>
                          <option value="Occasionally">Occasionally</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Drinking Habit</label>
                        <select 
                          value={draftProfileData.drinking}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, drinking: e.target.value })}
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        >
                          <option value="No">No</option>
                          <option value="Socially">Socially</option>
                          <option value="Regularly">Regularly</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Fitness Level</label>
                        <input 
                          type="text" 
                          value={draftProfileData.fitnessLevel}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, fitnessLevel: e.target.value })}
                          placeholder="e.g. Active (Gym, Yoga)"
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Pets Status</label>
                        <input 
                          type="text" 
                          value={draftProfileData.pets}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, pets: e.target.value })}
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. PERSONAL DETAILS & EXPECTATIONS TAB */}
                {activeFormSection === 'personal' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="border-b border-outline-variant/15 pb-2">
                      <h4 className="font-sans font-extrabold text-sm text-primary">Bio & Expectations</h4>
                      <p className="text-[10px] text-on-surface-variant">Introduce your personality and specify what you expect from your soulmate.</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">About Me / Bio * (Min 20 chars)</label>
                        <textarea 
                          value={draftProfileData.bio}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, bio: e.target.value })}
                          rows={4}
                          className={`w-full bg-surface text-on-surface rounded-xl px-3 py-2 border outline-none resize-none ${formErrors.bio ? 'border-error' : 'border-outline-variant/40 focus:border-primary'}`}
                          placeholder="Describe your values, outlook towards life and family..."
                        />
                        {formErrors.bio && <span className="text-[10px] text-error flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" />{formErrors.bio}</span>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Partner Expectations</label>
                        <textarea 
                          value={draftProfileData.expectations}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, expectations: e.target.value })}
                          rows={3}
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2 border border-outline-variant/40 outline-none resize-none"
                          placeholder="What attributes are you looking for in a companion?"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Complexion</label>
                          <input 
                            type="text" 
                            value={draftProfileData.complexion}
                            onChange={(e) => setDraftProfileData({ ...draftProfileData, complexion: e.target.value })}
                            placeholder="e.g. Wheatish, Fair"
                            className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Body Type</label>
                          <input 
                            type="text" 
                            value={draftProfileData.bodyType}
                            onChange={(e) => setDraftProfileData({ ...draftProfileData, bodyType: e.target.value })}
                            placeholder="e.g. Slim, Athletic, Average"
                            className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 8. DOCUMENTS & ID TAB */}
                {activeFormSection === 'docs' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="border-b border-outline-variant/15 pb-2">
                      <h4 className="font-sans font-extrabold text-sm text-primary">Identity Documents</h4>
                      <p className="text-[10px] text-on-surface-variant">Masked document verification indicators used for security validations.</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">Aadhaar Card (Last 4 digits) *</label>
                        <input 
                          type="text" 
                          maxLength={4}
                          value={draftProfileData.aadhaar}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, aadhaar: e.target.value.replace(/\D/g, '') })}
                          placeholder="e.g. 9012"
                          className={`w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border outline-none ${formErrors.aadhaar ? 'border-error' : 'border-outline-variant/40 focus:border-primary'}`}
                        />
                        {formErrors.aadhaar && <span className="text-[10px] text-error flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" />{formErrors.aadhaar}</span>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-on-surface-variant mb-1">PAN Number (Masked)</label>
                        <input 
                          type="text" 
                          value={draftProfileData.pan}
                          onChange={(e) => setDraftProfileData({ ...draftProfileData, pan: e.target.value })}
                          className="w-full bg-surface text-on-surface rounded-xl px-3 py-2.5 border border-outline-variant/40 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Save Footer */}
              <div className="p-4 border-t border-outline-variant/30 bg-surface flex items-center justify-end gap-3 flex-none">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-5 py-2.5 border border-outline text-on-surface rounded-xl font-bold active:scale-95 transition-transform"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold active:scale-95 transition-transform flex items-center gap-2 shadow-md shadow-primary/20 hover:bg-primary/95"
                >
                  <Check className="w-4 h-4" />
                  Save Matrimonial Profile
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
