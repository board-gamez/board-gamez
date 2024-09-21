import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schema/order.schema';
import { Model } from 'mongoose';
import { AddOrderInput, AddOrderOutput } from './dto/add-order.dto';
import { OrderStatus } from './schema/order-status.enum';
import { Product, ProductDocument } from 'src/product/schema/product.schema';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { User } from 'src/user/schema/user.schema';
import { ConfirmOrderInput } from './dto/callback-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async addOrder(
    currentUser: User,
    input: AddOrderInput,
  ): Promise<AddOrderOutput> {
    const products = await this.productModel.find({
      quantity: { $gt: 0 },
      $or: input.items.map((item) => ({
        _id: item._product,
        quantity: { $gte: item.quantity },
      })),
    });

    if (products.length !== input.items.length) {
      throw new NotFoundException('product not found');
    }

    let price = 0;
    for (const product of products) {
      const productItem = input.items.find(
        (item) => item._product.toString() === product._id.toString(),
      );

      price += product.price * productItem.quantity;
      product.quantity -= productItem.quantity;
      await product.save();
    }

    const shippingCost = 49000; // Toman
    const totalPrice = shippingCost + price; // Toman

    const order = await this.orderModel.create({
      ...input,
      _createdBy: currentUser._id,
      status: OrderStatus.AwaitingPayment,
      totalPrice: shippingCost + price,
    });

    const resp = await this.httpService.axiosRef.post(
      'https://gateway.zibal.ir/v1/request',
      {
        merchant: this.configService.get<string>('ZIBAL_MERCHANT_ID'),
        callbackUrl: this.configService.get<string>('ZIBAL_CALLBACK'),
        amount: totalPrice * 10,
        orderId: order._id.toString(),
      },
    );

    if (resp.data.result !== 100)
      throw new BadRequestException(resp.data.message);

    return {
      message: 'order added successfully',
      paymentUrl: `https://gateway.zibal.ir/start/${resp.data.trackId}`,
      order,
    };
  }

  async confirmOrder(input: ConfirmOrderInput) {
    const order = await this.orderModel.findOne({
      _id: input.orderId,
      status: OrderStatus.AwaitingPayment,
    });

    if (!order) throw new NotFoundException();

    const resp = await this.httpService.axiosRef.post(
      'https://gateway.zibal.ir/v1/verify',
      {
        merchant: this.configService.get<string>('ZIBAL_MERCHANT_ID'),
        trackId: input.trackId,
      },
    );

    let orderStatus: OrderStatus;
    if (resp.data.result === 100) {
      orderStatus = OrderStatus.Paid;
    } else {
      orderStatus = OrderStatus.Failed;

      for (const item of order.items) {
        const product = await this.productModel.findById(item._product);
        product.quantity += item.quantity;
        await product.save();
      }
    }

    order.status = orderStatus;
    await order.save();

    const url =
      this.configService.get<string>('PAYMENT_REDIRECT_URL') +
      `?orderId=${order._id.toString()}` +
      `&status=${orderStatus}`;

    return { url };
  }
}
