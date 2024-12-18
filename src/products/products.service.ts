import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ErrorOrderDto } from './dto/error-order.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  private microServiceError(errorOrderDto: ErrorOrderDto) {
    throw new RpcException({
      statusCode: errorOrderDto.statusCode,
      message: errorOrderDto.message,
      error: errorOrderDto.error,
    });
  }

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
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          perPage: limit,
          totalItems: total,
        },
      },
    };
  }

  async findOne(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: { id, available: true },
    });

    if (!product) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Product not found',
        error: 'Not Found',
      });
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

  async validateProducts(ids: number[]) {
    ids = Array.from(new Set(ids));

    const products = await this.prismaService.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    if (products.length !== ids.length) {
      this.microServiceError({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Some product do not exist',
        error: 'Bad Request',
      });
    }

    return products;
  }
}
