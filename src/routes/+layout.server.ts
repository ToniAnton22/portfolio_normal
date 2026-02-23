import { dev } from '$app/environment';
import {
	DAVE_KEY,
	INTERNAL_KEY,
	PLANE_SERVER_URL,
	PREVIEW_PASSWORD,
	PREVIEW_EMAIL
} from '$env/static/private';
import type { Cookies, ServerLoad } from '@sveltejs/kit';
import { randomUUID } from 'crypto';

export const load: ServerLoad = async ({ cookies }) => {
	const key = cookies.get('key');

	if (!key) {
		cookies.set('key', randomUUID(), { path: '/' });
	}

	await verifyTokenForMcp(cookies.get('token') ?? '', cookies);

	return {};
};

const verifyTokenForMcp = async (token: string, cookies: Cookies) => {
	if (!token) {
		const result = await fetch(`${PLANE_SERVER_URL}/User/login`, {
			method: 'POST',
			headers: {
				'DAVE-KEY': DAVE_KEY,
				'Content-Type': 'application/json',
				'X-Internal-Request': INTERNAL_KEY
			},
			body: JSON.stringify({
				email: PREVIEW_EMAIL,
				password: PREVIEW_PASSWORD,
				role: 'Previewer'
			})
		});

		if (result.status != 200) {
			throw new Error('Failed to Login.');
		}
		token = (await result.json()).accessToken as string;
		const decoded = decodeJWT(token);
		if (!decoded) {
			throw new Error('Decoding failed. Invalid return');
		}
		cookies.set('token', token, {
			expires: decoded?.expiresAt,
			path: '/',
			secure: !dev
		});

		return token;
	}
	const checkToken = await fetch(`${PLANE_SERVER_URL}/User/check/token`, {
		headers: {
			'DAVE-KEY': DAVE_KEY,
			Authorization: `Bearer ${token}`,
			'X-Internal-Request': INTERNAL_KEY
		}
	});
	if (checkToken.status === 401) {
		throw new Error('Check failed. Token is invalid');
	}
	const resultCheck = await checkToken.json();

	if (resultCheck) {
		return token;
	} else {
		const result = await fetch(`${PLANE_SERVER_URL}/User/login`, {
			headers: {
				'DAVE-KEY': DAVE_KEY,
				'Content-Type': 'application/json',
				'X-Internal-Request': INTERNAL_KEY
			},
			method: 'POST',
			body: JSON.stringify({
				email: PREVIEW_EMAIL,
				password: PREVIEW_PASSWORD,
				role: 'Previewer'
			})
		});
		token = (await result.json()).accessToken as string;
		const decoded = decodeJWT(token);
		cookies.set('token', token, {
			expires: decoded?.expiresAt,
			path: '/',
			secure: !dev
		});
	
		return token;
	}
};

interface DecodedToken {
	userId: string;
	name: string;
	role: string;
	email: string;
	lastLoginAt: string | null;
	campaignId: string | null;
	exp: number;
	expiresAt: Date;
	timeUntilExpiry: number;
	isExpired: () => boolean;
	isExpiringSoon: (minutesThreshold?: number) => boolean;
	timeRemaining: () => string;
}

function decodeJWT(token: string): DecodedToken | null {
	try {
		const payload = token.split('.')[1];
		const decoded = JSON.parse(atob(payload));
		const now = Date.now() / 1000;
		const exp = decoded.exp;
		const timeUntilExpiry = exp - now;

		// Supabase JWT structure
		return {
			userId: decoded.sub || decoded.user_id,
			name:
				decoded.username ||
				decoded.user_metadata?.username ||
				decoded.email?.split('@')[0] ||
				'User',
			role: decoded.app_role || decoded.user_metadata?.role || 'Player',
			email: decoded.email,
			lastLoginAt: decoded.last_login_at || decoded.user_metadata?.last_login_at || null,
			campaignId: decoded.campaign_id || decoded.user_metadata?.campaign_id || null,
			exp: exp,
			expiresAt: new Date(exp * 1000),
			timeUntilExpiry: timeUntilExpiry,
			isExpired: () => now >= exp,
			isExpiringSoon: (minutesThreshold = 5) => timeUntilExpiry <= minutesThreshold * 60,
			timeRemaining: () => {
				if (timeUntilExpiry <= 0) return 'Expired';
				const hours = Math.floor(timeUntilExpiry / 3600);
				const minutes = Math.floor((timeUntilExpiry % 3600) / 60);
				return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
			}
		};
	} catch (error) {
		console.error('Invalid JWT token:', error);
		return null;
	}
}
