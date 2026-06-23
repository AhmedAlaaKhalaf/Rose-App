// notification type
export type TNotification = {
  id: string;
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
