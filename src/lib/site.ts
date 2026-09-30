export type RouteKey =
  | "home"
  | "about"
  | "authors"
  | "experience"
  | "voices"
  | "submit"
  | "contact";

export interface NavItem {
  key: RouteKey;
  label: string;
  path: string; // hash path, e.g. "/about"
}

export const NAV_ITEMS: NavItem[] = [
  { key: "home", label: "Home", path: "/" },
  { key: "about", label: "About", path: "/about" },
  { key: "authors", label: "For Authors", path: "/authors" },
  { key: "experience", label: "Experience", path: "/experience" },
  { key: "voices", label: "Voices", path: "/voices" },
  { key: "contact", label: "Contact", path: "/contact" },
];

/** All navigable routes (used by the hash parser & SEO map). */
export const ALL_ROUTES: NavItem[] = [
  ...NAV_ITEMS,
  { key: "submit", label: "Submit Your Book", path: "/submit" },
];

export interface PageMeta {
  title: string;
  description: string;
}

export const PAGE_META: Record<RouteKey, PageMeta> = {
  home: {
    title: "Kolez Buk Club | Where Authors and Great Stories Come Together",
    description:
      "Kolez Buk Club is a curated literary club for independent authors — structured book discovery, honest discussion, and reviews that give stories a lasting life.",
  },
  about: {
    title: "About Kolez Buk Club | Our Mission, Vision & Beliefs",
    description:
      "Learn how Kolez Buk Club works — a literary club built on merit-based book selection, deep reading, honest discussion, and lasting support for independent authors.",
  },
  authors: {
    title: "For Authors | Reader Engagement & Author Support",
    description:
      "Give your book more than launch week. Kolez Buk Club offers independent authors curated discovery, engaged readers, honest feedback, and discussion that lasts.",
  },
  experience: {
    title: "The Kolez Experience | Discover, Connect, Read, Discuss, Engage, Grow",
    description:
      "Inside the Kolez Buk Club journey — six deliberate stages that carry a book from submission to discovery, discussion, and lasting recognition.",
  },
  voices: {
    title: "Voices | What Authors Say About Kolez Buk Club",
    description:
      "What authors say about Kolez Buk Club — a real author review and a continuously scrolling record of author experiences from the club.",
  },
  submit: {
    title: "Submit Your Book | Share Your Work with Kolez Buk Club",
    description:
      "Submit your book to Kolez Buk Club. Every submission is read by real people and judged on the story alone — no paid slots, no shortcuts.",
  },
  contact: {
    title: "Contact | Let's Start a Conversation",
    description:
      "Questions about the club, a submission, or a partnership? Message the Kolez Buk Club team — every message is read by a real person.",
  },
};

export const siteConfig = {
  name: "Kolez Buk Club",
  shortName: "Kolez",
  tagline: "Where Authors, Readers, and Great Stories Come Together.",
  supportingLine:
    "Kolez Buk Club is a curated literary club where deserving books meet devoted readers — through discovery, honest conversation, and lasting connection.",
  email: "kolezmordecai.kolezauthorclub@gmail.com",
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/", icon: "facebook" },
    { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
    { label: "X (Twitter)", href: "https://x.com/", icon: "twitter" },
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
    { label: "Goodreads", href: "https://www.goodreads.com/", icon: "book" },
  ],
} as const;

export const BOOK_GENRES = [
  "Literary Fiction",
  "Mystery & Thriller",
  "Romance",
  "Science Fiction",
  "Fantasy",
  "Historical Fiction",
  "Non-Fiction",
  "Memoir & Biography",
  "Poetry",
  "Self-Help & Personal Growth",
  "Business & Leadership",
  "Children's & Middle Grade",
  "Young Adult",
  "Other",
];

export const CONTACT_SUBJECTS = [
  "General Question",
  "Author Submission Question",
  "Feedback & Suggestions",
  "Press & Partnerships",
  "Other",
];
