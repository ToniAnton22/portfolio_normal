import { interactionObserver, type InteractionCallback } from '$lib/uitls/MouseObserver';

export interface MouseParallaxParams {
	speed?: number;
}

export interface InteractiveParallaxParams {
	scrollFactor?: number; // how much scroll affects y
	mouseFactor?: number; // how much mouse affects x
}

export function interactiveParallax(node: HTMLElement, params: InteractiveParallaxParams = {}) {
	if (!interactionObserver) return {};

	let scrollFactor = params.scrollFactor ?? 0.2;
	let mouseFactor = params.mouseFactor ?? 0.05;

	const callback: InteractionCallback = (el, { mouse, scroll }) => {
		const scrollY = scroll?.y ?? window.scrollY ?? 0;
		const mouseX = mouse?.x ?? 0;

		const translateY = scrollY * scrollFactor;

		// center mouseX around viewport center for nicer math
		const viewportCenterX = window.innerWidth / 2;
		const offsetX = mouseX - viewportCenterX;
		const translateX = offsetX * mouseFactor;

		el.style.transform = `translate(${translateX}px, ${translateY}px)`;
		el.style.willChange = 'transform';
	};

	interactionObserver.observe(node, callback);

	return {
		update(newParams: InteractiveParallaxParams = {}) {
			scrollFactor = newParams.scrollFactor ?? scrollFactor;
			mouseFactor = newParams.mouseFactor ?? mouseFactor;
		},
		destroy() {
			if (interactionObserver) {
				interactionObserver.unobserve(node);
			}
		}
	};
}

export function mouseParallax(node: HTMLElement, params: MouseParallaxParams = {}) {
	if (!interactionObserver) {
		// running on server – no-op
		return {};
	}

	let speed = params.speed ?? 0.1;

	const callback: InteractionCallback = (el, props) => {
		el.style.transform = `translate(${props.mouse?.x ?? 1 * speed}px, ${props.mouse?.y ?? 1 * speed}px)`;
	};

	interactionObserver.observe(node, callback);

	return {
		update(newParams: MouseParallaxParams = {}) {
			speed = newParams.speed ?? speed;
		},
		destroy() {
			if (interactionObserver) {
				interactionObserver.unobserve(node);
			}
		}
	};
}

export function scaleWords(node: HTMLElement, params: MouseParallaxParams = {}) {
	if (!interactionObserver) {
		return {};
	}

	let speed = params.speed ?? 0.2;
	const callback: InteractionCallback = (el, props) => {
		if (!props.mouse) {
			return;
		}
		const { x, y } = props.mouse;
		if (!x && !y) {
			return;
		}
		const rect = el.getBoundingClientRect();
		const inside = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
		if (inside) {
			el.style.transform = `scale(1.25)`;
			el.style.font = 'bold';
		} else {
			el.style.transform = 'scale(1)';
			el.style.font = 'normal';
		}
	};
	interactionObserver.observe(node, callback);

	return {
		update(newParams: MouseParallaxParams = {}) {
			speed = newParams.speed ?? speed;
		},
		destroy() {
			if (interactionObserver) {
				interactionObserver.unobserve(node);
			}
		}
	};
}
