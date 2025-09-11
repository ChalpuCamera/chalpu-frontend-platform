"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function Page() {
  const [storeName, setStoreName] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const isValid = storeName.trim().length >= 1;

  const handleSubmit = () => {
    if (!isValid) {
      return;
    }
    console.log("Store name:", storeName);
  };

  return (
    <div className="bg-white w-full mx-auto px-4 pt-6 pb-16">
      {/* Header */}
      <div className="mb-6">
        <Image src="/logo_small.png" alt="Logo" width={85} height={25} />
      </div>

      {/* Title */}
      <div className="mb-12">
        <h1 className="text-2xl px-1 font-semibold text-gray-800">
          사장님, 운영하고 있는
          <br />
          가게가 어디인가요?
        </h1>
      </div>

      {/* Form Section */}
      <div className="mb-8">
        {/* Step 1: Store Name Input */}
        <div className="space-y-2.5">
          <Label
            htmlFor="storeName"
            className="text-base font-semibold text-gray-800"
          >
            가게 이름
          </Label>
          <Input
            id="storeName"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`h-[51px] bg-gray-200 rounded-[12px] ${
              isFocused ? "ring-2 ring-blue-500" : ""
            }`}
            placeholder=""
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center px-4">
        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full h-[60px] bg-[#162456] text-white rounded-[12px] text-base font-semibold disabled:opacity-80 disabled:cursor-not-allowed"
        >
          등록하기
        </Button>
      </div>
    </div>
  );
}
