export interface ChatResponse<T> {
	error?: string;

    value: T | undefined;
}
