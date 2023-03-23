export class Attempts {
	login_date: Date;
	attempt_no: number;
}

export const LIMIT_ATTEMPT = 3;
export const TIME_LIMIT_IN_MIN = 5;
export const TIME_LIMIT_IN_MS = 1000 * 60 * 5; // 5 min