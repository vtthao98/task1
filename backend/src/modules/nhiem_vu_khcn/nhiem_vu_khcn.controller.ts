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
import { NhiemVuKHCNService } from './nhiem_vu_khcn.service';
import { CreateNhiemVuKHCNDto } from './dto/create-nhiem_vu_khcn.dto';
import { UpdateNhiemVuKHCNDto } from './dto/update-nhiem_vu_khcn.dto';
import { SearchDto } from '@/common/dto/search.dto';

@Controller('nhiem-vu-khcn')
export class NhiemVuKHCNController {
  constructor(private readonly nhiemVuKHCNService: NhiemVuKHCNService) {}

  @Post('create')
  async createDonVi(@Body() createTacGiaDto: CreateNhiemVuKHCNDto) {
    return await this.nhiemVuKHCNService.create(createTacGiaDto);
  }

  @Get('all')
  async getAllDonVi() {
    return await this.nhiemVuKHCNService.findAll();
  }

  @Get('one/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.nhiemVuKHCNService.findOne(id);
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNhiemVuDto: UpdateNhiemVuKHCNDto,
  ) {
    return this.nhiemVuKHCNService.update(updateNhiemVuDto, id);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.nhiemVuKHCNService.delete(id);
  }

  @Get('search')
  async search(@Query() query: SearchDto) {
    return this.nhiemVuKHCNService.search(query);
  }
}
