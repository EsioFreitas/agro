export class StringFormatter {
  static keepOnlyNumbers(value: string): string {
    return value.replace(/\D/g, '');
  }
}
