import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from './user/user.module';
import { VendorModule } from './vendor/vendor.module';
import { StaffModule } from './staff/staff.module';
import { ServiceModule } from './service/service.module';
import { BookingModule } from './booking/booking.module';
import { ReviewModule } from './review/review.module';
// import { PaymentModule } from './payment/payment.module';
import { MessageModule } from './message/message.module';
import { ConversationModule } from './conversation/conversation.module';
import { AvailabilityModule } from './availability/availability.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    VendorModule,
    StaffModule,
    ServiceModule,
    BookingModule,
    ReviewModule,
    MessageModule,
    ConversationModule,
    AvailabilityModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
