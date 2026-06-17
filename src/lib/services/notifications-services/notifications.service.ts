// import { TPaginatedNotifications } from "../../types/notifications";

// interface GetNotificationsParams {
//   pageParam?: number;
//   limit?: number;
// }

// // fetch notifications
// export async function getNotifications({
//   pageParam = 1,
//   limit = 10,
// }: GetNotificationsParams): Promise<TPaginatedNotifications> {
//   const res = await fetch(`/api/notifications?page=${pageParam}&limit=${limit}`);

//   if (!res.ok) {
//     let errorMessage = "Error fetching notifications";

//     const errorData = await res.json();
//     errorMessage = errorData.message || errorMessage;

//     throw new Error(errorMessage);
//   }

//   const data = await res.json();
//   return data;
// }
