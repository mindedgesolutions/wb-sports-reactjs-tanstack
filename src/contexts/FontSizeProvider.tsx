import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type FontSizeContextType = {
  scale: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
};

const FontSizeContext = createContext<FontSizeContextType | undefined>(
  undefined,
);

const MIN_SCALE = 0.8;
const MAX_SCALE = 1.5;
const STEP = 0.1;

export const FontSizeProvider = ({ children }: { children: ReactNode }) => {
  const [scale, setScale] = useState<number>(() => {
    const saved = localStorage.getItem('fontScale');
    return saved ? Number(saved) : 1;
  });

  useEffect(() => {
    document.documentElement.style.fontSize = `${scale * 16}px`;

    localStorage.setItem('fontScale', scale.toString());
  }, [scale]);

  const increase = () => {
    setScale((prev) => Math.min(prev + STEP, MAX_SCALE));
  };

  const decrease = () => {
    setScale((prev) => Math.max(prev - STEP, MIN_SCALE));
  };

  const reset = () => {
    setScale(1);
  };

  return (
    <FontSizeContext.Provider value={{ scale, increase, decrease, reset }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => {
  const context = useContext(FontSizeContext);

  if (!context) {
    throw new Error('useFontSize must be used inside FontSizeProvider');
  }

  return context;
};
