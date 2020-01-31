import { Controller, Get, Inject, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { ConsumerService } from '@consumer/domain/ConsumerService';
import { Consumer } from '@consumer/domain/Consumer';

import { CreateConsumerBody } from './requests/CreateConsumerBody';
import { ConsumerViewModel } from './responses/ConsumerViewModel';

@ApiTags('consumer')
@Controller('consumer')
export class ConsumerController {
    @Inject() private readonly consumerService: ConsumerService;

    @Post()
    public async create(@Body() body: CreateConsumerBody): Promise<void> {
        await this.consumerService.create(body);
    }

    @Get()
    @ApiResponse({ type: ConsumerViewModel, isArray: true })
    public async getList(): Promise<ConsumerViewModel[]> {
        const consumers = await this.consumerService.getList();

        return this.makeGetListResponse(consumers);
    }

    @Get(':consumerId')
    @ApiResponse({ type: ConsumerViewModel })
    public async get(@Param('consumerId') consumerId: string): Promise<ConsumerViewModel> {
        const consumer = await this.consumerService.get(consumerId);

        return this.makeGetResponse(consumer);
    }

    private makeGetListResponse(consumers: Consumer[]): ConsumerViewModel[] {
        return consumers.map(item => this.makeGetResponse(item));
    }

    private makeGetResponse({ creationTime, ...data }: Consumer): ConsumerViewModel {
        return {
            ...data,
            creationTime: creationTime.toISOString(),
        };
    }
}
