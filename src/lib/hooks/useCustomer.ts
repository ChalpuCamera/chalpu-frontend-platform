import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerApi, type CustomerTasteDto, type CustomerProfileResponse } from '@/lib/api/customer/customer';
import { toast } from 'sonner';

// Query Keys
export const customerKeys = {
  all: ['customer'] as const,
  profile: () => [...customerKeys.all, 'profile'] as const,
  taste: () => [...customerKeys.all, 'taste'] as const,
};

// 고객 프로필 조회
export function useCustomerProfile() {
  return useQuery({
    queryKey: customerKeys.profile(),
    queryFn: async () => {
      const response = await customerApi.getProfile();
      return response.result;
    },
  });
}

// 고객 취향 정보 조회
export function useCustomerTaste() {
  return useQuery({
    queryKey: customerKeys.taste(),
    queryFn: async () => {
      const response = await customerApi.getCustomerTaste();
      return response.result;
    },
  });
}

// 고객 취향 정보 수정
export function useUpdateCustomerTaste() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CustomerTasteDto) => {
      const response = await customerApi.updateCustomerTaste(data);
      return response.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customerKeys.taste() });
      queryClient.invalidateQueries({ queryKey: customerKeys.profile() });
      toast.success('입맛 프로필이 업데이트되었습니다');
    },
    onError: () => {
      toast.error('프로필 업데이트에 실패했습니다');
    },
  });
}

// 고객 정보 수정
export function useUpdateCustomerProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<CustomerProfileResponse>) => {
      const response = await customerApi.updateProfile(data);
      return response.result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customerKeys.profile() });
      toast.success('프로필이 업데이트되었습니다');
    },
    onError: () => {
      toast.error('프로필 업데이트에 실패했습니다');
    },
  });
}

// 낙관적 업데이트를 위한 취향 정보 수정
export function useOptimisticUpdateTaste() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CustomerTasteDto) => {
      const response = await customerApi.updateCustomerTaste(data);
      return response.result;
    },
    onMutate: async (newTaste) => {
      await queryClient.cancelQueries({ queryKey: customerKeys.taste() });

      const previousTaste = queryClient.getQueryData(customerKeys.taste());

      queryClient.setQueryData(customerKeys.taste(), (old: CustomerTasteDto | undefined) => {
        if (!old) return newTaste;
        return { ...old, ...newTaste };
      });

      return { previousTaste };
    },
    onError: (err, newTaste, context) => {
      if (context?.previousTaste) {
        queryClient.setQueryData(customerKeys.taste(), context.previousTaste);
      }
      toast.error('프로필 업데이트에 실패했습니다');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: customerKeys.taste() });
    },
    onSuccess: () => {
      toast.success('입맛 프로필이 업데이트되었습니다');
    },
  });
}