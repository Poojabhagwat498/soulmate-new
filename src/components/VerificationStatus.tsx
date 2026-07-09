import React from 'react';
import { ShieldCheck, UserCheck, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export type VerificationType = 'ID_VERIFIED' | 'BACKGROUND_CHECKED' | 'COMMUNITY_VOUCHED';

interface VerificationStatusProps {
  verified: boolean;
  types?: VerificationType[];
  size?: 'sm' | 'md';
}

export function VerificationStatus({ verified, types = ['ID_VERIFIED'], size = 'sm' }: VerificationStatusProps) {
  if (!verified) return null;

  const getBadgeDetails = (type: VerificationType) => {
    switch (type) {
      case 'ID_VERIFIED':
        return {
          label: 'ID Verified',
          icon: ShieldCheck,
          className: 'bg-tertiary/10 text-tertiary border-tertiary/25'
        };
      case 'BACKGROUND_CHECKED':
        return {
          label: 'Background Checked',
          icon: UserCheck,
          className: 'bg-secondary/10 text-secondary border-secondary/25'
        };
      case 'COMMUNITY_VOUCHED':
        return {
          label: 'Community Vouched',
          icon: CheckCircle,
          className: 'bg-primary/10 text-primary border-primary/25'
        };
    }
  };

  return (
    <div className="flex flex-wrap gap-1.5 items-center">
      {types.map((type) => {
        const details = getBadgeDetails(type);
        const Icon = details.icon;
        
        return (
          <motion.div
            key={type}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`inline-flex items-center gap-1.5 border px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
              size === 'sm' ? 'text-[9px]' : 'text-xs px-2.5 py-1'
            } ${details.className}`}
          >
            <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
            <span>{details.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
