export class ChatResponseDto<T> {
	error?: string;

    value: T | undefined;
}
