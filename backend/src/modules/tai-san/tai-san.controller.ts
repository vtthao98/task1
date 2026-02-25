import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { TaiSanService } from './tai-san.service';
import { CreateTaiSanDto } from './dto/create-tai-san.dto';
import { UpdateTaiSanDto } from './dto/update-tai-san.dto';
import { SearchDto } from '@/common/dto/search.dto';

@Controller('tai-san')
export class TaiSanController {
  constructor(private readonly service: TaiSanService) {}

  @Get('all')
  async getAllDonVi() {
    return await this.service.findAll();
  }

  @Get('one/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOne(id);
  }

  @Post('create')
  async createDonVi(@Body() createTacGiaDto: CreateTaiSanDto) {
    return await this.service.create(createTacGiaDto);
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateTaiSanDto,
  ) {
    return this.service.update(updateDto, id);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }

  @Get('search')
  async search(@Query() query: SearchDto) {
    return this.service.search(query);
  }
}
