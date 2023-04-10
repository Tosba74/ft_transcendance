export interface WsResponseDto<T> {
  error?: string;

  value: T | undefined;
}
