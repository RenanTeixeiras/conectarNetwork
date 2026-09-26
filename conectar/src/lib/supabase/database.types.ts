export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: { extensions?: Json; operationName?: string; query?: string; variables?: Json };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      admin_users: {
        Row: {
          auth_user_id: string;
          created_at: string;
          is_active: boolean;
          role: Database["public"]["Enums"]["admin_role"];
          updated_at: string;
          username: string;
        };
        Insert: {
          auth_user_id: string;
          created_at?: string;
          is_active?: boolean;
          role?: Database["public"]["Enums"]["admin_role"];
          updated_at?: string;
          username: string;
        };
        Update: {
          auth_user_id?: string;
          created_at?: string;
          is_active?: boolean;
          role?: Database["public"]["Enums"]["admin_role"];
          updated_at?: string;
          username?: string;
        };
        Relationships: [];
      };
      event_contact_preferences: {
        Row: {
          event_id: string;
          profile_id: string;
          share_instagram: boolean;
          share_linkedin: boolean;
          share_whatsapp: boolean;
          updated_at: string;
        };
        Insert: {
          event_id: string;
          profile_id: string;
          share_instagram?: boolean;
          share_linkedin?: boolean;
          share_whatsapp?: boolean;
          updated_at?: string;
        };
        Update: {
          event_id?: string;
          profile_id?: string;
          share_instagram?: boolean;
          share_linkedin?: boolean;
          share_whatsapp?: boolean;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "event_contact_preferences_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "event_contact_preferences_participant_fk";
            columns: ["event_id", "profile_id"];
            isOneToOne: true;
            referencedRelation: "event_participants";
            referencedColumns: ["event_id", "profile_id"];
          },
          {
            foreignKeyName: "event_contact_preferences_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      event_participants: {
        Row: {
          checked_in_at: string | null;
          checked_out_at: string | null;
          created_at: string;
          event_id: string;
          id: string;
          last_seen_at: string | null;
          profile_id: string;
          status: Database["public"]["Enums"]["participant_status"];
          updated_at: string;
        };
        Insert: {
          checked_in_at?: string | null;
          checked_out_at?: string | null;
          created_at?: string;
          event_id: string;
          id?: string;
          last_seen_at?: string | null;
          profile_id: string;
          status?: Database["public"]["Enums"]["participant_status"];
          updated_at?: string;
        };
        Update: {
          checked_in_at?: string | null;
          checked_out_at?: string | null;
          created_at?: string;
          event_id?: string;
          id?: string;
          last_seen_at?: string | null;
          profile_id?: string;
          status?: Database["public"]["Enums"]["participant_status"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "event_participants_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "event_participants_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      events: {
        Row: {
          access_code_hash: string | null;
          created_at: string;
          description: string | null;
          ends_at: string | null;
          id: string;
          name: string;
          slug: string;
          starts_at: string | null;
          status: Database["public"]["Enums"]["event_status"];
          timezone: string;
          updated_at: string;
        };
        Insert: {
          access_code_hash?: string | null;
          created_at?: string;
          description?: string | null;
          ends_at?: string | null;
          id?: string;
          name: string;
          slug: string;
          starts_at?: string | null;
          status?: Database["public"]["Enums"]["event_status"];
          timezone?: string;
          updated_at?: string;
        };
        Update: {
          access_code_hash?: string | null;
          created_at?: string;
          description?: string | null;
          ends_at?: string | null;
          id?: string;
          name?: string;
          slug?: string;
          starts_at?: string | null;
          status?: Database["public"]["Enums"]["event_status"];
          timezone?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      profile_tags: {
        Row: {
          created_at: string;
          id: string;
          profile_id: string;
          tag_id: string;
          type: Database["public"]["Enums"]["profile_tag_type"];
        };
        Insert: {
          created_at?: string;
          id?: string;
          profile_id: string;
          tag_id: string;
          type: Database["public"]["Enums"]["profile_tag_type"];
        };
        Update: {
          created_at?: string;
          id?: string;
          profile_id?: string;
          tag_id?: string;
          type?: Database["public"]["Enums"]["profile_tag_type"];
        };
        Relationships: [
          {
            foreignKeyName: "profile_tags_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "profile_tags_tag_id_fkey";
            columns: ["tag_id"];
            isOneToOne: false;
            referencedRelation: "tags";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          bio: string | null;
          city: string | null;
          company: string | null;
          created_at: string;
          first_name: string;
          id: string;
          instagram_url: string | null;
          is_active: boolean;
          last_name: string;
          linkedin_url: string | null;
          normalized_name: string;
          photo_url: string | null;
          profession: string | null;
          segment: string | null;
          target_audience: string | null;
          updated_at: string;
          what_i_do: string | null;
          what_i_offer: string | null;
          whatsapp_phone: string | null;
        };
        Insert: {
          bio?: string | null;
          city?: string | null;
          company?: string | null;
          created_at?: string;
          first_name: string;
          id?: string;
          instagram_url?: string | null;
          is_active?: boolean;
          last_name: string;
          linkedin_url?: string | null;
          normalized_name: string;
          photo_url?: string | null;
          profession?: string | null;
          segment?: string | null;
          target_audience?: string | null;
          updated_at?: string;
          what_i_do?: string | null;
          what_i_offer?: string | null;
          whatsapp_phone?: string | null;
        };
        Update: {
          bio?: string | null;
          city?: string | null;
          company?: string | null;
          created_at?: string;
          first_name?: string;
          id?: string;
          instagram_url?: string | null;
          is_active?: boolean;
          last_name?: string;
          linkedin_url?: string | null;
          normalized_name?: string;
          photo_url?: string | null;
          profession?: string | null;
          segment?: string | null;
          target_audience?: string | null;
          updated_at?: string;
          what_i_do?: string | null;
          what_i_offer?: string | null;
          whatsapp_phone?: string | null;
        };
        Relationships: [];
      };
      tags: {
        Row: {
          category: string | null;
          created_at: string;
          id: string;
          is_active: boolean;
          name: string;
          slug: string;
        };
        Insert: {
          category?: string | null;
          created_at?: string;
          id?: string;
          is_active?: boolean;
          name: string;
          slug: string;
        };
        Update: {
          category?: string | null;
          created_at?: string;
          id?: string;
          is_active?: boolean;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      admin_role: "ADMIN";
      event_status: "DRAFT" | "OPEN" | "CLOSED" | "ARCHIVED";
      participant_status: "REGISTERED" | "CHECKED_IN" | "LEFT" | "CANCELLED";
      profile_tag_type: "OFFER" | "TARGET" | "INTEREST";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      admin_role: ["ADMIN"],
      event_status: ["DRAFT", "OPEN", "CLOSED", "ARCHIVED"],
      participant_status: ["REGISTERED", "CHECKED_IN", "LEFT", "CANCELLED"],
      profile_tag_type: ["OFFER", "TARGET", "INTEREST"],
    },
  },
} as const;
