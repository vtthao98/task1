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
import { TacGiaService } from './tac_gia.service';
import { CreateTacGiaDto } from './dto/create-tac-gia.dto';
import { UpdateTacGiaDto } from './dto/update-tac_gia.dto';
import { SearchDto } from '@/common/dto/search.dto';

@Controller('tac-gia')
export class TacGiaController {
  constructor(private readonly tacGiaService: TacGiaService) {}

  @Post('create')
  async create(@Body() createTacGiaDto: CreateTacGiaDto) {
    return await this.tacGiaService.create(createTacGiaDto);
  }

  @Get('all')
  async getAll() {
    return await this.tacGiaService.findAll();
  }

  @Get('one/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.tacGiaService.findOne(id);
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTacGiaDto: UpdateTacGiaDto,
  ) {
    return this.tacGiaService.update(updateTacGiaDto, id);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.tacGiaService.delete(id);
  }

  @Get('search')
  async search(@Query() query: SearchDto) {
    return this.tacGiaService.search(query);
  }
}
