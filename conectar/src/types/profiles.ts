export type ParticipantProfile = {
  company: string | null;
  id: string;
  name: string;
  photoUrl: string | null;
  profession: string | null;
  segment: string | null;
};

export type PublicProfile = ParticipantProfile & {
  bio: string | null;
  contact: {
    instagram?: string;
    linkedin?: string;
    whatsapp?: string;
  };
  tags: string[];
  whatIDo: string | null;
  whatIOffer: string | null;
};

export type EditableProfile = {
  city: string;
  company: string;
  firstName: string;
  id: string;
  instagram: string;
  lastName: string;
  linkedin: string;
  photoUrl: string | null;
  profession: string;
  segment: string;
  shareContacts: boolean;
  tags: string[];
  targetTagIds: string[];
  whatsapp: string;
  whatIDo: string;
  whatIOffer: string;
};
