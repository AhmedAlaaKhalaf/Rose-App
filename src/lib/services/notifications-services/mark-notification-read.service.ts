import { TMarkReadResponse } from "@/lib/types/notifications";

// mark notification as read
// export async function markNotificationAsRead(notificationId: string[]): Promise<TMarkReadResponse> {
//   const res = await fetch(`/api/notifications/mark-as-read`, {
//     method: "POST",
//     body: JSON.stringify({ notificationIds: notificationId }),
//   });

//   if (!res.ok) {
//     let errorMessage = "Failed to mark notification as read";

//     const errorData = await res.json();
//     errorMessage = errorData.message || errorMessage;

//     throw new Error(errorMessage);
//   }

//   const data = await res.json();
//   return data;
// }
