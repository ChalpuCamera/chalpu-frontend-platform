"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus } from "lucide-react";

export default function AddMenuPage() {
  const router = useRouter();
  const [menuName, setMenuName] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [menuDescription, setMenuDescription] = useState("");
  const [menuImage, setMenuImage] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMenuImage(file);
    }
  };

  const handleSubmit = () => {
    // 메뉴 등록 로직
    console.log({
      menuName,
      menuPrice,
      menuDescription,
      menuImage
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center h-14 px-4">
        <button 
          className="flex items-center justify-center w-10 h-10"
          onClick={() => router.back()}
        >
          <ArrowLeft size={24} className="text-foreground" />
        </button>
      </div>

      {/* Main Content */}
      <div className="px-5 pt-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-foreground mb-8">
          메뉴 등록하기
        </h1>

        {/* Form Content */}
        <div className="space-y-8">
          {/* Menu Photo */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              메뉴 사진
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-24 h-24 opacity-0 cursor-pointer"
              />
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                <Plus size={32} className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Menu Name */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              메뉴 이름
            </label>
            <input
              type="text"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              className="w-full h-12 bg-gray-100 rounded-lg px-4 border-none outline-none text-base text-foreground placeholder:text-gray-400"
              placeholder="메뉴 이름을 입력하세요"
            />
          </div>

          {/* Menu Price */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              판매 가격
            </label>
            <input
              type="text"
              value={menuPrice}
              onChange={(e) => setMenuPrice(e.target.value)}
              className="w-full h-12 bg-gray-100 rounded-lg px-4 border-none outline-none text-base text-foreground placeholder:text-gray-400"
              placeholder="가격을 입력하세요"
            />
          </div>

          {/* Menu Description */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              메뉴 설명
            </label>
            <textarea
              value={menuDescription}
              onChange={(e) => setMenuDescription(e.target.value)}
              className="w-full h-32 bg-gray-100 rounded-lg p-4 border-none outline-none text-base text-foreground placeholder:text-gray-400 resize-none"
              placeholder="메뉴에 대한 설명을 입력하세요"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="fixed bottom-8 left-5 right-5">
          <button
            onClick={handleSubmit}
            className="w-full h-14 bg-indigo-900 text-white text-base font-semibold rounded-lg hover:bg-indigo-800 transition-colors"
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}