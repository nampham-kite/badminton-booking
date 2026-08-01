export class ListResponseDto<T> {
  data!: T[];
  total!: number;
  page!: number;
  limit!: number;
}
