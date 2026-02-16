import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return await this.prismaService.product.create({
      data: createProductDto,
    });
  }

  findAll(skip: number = 0, take: number = 10) {
    return this.prismaService.product.findMany({
      skip,
      take,
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const productFound = await this.prismaService.product.findUnique({
      where: { id },
    });

    if (!productFound) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return productFound;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const productFound = await this.findOne(id);

    if (!productFound) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return this.prismaService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.product.delete({
      where: { id },
    });
  }
}
