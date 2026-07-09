export interface Profile {
  id: string;
  name: string;
  age: number;
  gender: string;
  imageUrl: string;
  verified: boolean;
  community: string;
  occupation: string;
  location: string;
  matchPercentage?: number;

  // Basic Information
  dob?: string;               // Date of Birth (YYYY-MM-DD)
  height?: string;            // Height (e.g. 5'6")
  weight?: string;            // Weight (e.g. 60 kg)
  bloodGroup?: string;        // Blood Group (e.g. A+)
  maritalStatus?: string;     // Marital Status (e.g. Never Married)
  numberOfChildren?: number;  // Number of Children
  motherTongue?: string;      // Mother tongue
  languagesKnown?: string[];  // Languages known

  // Community Information
  religion?: string;          // Religion
  subCaste?: string;          // Sub Caste
  gotra?: string;             // Gotra
  nativePlace?: string;       // Native Place

  // Education
  highestQualification?: string;
  degree?: string;
  specialization?: string;
  college?: string;
  passingYear?: number;

  // Career
  companyName?: string;
  jobTitle?: string;
  employmentType?: string;    // Private, Govt, Business, etc.
  income?: string;            // Annual Income
  workLocation?: string;

  // Address
  country?: string;
  state?: string;
  district?: string;
  city?: string;
  pinCode?: string;

  // Family Details
  fatherName?: string;
  fatherOccupation?: string;
  motherName?: string;
  motherOccupation?: string;
  brothers?: number;
  sisters?: number;
  familyType?: string;        // Joint, Nuclear, etc.
  familyValues?: string;      // Traditional, Moderate, Liberal
  familyStatus?: string;      // Middle Class, Upper Middle, Rich

  // Lifestyle
  diet?: string;              // Veg, Non-Veg, Vegan, Eggetarian
  smoking?: string;           // Yes, No, Occasionally
  drinking?: string;          // Yes, No, Occasionally
  fitnessLevel?: string;      // Active, Gym-goer, Occasional, Sedentary
  hobbies?: string[];         // Hobbies (Multiple)
  interests?: string[];       // Interests (Multiple)
  languagesSpoken?: string[]; // Languages Spoken
  pets?: string;              // Yes, No, Friendly
  disabilityStatus?: string;  // None, Yes (Optional details)

  // Personal Details
  about?: string;             // Bio
  expectations?: string;      // Expectations from partner
  complexion?: string;        // Fair, Wheatish, Dark, Medium
  bodyType?: string;          // Slim, Athletic, Average, Heavy
  zodiacSign?: string;        // Zodiac Sign (Optional)

  // Documents & Verifications
  aadhaar?: string;           // Aadhaar number (last 4 digits / masked)
  pan?: string;               // Masked PAN
  governmentId?: string;      // ID Reference
  verificationStatus?: string;// PENDING, APPROVED, REJECTED, etc.

  // Gallery
  coverPhoto?: string;
  images?: string[];          // Gallery Images up to 10
  imageCaptions?: string[];   // Captions for gallery images

  // Compatibility Fields
  education?: string;
  employer?: string;
  drinkSmoke?: string;
}

