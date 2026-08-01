import { HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  COURT_NOT_FOUND = 'COURT_NOT_FOUND',
  COURT_ALREADY_EXISTS = 'COURT_ALREADY_EXISTS',
  TIME_SLOT_NOT_FOUND = 'TIME_SLOT_NOT_FOUND',
  TIME_SLOT_ALREADY_EXISTS = 'TIME_SLOT_ALREADY_EXISTS',
}

export const ErrorMessage = {
  [ErrorCode.COURT_NOT_FOUND]: 'Court not found',
  [ErrorCode.COURT_ALREADY_EXISTS]: 'Court already exists',
  [ErrorCode.TIME_SLOT_NOT_FOUND]: 'Time slot not found',
  [ErrorCode.TIME_SLOT_ALREADY_EXISTS]: 'Time slot already exists',
};

export const ErrorStatus = {
  [ErrorCode.COURT_NOT_FOUND]: HttpStatus.NOT_FOUND,
  [ErrorCode.COURT_ALREADY_EXISTS]: HttpStatus.BAD_REQUEST,
  [ErrorCode.TIME_SLOT_NOT_FOUND]: HttpStatus.NOT_FOUND,
  [ErrorCode.TIME_SLOT_ALREADY_EXISTS]: HttpStatus.BAD_REQUEST,
};
