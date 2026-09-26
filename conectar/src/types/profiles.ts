export type ParticipantProfile = {
  company: string | null;
  id: string;
  name: string;
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
  targetAudience: string | null;
  whatIDo: string | null;
  whatIOffer: string | null;
};
