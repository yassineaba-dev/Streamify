import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  if (!response.ok) throw new Error("Request failed");
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  if (!response.ok) throw new Error("Request failed");
  return response.data;
};
export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  if (!response.ok) throw new Error("Request failed");
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    if (!response.ok) throw new Error("Request failed");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  if (!response.ok) throw new Error("Request failed");
  return response.data;
};

export async function getUserFriends() {
  const response = await axiosInstance.get("/users/friends");
  if (!response.ok) throw new Error("Request failed");
  return response.data;
}

export async function getRecommendedUsers() {
  const response = await axiosInstance.get("/users");
  if (!response.ok) throw new Error("Request failed");
  return response.data;
}

export async function getOutgoingFriendReqs() {
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  if (!response.ok) throw new Error("Request failed");
  return response.data;
}

export async function sendFriendRequest(userId) {
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  if (!response.ok) throw new Error("Request failed");
  return response.data;
}

export async function getFriendRequests() {
  const response = await axiosInstance.get("/users/friend-requests");
  if (!response.ok) throw new Error("Request failed");
  return response.data;
}

export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
  if (!response.ok) throw new Error("Request failed");
  return response.data;
}

export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token");
  if (!response.ok) throw new Error("Request failed");
  return response.data;
}
