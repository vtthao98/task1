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
import { DonViService } from './don_vi.service';
import { CreateDonViDto } from './dto/create-don_vi.dto';
import { UpdateDonViDto } from './dto/update-don_vi.dto';
import { SearchDto } from '@/common/dto/search.dto';

@Controller('don-vi')
export class DonViController {
  constructor(private readonly donViService: DonViService) {}

  @Post('create')
  async createDonVi(@Body() createDonViDto: CreateDonViDto) {
    return await this.donViService.create(createDonViDto);
  }

  @Get('all')
  async getAllDonVi() {
    return await this.donViService.findAll();
  }

  @Get('one/:id')
  async getDonViById(@Param('id', ParseIntPipe) id: number) {
    return await this.donViService.findOne(id);
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDonViDto: UpdateDonViDto,
  ) {
    return this.donViService.update(updateDonViDto, id);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.donViService.delete(id);
  }

  @Get('search')
  async search(@Query() query: SearchDto) {
    return this.donViService.search(query);
  }
}
