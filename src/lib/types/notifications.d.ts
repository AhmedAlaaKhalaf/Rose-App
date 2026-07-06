// notification type
export type TNotification = {
  id: string;
  /** Some API responses return the Mongo-style identifier instead of `id` */
  _id?: string;
  userId: string;
  body: string;
  title: string;
  type: "ORDER" | "PROMOTION" | "SYSTEM" | "REVIEW" | "OTHER";
  message: string;
  isRead: boolean;
  link: string | null;
  createdAt: string;
  updatedAt: string;
};

// mark notification as read type
export type TMarkAsReadResponse = {
  notification: TNotification;
};

// mark notification as read type
export type TMarkAllAsReadResponse = {
  message: string;
};

// paginated notifications list (normalized shape)
export type TPaginatedNotifications = {
  message: string;
  notifications: TNotification[];
  metadata: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
    unreadCount: number;
  };
};
