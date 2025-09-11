"use client";
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const StoreMenuList = () => {
  const router = useRouter();
  
  const menuItems = [
    {
      id: 1,
      name: "기영이 김치찌개",
      price: "8,000원",
      reviewCount: "32개",
      hasImage: false
    },
    {
      id: 2,
      name: "오믈렛",
      price: "9,000원", 
      reviewCount: "11개",
      hasImage: true
    },
    {
      id: 3,
      name: "김밥",
      price: "3,000원",
      reviewCount: "45개", 
      hasImage: true
    },
    {
      id: 4,
      name: "제육볶음",
      price: "11,000원",
      reviewCount: "9개",
      hasImage: true
    }
  ];

  const handleBack = () => {
    router.back();
  };

  const handleAddMenu = () => {
    router.push('/owner/menu/add');
  };

  return (
    <div className="min-h-screen bg-white w-full max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center h-11 px-3.5 py-2.5">
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-0 h-6 w-6 hover:bg-transparent"
          onClick={handleBack}
        >
          <ArrowLeft className="h-6 w-6 text-gray-800" />
        </Button>
      </div>

      {/* Title */}
      <div className="px-4 pt-1 pb-4">
        <h1 className="text-title-2 text-gray-800">우리 가게 메뉴</h1>
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item) => (
          <div key={item.id} className="h-30.5 px-4">
            <div className="flex items-start gap-4 h-full py-3">
              {/* Menu Image */}
              <div className="w-24 h-24 bg-gray-100 border border-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                {item.hasImage ? (
                  <div className="w-full h-full bg-gradient-to-br from-orange-200 to-orange-300" />
                ) : (
                  <div className="w-full h-full bg-gray-100" />
                )}
              </div>

              {/* Menu Info */}
              <div className="flex-1 flex flex-col justify-between h-24">
                <div className="flex items-start justify-between">
                  <h3 className="text-headline-b text-gray-800">{item.name}</h3>
                  <Button 
                    variant="outline" 
                    className="h-6 px-3 text-sub-body-sb border-gray-800 text-gray-800 rounded-md hover:bg-gray-50"
                  >
                    자세히
                  </Button>
                </div>
                
                <p className="text-headline-m text-gray-600">{item.price}</p>
                
                <div className="flex items-center gap-0.5">
                  <span className="text-body-sb text-gray-800">✨</span>
                  <span className="text-body-sb text-blue-600">{item.reviewCount}</span>
                  <span className="text-body-r text-gray-800">의 평가가 있어요</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto p-4 bg-white">
        <button 
          className="w-full h-14 bg-blue-950 hover:bg-blue-900 text-white text-body-sb rounded-lg transition-colors"
          onClick={handleAddMenu}
        >
          메뉴 추가하기
        </button>
      </div>
    </div>
  );
};

export default StoreMenuList;