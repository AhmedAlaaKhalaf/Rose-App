export type TTestimonial = {
  id: string;
  name: string;
  email: string;
  content: string;
  rating: number;
  image: string;
  isApproved: boolean;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TTestimonials = {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    photo: string;
  };
  rating: number;
  content: string;
  status: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TTestimonialsResponse = {
  metadata: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
  };
  testimonials: TTestimonials[];
};
