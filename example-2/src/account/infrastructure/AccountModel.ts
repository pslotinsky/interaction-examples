import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('account')
export class AccountModel {
    @PrimaryColumn({ name: 'account_id' })
    public accountId: string;

    @Column()
    public balance: number;
}
