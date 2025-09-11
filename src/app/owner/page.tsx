"use client";

import React from 'react';
import { Settings, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function OwnerDashboardPage() {
  const router = useRouter();
  
  const handleMenuRegister = () => {
    router.push('/owner/menu/add');
  };

  const handleContact = () => {
    console.log('문의하기 클릭');
  };

  const handleMenuView = () => {
    router.push('/owner/menu');
  };

  const handleSettings = () => {
    router.push('/owner/mypage');
  };

  return (
    <div className="w-[375px] min-h-screen bg-white mx-auto relative">
      {/* Header - 정확한 높이와 위치 */}
      <header className="flex items-center justify-between h-[44px] px-4 relative">
        <div className="flex items-center">
          {/* Logo */}
          <img 
            src="/chalpu_logo.png" 
            alt="chalpoo" 
            className="h-[27px] w-auto"
          />
        </div>
        
        {/* Settings Button - 정확한 위치 */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-5 w-5 p-0"
          onClick={handleSettings}
        >
          <Settings className="h-5 w-5 text-black" />
        </Button>
      </header>

      {/* Store Profile Section - Figma 정확한 위치와 크기 */}
      <section className="px-4" style={{ paddingTop: '24px' }}>
        <div className="flex items-center h-16">
          {/* Profile Image - 정확한 크기와 위치 */}
          <div className="relative mr-4">
            <div className="w-16 h-16 bg-[#f1f3f5] rounded-full"></div>
            {/* Inner image placeholder */}
            <div 
              className="absolute bg-gray-300 rounded"
              style={{
                width: '46px',
                height: '46px',
                left: '9px',
                top: '9px'
              }}
            ></div>
          </div>
          
          {/* Store Info */}
          <div className="flex-1">
            <h1 
              className="text-[#343a40] mb-0"
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '20px',
                fontWeight: 700,
                lineHeight: '26px',
                letterSpacing: '-0.4px'
              }}
            >
              송파기영이네분식
            </h1>
            <p 
              className="text-[#343a40]"
              style={{
                fontFamily: 'Pretendard, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '21px',
                letterSpacing: '-0.4px',
                marginTop: '0px'
              }}
            >
              안녕하세요 사장님 👨‍🌾
            </p>
          </div>
        </div>
      </section>

      {/* Menu Section - 정확한 간격과 위치 */}
      <section className="px-4" style={{ paddingTop: '34px' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 
            className="text-[#343a40]"
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '20px',
              fontWeight: 700,
              lineHeight: '26px',
              letterSpacing: '-0.4px'
            }}
          >
            우리 가게 메뉴
          </h2>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-5 w-5 p-0"
            onClick={handleMenuView}
          >
            <ChevronRight className="h-5 w-5 text-black" />
          </Button>
        </div>

        {/* Empty State Card - 정확한 크기와 스타일 */}
        <div 
          className="bg-white text-center"
          style={{
            width: '343px',
            height: '96px',
            paddingTop: '14px'
          }}
        >
          <p 
            className="text-[#495057] mb-4"
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '21px',
              letterSpacing: '-0.28px'
            }}
          >
            메뉴를 등록하면 손님이 평가할 수 있어요
          </p>
          <Button
            onClick={handleMenuRegister}
            className="bg-[#162456] hover:bg-[#162456]/90 text-white rounded-lg"
            style={{
              width: '106px',
              height: '34px',
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '21px',
              letterSpacing: '-0.28px'
            }}
          >
            메뉴 등록하기
          </Button>
        </div>
      </section>

      {/* Reviews Section - 정확한 위치와 간격 */}
      <section className="px-4" style={{ paddingTop: '49px' }}>
        <h2 
          className="text-[#343a40] mb-11"
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '20px',
            fontWeight: 700,
            lineHeight: '26px',
            letterSpacing: '-0.4px'
          }}
        >
          손님 종합 평가
        </h2>

        {/* Review Stats Cards - 정확한 그리드와 크기 */}
        <div className="flex gap-[10px] mb-[20px]">
          {/* Total Reviews Card */}
          <Card className="border-[#dee2e6] rounded-lg" style={{ width: '167px', height: '87px' }}>
            <CardContent className="p-0 relative overflow-hidden h-full">
              <div className="p-4 relative z-10">
                <p 
                  className="text-[#495057] mb-1"
                  style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '21px',
                    letterSpacing: '-0.28px'
                  }}
                >
                  총 평가 수
                </p>
                <p 
                  className="text-[#343a40]"
                  style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '24px',
                    fontWeight: 700,
                    lineHeight: '31px',
                    letterSpacing: '-0.24px'
                  }}
                >
                  0
                </p>
              </div>
              {/* Background Circle - 정확한 위치와 크기 */}
              <div 
                className="absolute bg-gradient-to-br from-[#1386ff] to-[#0b5099] rounded-full"
                style={{
                  width: '99px',
                  height: '99px',
                  top: '-55px',
                  right: '-41px'
                }}
              ></div>
            </CardContent>
          </Card>

          {/* Average Score Card */}
          <Card className="border-[#dee2e6] rounded-lg" style={{ width: '166px', height: '87px' }}>
            <CardContent className="p-0 relative overflow-hidden h-full">
              <div className="p-4 relative z-10">
                <p 
                  className="text-[#495057] mb-1"
                  style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '21px',
                    letterSpacing: '-0.28px'
                  }}
                >
                  평균 점수
                </p>
                <p 
                  className="text-[#343a40]"
                  style={{
                    fontFamily: 'Pretendard, sans-serif',
                    fontSize: '24px',
                    fontWeight: 700,
                    lineHeight: '31px',
                    letterSpacing: '-0.24px'
                  }}
                >
                  0.0
                </p>
              </div>
              {/* Background Circle - 정확한 위치와 크기 */}
              <div 
                className="absolute bg-gradient-to-br from-[#1386ff] to-[#0b5099] rounded-full"
                style={{
                  width: '99px',
                  height: '99px',
                  top: '-55px',
                  right: '-42px'
                }}
              ></div>
            </CardContent>
          </Card>
        </div>

        {/* Chart Placeholders - 정확한 크기와 간격 */}
        <div className="space-y-[20px]">
          <Card className="border-[#dee2e6] rounded-lg" style={{ width: '343px', height: '227px' }}>
            <CardContent className="p-4">
              <p 
                className="text-[#495057]"
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '21px',
                  letterSpacing: '-0.4px'
                }}
              >
                000 그래프
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-[#dee2e6] rounded-lg" style={{ width: '343px', height: '227px' }}>
            <CardContent className="p-4">
              <p 
                className="text-[#495057]"
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '21px',
                  letterSpacing: '-0.4px'
                }}
              >
                000 그래프
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recent Reviews Section - 정확한 위치와 간격 */}
      <section className="px-4" style={{ paddingTop: '47px', paddingBottom: '32px' }}>
        <h2 
          className="text-[#343a40] mb-11"
          style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '20px',
            fontWeight: 700,
            lineHeight: '26px',
            letterSpacing: '-0.4px'
          }}
        >
          최근 손님 평가
        </h2>

        {/* Empty State - 정확한 크기와 스타일 */}
        <div 
          className="bg-white text-center"
          style={{
            width: '343px',
            height: '96px',
            paddingTop: '14px'
          }}
        >
          <p 
            className="text-black mb-4"
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '21px',
              letterSpacing: '-0.28px'
            }}
          >
            아직 손님이 진행한 평가가 없어요
          </p>
          <Button
            onClick={handleContact}
            className="bg-[#162456] hover:bg-[#162456]/90 text-white rounded-lg"
            style={{
              width: '106px',
              height: '34px',
              fontFamily: 'Pretendard, sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: '21px',
              letterSpacing: '-0.4px'
            }}
          >
            문의하기
          </Button>
        </div>
      </section>
    </div>
  );
}