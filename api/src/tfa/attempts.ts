export class Attempts {
	login_date: Date;
	attempt_no: number;
}

export const LIMIT_ATTEMPT = 3;
export const NO_ATTEMPT_REMAINING = 0;
export const LIMIT_ATTEMPTS_ERROR = -1;
export const LIMIT_TIME_ERROR = -2;

// 5 min (prod)
export const TIME_LIMIT_IN_MIN = 5;
export const TIME_LIMIT_IN_MS = 1000 * 60 * TIME_LIMIT_IN_MIN;

// 1 min (pour tester)
// export const TIME_LIMIT_IN_MIN = 1;
// export const TIME_LIMIT_IN_MS = 1000 * 60 * TIME_LIMIT_IN_MIN;