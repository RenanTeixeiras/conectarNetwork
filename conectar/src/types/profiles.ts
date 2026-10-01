export type ParticipantProfile = {
  company: string | null;
  id: string;
  name: string;
  photoUrl: string | null;
  profession: string | null;
  segment: string | null;
  whatIDoAndOffer: string;
};

export type PublicProfile = ParticipantProfile & {
  bio: string | null;
  contact: {
    instagram?: string;
    linkedin?: string;
    whatsapp?: string;
  };
  idealAudience: string;
  targetTags: string[];
};

export type EditableProfile = {
  city: string;
  company: string;
  firstName: string;
  id: string;
  idealAudience: string;
  instagram: string;
  lastName: string;
  linkedin: string;
  photoUrl: string | null;
  profession: string;
  segment: string;
  shareContacts: boolean;
  targetTagIds: string[];
  whatsapp: string;
  whatIDoAndOffer: string;
};
