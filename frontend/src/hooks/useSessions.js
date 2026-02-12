import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sessionApi } from "../api/sessions";

export const useCreateSession = () => {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: ["createSession"],
    mutationFn: sessionApi.createSession,
    onSuccess: () => {
     toast.success("Session created successfully!");
      queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
      queryClient.invalidateQueries({ queryKey: ["myRecentSessions"] });
    },
    onError: (error) => {
      const msg =
        error.response?.data?.message ||
        error.message ||
        (error.code === "ERR_NETWORK" ? "Cannot reach server. Check API URL in production." : "Failed to create room");
      toast.error(msg);
    },
  });

  return result;
};

export const useActiveSessions = () => {
  const result = useQuery({
    queryKey: ["activeSessions"],
    queryFn: sessionApi.getActiveSessions,
  });

  return result;
};

export const useMyRecentSessions = () => {
  const result = useQuery({
    queryKey: ["myRecentSessions"],
    queryFn: sessionApi.getMyRecentSessions,
  });

  return result;
};

export const useSessionById = (id) => {
  const result = useQuery({
    queryKey: ["session", id],
    queryFn: () => sessionApi.getSessionById(id),
    enabled: !!id,
    refetchInterval: 5000, // refetch every 5 seconds to detect session status changes
  });

  return result;
};

export const useJoinSession = () => {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: ["joinSession"],
    mutationFn: sessionApi.joinSession,
    onSuccess: (_data, id) => {
      toast.success("Joined session successfully!");
      queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
      queryClient.invalidateQueries({ queryKey: ["myRecentSessions"] });
      if (id) queryClient.invalidateQueries({ queryKey: ["session", id] });
    },
    onError: (error) => toast.error(error.response?.data?.message || "Failed to join session"),
  });

  return result;
};

export const useEndSession = () => {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: ["endSession"],
    mutationFn: sessionApi.endSession,
    onSuccess: (_data, id) => {
      toast.success("Session ended successfully!");
     queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
      queryClient.invalidateQueries({ queryKey: ["myRecentSessions"] });
      if (id) queryClient.invalidateQueries({ queryKey: ["session", id] });
    },
    onError: (error) => toast.error(error.response?.data?.message || "Failed to end session"),
  });

  return result;
};