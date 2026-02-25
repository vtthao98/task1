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
import { SachService } from './sach.service';
import { CreateSachDto } from './dto/create-sach.dto';
import { UpdateSachDto } from './dto/update-sach.dto';
import { SearchDto } from '@/common/dto/search.dto';

@Controller('sach')
export class SachController {
  constructor(private readonly sachService: SachService) {}

  @Post('create')
  async createDonVi(@Body() createSachDto: CreateSachDto) {
    return await this.sachService.create(createSachDto);
  }

  @Get('all')
  async getAllDonVi() {
    return await this.sachService.findAll();
  }

  @Get('one/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.sachService.findOne(id);
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNhiemVuDto: UpdateSachDto,
  ) {
    return this.sachService.update(updateNhiemVuDto, id);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.sachService.delete(id);
  }

  @Get('search')
  async search(@Query() query: SearchDto) {
    return this.sachService.search(query);
  }
}
