import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { ConfigService } from '@nestjs/config';
import * as request from 'supertest';

describe('AppModule (e2e)', () => {
    let app: INestApplication;
    let configService: ConfigService;
    let token: string;

    beforeAll(async () => {
        const appModule: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = appModule.createNestApplication();
        configService = appModule.get<ConfigService>(ConfigService);
        await app.init();
    });

    it('should be defined', () => {
        expect(app).toBeDefined();
    });

    it('GET /', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect({
                version: configService.get('version'),
                commitId: configService.get('commitId'),
                buildDate: configService.get('buildDate'),
                digestImage: configService.get('digestImage'),
            })
        ;
    });

    it('GET /stat', () => {
        return request(app.getHttpServer())
            .get('/stat')
            .expect(401)
        ;
    });
 
    it('POST /stat', () => {
        return request(app.getHttpServer())
            .post('/stat')
            .send({
                language: 'en',
                timezone: 'EST',
                version: 'test',
                digestImage: 'random: ' + Math.floor(Math.random() * 1000000),
            })
            .expect(201)
        ;
    });
    
    it('POST /auth/login', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ username: 'admin', password: 'pass4admin' })
            .expect(201)
            .expect(({ body }) => {
                if (!body.access_token) {
                    throw new Error('access token not set');
                }
                token = body.access_token;
            })
        ;
    }); 
    
    it('GET /stat (authenticated)', () => {
        return request(app.getHttpServer())
            .get('/stat')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        ;
    }); 
  
    afterAll(async () => {
        await app.close();
    });
});
