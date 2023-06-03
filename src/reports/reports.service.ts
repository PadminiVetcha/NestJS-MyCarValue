import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Report } from './report.entity';
import { User } from '../users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { CreateReportDto } from './dtos/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user; // associating user instance with report that has been created.
    return this.repo.save(report);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne({ where: { id: parseInt(id) } });
    if (!report) {
      throw new NotFoundException('Report Not Found..!!');
    }
    report.approved = approved;
    return this.repo.save(report);
  }

  createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make: make })
      .andWhere('model = :model', { model: model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng: lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat: lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year: year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC') // oderby doesn't take parameter obj as 2nd argument
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }
}
