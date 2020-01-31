import { Entity, Column, PrimaryColumn } from 'typeorm';

import { ConsumerStatus } from '@consumer/domain/Consumer';

@Entity('consumer')
export class ConsumerModel {
    @PrimaryColumn({ name: 'consumer_id' })
    public consumerId: string;

    @Column()
    public name: string;

    @Column()
    public status: ConsumerStatus;

    @Column({ name: 'creation_time' })
    public creationTime: Date;
}
