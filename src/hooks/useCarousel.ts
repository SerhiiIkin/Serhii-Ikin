import { useEffect, useRef, useState } from 'react';
import type { MouseEvent, TouchEvent } from 'react';

import type { CarouselProps } from '@modules/CarouselProps';

export const useCarousel = ({
  data,
  duration,
  spaceBetween,
  interval,
  draggable,
}: CarouselProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const SInterval = useRef<NodeJS.Timeout | undefined>(undefined);

  const [currentData, setCurrentData] = useState<string[]>(data);
  const [currentTransformX, setCurrentTransformX] = useState(0);
  const [translate, setTranslate] = useState(0);
  const [transition, setTransition] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const changeSlide = (diraction: string, e?: MouseEvent) => {
    e?.preventDefault();
    clearIntervalSlide();
    const containerOffetWidth = containerRef.current?.offsetWidth ?? 0;

    const lastToFirst = (prev: string[]) => {
      return [prev[prev.length - 1], ...prev.slice(0, -1)];
    };

    const firstToLast = (prev: string[]) => [...prev.slice(1), prev[0]];

    setTransition(duration);

    setTranslate(prev =>
      diraction === 'left'
        ? prev + containerOffetWidth + spaceBetween
        : prev - containerOffetWidth - spaceBetween
    );

    setTimeout(() => {
      setTransition(0);
      setTranslate(0);
      setCurrentData(prev =>
        diraction === 'left' ? lastToFirst(prev) : firstToLast(prev)
      );
    }, duration + 1);
    checkInterval();
  };

  const checkInterval = () => {
    if (interval >= 2000 && !isNaN(interval)) {
      startIntervalSlide();
    } else {
      clearIntervalSlide();
    }
  };

  const startIntervalSlide = () => {
    SInterval.current = setInterval(() => {
      changeSlide('right');
    }, interval);
  };

  const clearIntervalSlide = () => {
    clearInterval(SInterval.current);
  };

  const startDrag = (e: MouseEvent | TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!draggable) return;
    clearIntervalSlide();
    setIsDragging(true);
    const startX = e.type.startsWith('touch')
      ? (e as TouchEvent).touches[0].clientX
      : (e as MouseEvent).clientX;

    setStartX(startX);
  };

  const drag = (e: Event | TouchEvent | MouseEvent) => {
    e.preventDefault();
    if (!isDragging) return;
    const x = e.type.startsWith('touch')
      ? (e as TouchEvent).touches[0].clientX
      : (e as MouseEvent).clientX;
    if (wrapperRef.current)
      wrapperRef.current.style.translate = `${x - startX}px`;
  };

  const stopDrag = (e: Event | TouchEvent | MouseEvent) => {
    e.preventDefault();
    if (!isDragging) return;
    setIsDragging(false);
    const endX = e.type.startsWith('touch')
      ? (e as TouchEvent).changedTouches[0].clientX
      : (e as MouseEvent).clientX;

    if (Math.abs(startX - endX) > 100) {
      if (startX < endX) {
        changeSlide('left');
      } else if (startX > endX) {
        changeSlide('right');
      }
    } else {
      if (wrapperRef.current) wrapperRef.current.style.translate = 'none';
    }
    checkInterval();
  };

  const init = () => {
    const containerOffetWidth = containerRef.current?.offsetWidth ?? 0;
    setCurrentTransformX(-containerOffetWidth - spaceBetween);
    if (interval) checkInterval();
  };

  useEffect(() => {
    init();
    return () => clearIntervalSlide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const lastToFirst =
      data.length > 0 ? [data[data?.length - 1], ...data.slice(0, -1)] : [];
    setCurrentData(lastToFirst);
  }, [data]);

  return {
    startDrag,
    drag,
    stopDrag,
    containerRef,
    wrapperRef,
    slideRef,
    currentTransformX,
    translate,
    transition,
    currentData,
    changeSlide,
  };
};
