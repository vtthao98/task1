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
import { NghiemThuService } from './nghiem_thu.service';
import { CreateNghiemThuDto } from './dto/create-nghiem_thu.dto';
import { UpdateNghiemThuDto } from './dto/update-nghiem_thu.dto';
import { SearchDto } from '@/common/dto/search.dto';

@Controller('nghiem-thu')
export class NghiemThuController {
  constructor(private readonly nghiemThuService: NghiemThuService) {}

  @Post('create')
  async createDonVi(@Body() createNghiemThuDto: CreateNghiemThuDto) {
    return await this.nghiemThuService.create(createNghiemThuDto);
  }

  @Get('all')
  async getAllDonVi() {
    return await this.nghiemThuService.findAll();
  }

  @Get('one/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.nghiemThuService.findOne(id);
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNhiemVuDto: UpdateNghiemThuDto,
  ) {
    return this.nghiemThuService.update(updateNhiemVuDto, id);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.nghiemThuService.delete(id);
  }

  @Get('search')
  async search(@Query() query: SearchDto) {
    return this.nghiemThuService.search(query);
  }
}
