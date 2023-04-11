export class WsResponseDto<T> {
	error?: string;

    value: T | undefined;
}
