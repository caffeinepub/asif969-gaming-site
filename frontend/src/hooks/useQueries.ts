import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, Transaction } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useCreateUser() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ username, phone, hashedPassword }: { username: string; phone: string; hashedPassword: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createUser(username, phone, hashedPassword);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

export function useGetUser(username: string) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ['user', username],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getUser(username);
    },
    enabled: !!actor && !actorFetching && !!username,
    retry: false,
  });
}

export function useGetTransactions(userId: string) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Transaction[]>({
    queryKey: ['transactions', userId],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getTransactions(userId);
    },
    enabled: !!actor && !actorFetching && !!userId,
    retry: false,
  });
}

export function useAddTransaction() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, type, amount, status }: { userId: string; type: string; amount: bigint; status: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addTransaction(userId, type, amount, status);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['transactions', variables.userId] });
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}
