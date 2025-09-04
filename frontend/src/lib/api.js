import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const res = await axiosInstance.post("/auth/signup", signupData);
  return res.data;
};

export const login = async (loginData) => {
  const res = await axiosInstance.post("/auth/login", loginData);
  return res.data;
};

export const logout = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data; // logged-in user data
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 404) {
      // Not logged in yet → handle silently
      return null;
    }
    console.error("Unexpected error in getAuthUser:", error.message);
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  const res = await axiosInstance.post("/auth/onboarding", userData);
  return res.data;
};

export async function getUserFriends() {
  const res = await axiosInstance.get("/users/friends");
  return res.data;
}

export async function getRecommendedUsers() {
  const res = await axiosInstance.get("/users");
  return res.data;
}

export async function getOutgoingFriendReqs() {
  const res = await axiosInstance.get("/users/outgoing-friend-requests");
  return res.data;
}

export async function sendFriendRequest(userId) {
  const res = await axiosInstance.post(`/users/friend-request/${userId}`);
  return res.data;
}

export async function getFriendRequests() {
  const res = await axiosInstance.get("/users/friend-requests");
  return res.data;
}

export async function acceptFriendRequest(requestId) {
  const res = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
  return res.data;
}

export async function getStreamToken() {
  const res = await axiosInstance.get("/chat/token");
  return res.data;
}
