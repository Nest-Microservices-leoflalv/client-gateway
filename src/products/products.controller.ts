import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { NATS_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.client.send('create_product', createProductDto);
  }

  @Get()
  findAllProducts(@Query() pagination: PaginationDto) {
    return this.client.send('find_all_products', pagination);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.client.send('find_one_product', { id });
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.client.send('remove_product', { id });
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.client.send('update_product', { id, ...updateProductDto });
  }
}
