import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import * as winstonDailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class LoggingService implements LoggerService {
  logger: winston.Logger;

  constructor() {
    const logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.printf(info => `[${info.timestamp}] [${info.level}] ${info.message}`)
      ),
      transports: [
        // アクセスログの出力先設定
        new winstonDailyRotateFile({
          // level: 'debug', // debugを指定すると、debug以上のログが出力される
          datePattern: 'YYYY-MM-DD',
          filename: 'application-%DATE%.log',
          dirname: 'logs',
          maxSize: '20m', // ローテートするファイルの最大サイズ
          maxFiles: '30d', // 保存するログの最大日付
        }),
        new winstonDailyRotateFile({
          level: 'error',
          datePattern: 'YYYY-MM-DD',
          filename: 'error-%DATE%.log',
          dirname: 'logs',
          maxSize: '20m',
          maxFiles: '30d',
        }),
      ],
    });

    // 本番環境以外ではコンソールにも出力する
    if (process.env.NODE_ENV !== 'production') {
      logger.add(
        new winston.transports.Console({
          level: 'debug',
          format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        })
      );
    }

    this.logger = logger;
  }

  log(message: string) {
    this.logger.log({
      level: 'info',
      message: `${message}`,
    });
  }

  error(message: string, trace: string) {
    this.logger.log({
      level: 'error',
      message: `${message}:${trace}`,
    });
  }

  warn(message: string) {
    this.logger.log({
      level: 'warn',
      message: `${message}`,
    });
  }

  debug(message: string) {
    this.logger.log({
      level: 'debug',
      message: `${message}`,
    });
  }

  verbose(message: string) {
    this.logger.log({
      level: 'verbose',
      message: `${message}`,
    });
  }
}
