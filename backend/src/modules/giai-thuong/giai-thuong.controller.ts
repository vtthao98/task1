import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { GiaiThuongService } from './giai-thuong.service';
import { CreateGiaiThuongDto } from './dto/create-giai-thuong.dto';
import { UpdateGiaiThuongDto } from './dto/update-giai-thuong.dto';
import { SearchDto } from '@/common/dto/search.dto';

@Controller('giai-thuong')
export class GiaiThuongController {
  constructor(private readonly service: GiaiThuongService) {}

  @Get('all')
  findAll() {
    return this.service.findAll();
  }

  @Get('one/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOne(id);
  }

  @Post('create')
  create(@Body() body: CreateGiaiThuongDto) {
    return this.service.create(body);
  }

  @Patch('update/:id')
  update(@Param('id') id: number, @Body() body: UpdateGiaiThuongDto) {
    return this.service.update(id, body);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }

  @Get('search')
  async search(@Query() query: SearchDto) {
    return this.service.search(query);
  }
}
