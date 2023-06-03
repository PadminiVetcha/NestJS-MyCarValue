import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { User } from '../users/user.entity';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { ReportsService } from './reports.service';
import { ReportDto } from './dtos/report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from '../users/decorators/current-user.decorator';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approved);
  }

  @Get()
  /*
  Query decorator by default considers all the values of Dto's to be strings.
  If they are numbers, then we need to manually parse them to integerts in dto class using 
  transform decorator
  */
  getEstimate(@Query() query: GetEstimateDto) {
    //console.log(query);
    return this.reportsService.createEstimate(query);
  }
}
