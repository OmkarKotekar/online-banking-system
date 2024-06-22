import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import Link from 'next/link';

const Carousel = () => {
  const slides = [
    { url: "1.jpg" },
    { url: "2.jpg" },
    { url: "3.png" },
    { url: "4.jpg" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <>
      <div className="min-w-screen h-[400px] w-full m-auto relative group">
        <div className="w-full h-full rounded-2xl bg-center bg-cover duration-500" style={{ backgroundImage: `url(${slides[currentIndex].url})`}}>
          <div className="w-full h-full bg-black/50 flex flex-col justify-center items-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold">Welcome to Thakur Bank</h1>
              <p className="text-xl font-medium pl-2">Your Trusted Financial Partner</p>
              <div className="pt-5">
                <Link href="/register">
                  <button className="p-2 bg-[#0033a0] text-white rounded-md cursor-pointer">Open an Account</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden group-hover:block absolute top-[45%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        <div className="hidden group-hover:block absolute top-[45%] -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
        <div className="flex top-4 justify-center py-2">
          {slides.map((slide, slideIndex) => (
            <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className="text-2xl cursor-pointer">
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Carousel;
