import { Injectable, OnApplicationShutdown } from "@nestjs/common";


import {db} from '../../../prisma/db.js'

@Injectable()
export class PrismaService implements OnApplicationShutdown {
    public readonly db = db;

    async onApplicationShutdown() {
        await this.db.close();
    }

}