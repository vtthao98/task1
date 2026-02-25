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
import { BaiBaoService } from './bai_bao.service';
import { CreateBaiBaoDto } from './dto/create-bai_bao.dto';
import { UpdateBaiBaoDto } from './dto/update-bai_bao.dto';
import { SearchDto } from '@/common/dto/search.dto';

@Controller('bai-bao')
export class BaiBaoController {
  constructor(private readonly BaiBaoService: BaiBaoService) {}

  @Post('create')
  async createDonVi(@Body() createTacGiaDto: CreateBaiBaoDto) {
    return await this.BaiBaoService.create(createTacGiaDto);
  }

  @Get('all')
  async getAllDonVi() {
    return await this.BaiBaoService.findAll();
  }

  @Get('one/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.BaiBaoService.findOne(id);
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNhiemVuDto: UpdateBaiBaoDto,
  ) {
    console.log('abc1');
    return this.BaiBaoService.update(updateNhiemVuDto, id);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.BaiBaoService.delete(id);
  }

  @Get('search')
  async search(@Query() query: SearchDto) {
    return this.BaiBaoService.search(query);
  }
}
