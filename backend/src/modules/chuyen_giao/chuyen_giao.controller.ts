import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ChuyenGiaoService } from './chuyen_giao.service';
import { CreateChuyenGiaoDto } from './dto/create-chuyen_giao.dto';
import { UpdateChuyenGiaoDto } from './dto/update-chuyen_giao.dto';
import { SearchDto } from '@/common/dto/search.dto';

@Controller('chuyen-giao')
export class ChuyenGiaoController {
  constructor(private readonly chuyenGiaoService: ChuyenGiaoService) {}

  @Post('create')
  async createDonVi(@Body() createChuyenGiaoDto: CreateChuyenGiaoDto) {
    return await this.chuyenGiaoService.create(createChuyenGiaoDto);
  }

  @Get('all')
  async getAllDonVi() {
    return await this.chuyenGiaoService.findAll();
  }

  @Get('one/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.chuyenGiaoService.findOne(id);
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNhiemVuDto: UpdateChuyenGiaoDto,
  ) {
    return this.chuyenGiaoService.update(updateNhiemVuDto, id);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.chuyenGiaoService.delete(id);
  }

  @Get('search')
  async search(@Query() query: SearchDto) {
    return this.chuyenGiaoService.search(query);
  }
}
