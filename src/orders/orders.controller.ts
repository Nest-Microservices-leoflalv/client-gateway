import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly orderService: ClientProxy,
  ) {}

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.orderService.send(
      { cmd: 'find_all_orders' },
      orderPaginationDto,
    );
  }

  @Get(':status')
  findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.orderService.send(
      { cmd: 'find_all_orders' },
      { ...paginationDto, status: statusDto.status },
    );
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderService.send({ cmd: 'find_one_order' }, { id });
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.send({ cmd: 'create_order' }, createOrderDto);
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    return this.orderService.send(
      { cmd: 'change_order_status' },
      { id, status: statusDto.status },
    );
  }
}
