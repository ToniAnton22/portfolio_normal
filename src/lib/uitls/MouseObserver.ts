// Types describing the data we send to callbacks
export interface MouseData {
  x: number;
  y: number;
  event: MouseEvent;
}

export interface ScrollData {
  x: number;
  y: number;
  event: Event;
}

// Each element gets both mouse+scroll info (optionally)
export type InteractionCallback = (
  el: HTMLElement,
  data: {
    mouse?: MouseData;
    scroll?: ScrollData;
  }
) => void;

export class InteractionObserver {
  private subscribers: Map<HTMLElement, InteractionCallback> = new Map();

  private lastMouse: MouseData | null = null;
  private lastScroll: ScrollData | null = null;

  private boundOnMouseMove: (event: MouseEvent) => void;
  private boundOnScroll: (event: Event) => void;

  constructor() {
    this.boundOnMouseMove = this.onMouseMove.bind(this);
    this.boundOnScroll = this.onScroll.bind(this);

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', this.boundOnMouseMove);
      window.addEventListener('scroll', this.boundOnScroll, { passive: true });
    }
  }

  private onMouseMove(event: MouseEvent) {
    this.lastMouse = {
      x: event.clientX,
      y: event.clientY,
      event
    };

    this.notifySubscribers();
  }

  private onScroll(event: Event) {
    // You can use scrollX/scrollY or pageXOffset/pageYOffset
    this.lastScroll = {
      x: window.scrollX,
      y: window.scrollY,
      event
    };

    this.notifySubscribers();
  }

  private notifySubscribers() {
    for (const [el, callback] of this.subscribers.entries()) {
      callback(el, {
        mouse: this.lastMouse ?? undefined,
        scroll: this.lastScroll ?? undefined
      });
    }
  }

  public observe(el: HTMLElement, callback: InteractionCallback) {
    if (!el || typeof callback !== 'function') {
      throw new Error('observe() requires a valid element and callback');
    }

    this.subscribers.set(el, callback);

    // Optionally, immediately send current state if we already have some
    if (this.lastMouse || this.lastScroll) {
      callback(el, {
        mouse: this.lastMouse ?? undefined,
        scroll: this.lastScroll ?? undefined
      });
    }
  }

  public unobserve(el: HTMLElement) {
    this.subscribers.delete(el);
  }

  public disconnect() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('mousemove', this.boundOnMouseMove);
      window.removeEventListener('scroll', this.boundOnScroll);
    }
    this.subscribers.clear();
  }
}

export const interactionObserver =
  typeof window !== 'undefined' ? new InteractionObserver() : null;
