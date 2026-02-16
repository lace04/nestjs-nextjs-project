import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger('PrismaService');

  constructor() {
    const databaseUrl = (process.env.DATABASE_URL ?? 'file:./dev.db').trim();

    if (!databaseUrl) {
      throw new Error(
        'DATABASE_URL no está definido. Asegúrate de tenerlo en tu archivo .env',
      );
    }

    const sqliteUrl = databaseUrl.startsWith('file:')
      ? databaseUrl.slice('file:'.length)
      : databaseUrl;

    const adapter = new PrismaBetterSqlite3({ url: sqliteUrl });

    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('✓ Database connected successfully');
    } catch (error) {
      this.logger.error('✗ Failed to connect to database:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('✓ Database disconnected');
  }
}