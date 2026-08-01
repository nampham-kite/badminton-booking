import { HttpException } from '@nestjs/common';
import {
  ErrorCode,
  ErrorMessage,
  ErrorStatus,
} from '../constants/erorr.contstant';

export class CourtNotFoundException extends HttpException {
  constructor() {
    super(
      ErrorMessage[ErrorCode.COURT_NOT_FOUND],
      ErrorStatus[ErrorCode.COURT_NOT_FOUND],
    );
  }
}
