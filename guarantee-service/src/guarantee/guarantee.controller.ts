import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GuaranteeService } from './guarantee.service';
import { GuaranteeDto } from 'src/dto';

@Controller('guarantee')
export class GuaranteeController {
  constructor(private guaranteeService: GuaranteeService) {}
  @MessagePattern({ cmd: 'create-new' })
  async handleCreate(data: GuaranteeDto) {
    return this.guaranteeService.handleCreate(data);
  }

  @MessagePattern({ cmd: 'get-all-guarantees-banker' })
  async handleGetAllGuaranteesBanker(company: string) {
    return this.guaranteeService.getAllGuaranteesBanker(company);
  }

  @MessagePattern({ cmd: 'get-all-guarantees-client' })
  async handleGetAllGuaranteesClient(email: string) {
    return this.guaranteeService.getAllGuaranteesClient(email);
  }

  @MessagePattern({ cmd: 'get-guarantee-by-id' })
  async handleGetGuaranteeById(payload: number) {
    const data = payload;
    return this.guaranteeService.getGuaranteeById(data);
  }

  @MessagePattern({ cmd: 'update-guarantee-by-id' })
  handleUpdateGuaranteeById(payload: any) {
    const { id, data } = payload;
    return this.guaranteeService.updateGuaranteeById(id, data);
  }
}
