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
import { NhiemVuBVMTService } from './nhiem_vu_bvmt.service';
import { CreateNhiemVuBVMTDto } from './dto/create-nhiem_vu_bvmt.dto';
import { UpdateNhiemVuBVMTDto } from './dto/update-nhiem_vu_bvmt.dto';
import { SearchDto } from '@/common/dto/search.dto';

@Controller('nhiem-vu-bvmt')
export class NhiemVuBVMTController {
  constructor(private readonly nhiemVuBVMTService: NhiemVuBVMTService) {}

  @Post('create')
  async createDonVi(@Body() createTacGiaDto: CreateNhiemVuBVMTDto) {
    return await this.nhiemVuBVMTService.create(createTacGiaDto);
  }

  @Get('all')
  async getAllDonVi() {
    return await this.nhiemVuBVMTService.findAll();
  }

  @Get('one/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.nhiemVuBVMTService.findOne(id);
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNhiemVuDto: UpdateNhiemVuBVMTDto,
  ) {
    return this.nhiemVuBVMTService.update(updateNhiemVuDto, id);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.nhiemVuBVMTService.delete(id);
  }

  @Get('search')
  async search(@Query() query: SearchDto) {
    return this.nhiemVuBVMTService.search(query);
  }
}
