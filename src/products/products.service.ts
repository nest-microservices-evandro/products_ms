import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return this.prismaService.product.create({ data: createProductDto });
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    const total = await this.prismaService.product.count({
      where: { available: true },
    });
    const totalPages = Math.ceil(total / limit);

    return {
      data: await this.prismaService.product.findMany({
        where: { available: true },
        orderBy: { id: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      meta: {
        total: total,
        currentPage: page,
        totalPages: totalPages,
      },
    };
  }

  async findOne(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: { id, available: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(updateProductDto: UpdateProductDto) {
    const { id, ...data } = updateProductDto;

    await this.findOne(id);

    return this.prismaService.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    const product = await this.prismaService.product.update({
      where: { id },
      data: {
        available: false,
      },
    });

    return product;
  }
}
