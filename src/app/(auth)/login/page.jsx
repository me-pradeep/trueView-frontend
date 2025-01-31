import Image from "next/image";
import React from "react";
import Google from "@/components/google";
import Link from "next/link";

function page() {
  return (
    <>
      <Image
        src="/rating.svg"
        height={400}
        width={400}
        alt="rating"
        className="max-md:w-72 max-md:h-auto"
        priority
      />
      <div className="text-center text-4xl font-bold w-[50%] max-xl:w-[70%] max-lg:w-[80%] max-lg:text-3xl max-md:w-[90%] max-md:text-2xl">
        Discover, <span className="text-red-400">Review</span>, and{" "}
        <span className="text-red-400">Rate</span> People{" "}
        <span className="text-red-400">Anonymously</span>, at Any Time.
      </div>
      <Google />
      <div className="flex gap-3">
        <Link href="/privacypolicy" className="text-blue-600">Privacy Policy</Link>
        <Link href="/termsofservice" className="text-blue-600">Terms of Service</Link>
      </div>
    </>
  );
}

export default page;
