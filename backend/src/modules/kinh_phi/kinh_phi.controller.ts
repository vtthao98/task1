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
import { KinhPhiService } from './kinh_phi.service';
import { CreateKinhPhiDto } from './dto/create-kinh_phi.dto';
import { UpdateKinhPhiDto } from './dto/update-kinh_phi.dto';
import { SearchDto } from '@/common/dto/search.dto';

@Controller('kinh-phi')
export class KinhPhiController {
  constructor(private readonly kinhPhiService: KinhPhiService) {}

  @Post('create')
  async createDonVi(@Body() createKinhPhiDto: CreateKinhPhiDto) {
    return await this.kinhPhiService.create(createKinhPhiDto);
  }

  @Get('all')
  async getAllDonVi() {
    return await this.kinhPhiService.findAll();
  }

  @Get('one/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.kinhPhiService.findOne(id);
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNhiemVuDto: UpdateKinhPhiDto,
  ) {
    return this.kinhPhiService.update(updateNhiemVuDto, id);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.kinhPhiService.delete(id);
  }

  @Get('search')
  async search(@Query() query: SearchDto) {
    return this.kinhPhiService.search(query);
  }
}
