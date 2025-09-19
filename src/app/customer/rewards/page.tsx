"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useRewardBalance,
  useAvailableVouchers,
  useMyVouchers,
  useRedeemVoucher,
} from "@/lib/hooks/useCustomerReward";
import { toast } from "sonner";

export default function RewardsPage() {
  const { data: balance, isLoading: balanceLoading } = useRewardBalance();
  const { data: vouchers, isLoading: vouchersLoading } = useAvailableVouchers();
  const { data: myVouchers, isLoading: myVouchersLoading } = useMyVouchers('ALL');
  const redeemVoucher = useRedeemVoucher();

  const handleExchange = (voucherId: string) => {
    redeemVoucher.mutate(voucherId, {
      onError: () => {
        toast.error("상품권 교환에 실패했습니다.");
      },
    });
  };

  if (balanceLoading || vouchersLoading || myVouchersLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex flex-col gap-6 p-5 pt-16 mx-auto max-w-md">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col gap-6 p-5 pt-16 mx-auto max-w-md">
        {/* 헤더 */}
        <h1 className="text-2xl font-bold">🎁 리워드</h1>

        {/* 적립 현황 */}
        <Card className="border border-foreground p-0">
          <CardContent className="p-5">
            <h3 className="text-lg font-semibold mb-5">📊 적립 현황</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold mb-2">{balance?.currentBalance || 0}P</p>
                <p className="text-sm text-muted-foreground">
                  {balance && balance.currentBalance >= 5
                    ? "상품권 교환 가능!"
                    : `${5 - (balance?.currentBalance || 0)}P 더 모으면 교환 가능!`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 상품권 목록 */}
        <Card className="border border-foreground p-0">
          <CardContent className="p-5">
            <h3 className="text-lg font-semibold mb-5">🎫 교환 가능 상품권</h3>
            <div className="space-y-3">
              {vouchers && vouchers.length > 0 ? (
                vouchers.map((voucher) => (
                  <div
                    key={voucher.id}
                    className="flex items-center justify-between py-3 border-b last:border-0"
                  >
                    <div>
                      <p className="font-medium text-sm">{voucher.name}</p>
                      <p className="text-xs text-muted-foreground">
                        필요 포인트: {voucher.requiredPoints}P
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={
                        (balance?.currentBalance || 0) < voucher.requiredPoints ||
                        redeemVoucher.isPending
                      }
                      onClick={() => handleExchange(voucher.id)}
                      className="h-9 px-4"
                    >
                      {redeemVoucher.isPending ? "처리 중..." : "교환"}
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  교환 가능한 상품권이 없습니다
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 내 상품권 내역 */}
        <Card className="border border-foreground p-0">
          <CardContent className="p-5">
            <h3 className="text-base font-medium mb-4">📋 내 상품권</h3>
            {myVouchers && myVouchers.length > 0 ? (
              <div className="space-y-3">
                {myVouchers.map((voucher) => (
                  <div
                    key={voucher.id}
                    className="pb-3 border-b last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">{voucher.voucherName}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(voucher.redeemedAt).toLocaleDateString('ko-KR')} 교환
                        </p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded bg-muted">
                        {voucher.status === 'COMPLETED' ? '사용 완료' :
                         voucher.status === 'EXPIRED' ? '만료' :
                         voucher.status === 'PROCESSING' ? '처리중' :
                         voucher.status === 'FAILED' ? '실패' : voucher.status}
                      </span>
                    </div>
                    {voucher.voucherCode && (
                      <p className="text-xs font-mono bg-muted px-2 py-1 rounded mt-2">
                        {voucher.voucherCode}
                      </p>
                    )}
                    {voucher.expiresAt && (
                      <p className="text-xs text-muted-foreground mt-1">
                        만료일: {new Date(voucher.expiresAt).toLocaleDateString('ko-KR')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">아직 교환한 상품권이 없습니다</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}