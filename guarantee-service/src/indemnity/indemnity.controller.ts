import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IndemnityService } from './indemnity.service';
import { IndemnityDto } from 'src/dto';

@Controller('indemnity')
export class IndemnityController {
  constructor(private indemnityService: IndemnityService) {}

  @MessagePattern({ cmd: 'create-new-indemnity' })
  async handleCreateIndemnity(dto: IndemnityDto) {
    return this.indemnityService.createNewIndemnity(dto);
  }

  @MessagePattern({ cmd: 'get-all-indemnities-client' })
  async handleGetAllIndemnitiesClient(email: string) {
    return this.indemnityService.getAllIndemnitiesClient(email);
  }

  @MessagePattern({ cmd: 'get-all-indemnities-banker' })
  async handleGetAllIndemnitiesBanker(company: string) {
    return this.indemnityService.getAllIndemnitiesBanker(company);
  }

  @MessagePattern({ cmd: 'get-indemnity-by-id' })
  async handleGetIndemnityById(payload: number) {
    const data = payload;
    return this.indemnityService.getIndemnityById(data);
  }

  @MessagePattern({ cmd: 'update-indemnity-by-id' })
  handleUpdateIndemnityById(payload: any) {
    const { id, data } = payload;
    return this.indemnityService.updateIndemnityById(id, data);
  }
}
