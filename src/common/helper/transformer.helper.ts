import { BadRequestException } from '@nestjs/common';

interface ToNumberOptions {
  default?: number;
  min?: number;
  max?: number;
}

export function toLowerCase(value: string): string {
  return value.toLowerCase();
}

export function trim(value: string, opts: { name?: string; length?: { min?: number; max?: number } } = {}): string {
  const newValue = value.trim();
  if (opts.length?.min && newValue && newValue.length < opts.length.min)
    throw new BadRequestException(
      `${opts.name ? opts.name + ' ' : ''}must be longer than or equal to ${opts.length.min} characters after trim`,
    );
  if (opts.length?.max && newValue && newValue.length > opts.length.max)
    throw new BadRequestException(
      `${opts.name ? opts.name + ' ' : ''}must be shoter than or equal to ${opts.length.max} charaters after trim`,
    );
  return newValue;
}

export function toDate(value: string): Date {
  return new Date(value);
}

export function toBoolean(value?: string): boolean {
  if (!value) return false;

  value = value.toLowerCase();
  return value === 'true' || value === '1' ? true : false;
}

export function toNumber(value: string, opts: ToNumberOptions = {}): number {
  let newValue: number = Number.parseInt(value || String(opts.default), 10);

  if (Number.isNaN(newValue)) {
    newValue = opts.default;
  }

  if (opts.min || opts.min === 0) {
    if (newValue < opts.min) {
      newValue = opts.min;
    }

    if (newValue > opts.max) {
      newValue = opts.max;
    }
  }

  return newValue;
}

export function numberToString(value): string {
  const newValue = value.toString();
  return newValue;
}
