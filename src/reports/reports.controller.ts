import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { ReportsService } from './reports.service';
import { ReportDto } from './dtos/report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }
}
