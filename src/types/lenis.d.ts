declare module 'lenis' {
   export interface LenisOptions {
      wrapper?: HTMLElement;
      content?: HTMLElement;
      duration?: number;
      easing?: (t: number) => number;
      smoothWheel?: boolean;
      touchMultiplier?: number;
      infinite?: boolean;
      gestureOrientation?: string;
      wheelMultiplier?: number;
      lerp?: number;
      syncTouch?: boolean;
      syncTouchLerp?: number;
   }

   export interface LenisInstance {
      on: (event: string, callback: (e: any) => void) => void;
      raf: (time: number) => void;
      destroy: () => void;
   }

   export default class Lenis {
      constructor(options: LenisOptions);
      on: (event: string, callback: (e: any) => void) => void;
      raf: (time: number) => void;
      destroy: () => void;
   }
}