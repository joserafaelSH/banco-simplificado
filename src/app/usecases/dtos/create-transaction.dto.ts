/* 
model Transaction {
  id         String            @id @default(uuid())
  senderId   String
  receiverId String
  value      Float
  status     TransactionStatus
  created_at DateTime          @default(now())
  updated_at DateTime          @updatedAt

  sender   User @relation("sender", fields: [senderId], references: [id])
  receiver User @relation("receiver", fields: [receiverId], references: [id])

  @@map("transactions")
}

*/

export class CreateTransactionDto {
  id?: string;
  senderId: string;
  receiverId: string;
  value: number;
}
