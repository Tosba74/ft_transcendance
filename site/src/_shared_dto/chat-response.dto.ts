export interface ChatResponseDto<T> {
  error?: string;

  value: T | undefined;
}
