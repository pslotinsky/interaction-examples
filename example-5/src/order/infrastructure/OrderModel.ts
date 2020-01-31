import { Entity, Column, PrimaryColumn } from 'typeorm';
import { OrderStatus } from '@order/domain/Order';

@Entity('order')
export class OrderModel {
    @PrimaryColumn({ name: 'order_id' })
    public orderId: string;

    @Column({ name: 'consumer_id' })
    public consumerId: string;

    @Column()
    public price: number;

    @Column()
    public status: OrderStatus;

    @Column({ name: 'creation_time' })
    public creationTime: Date;
}
