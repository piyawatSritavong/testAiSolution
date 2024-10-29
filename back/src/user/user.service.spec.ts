import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('ควรสร้างผู้ใช้ใหม่ได้', async () => {
    const user = await service.create('testuser');
    expect(user).toBeDefined(); // ตรวจสอบว่าผู้ใช้ถูกสร้างสำเร็จ
    expect(user.username).toBe('testuser'); // ตรวจสอบว่าค่า username ถูกต้อง
  });

  it('ควรคืนค่าผู้ใช้ที่ค้นหาได้', async () => {
    const user = await service.create('anotheruser');
    const foundUser = await service.findOne(user.id);
    expect(foundUser).toBeDefined(); // ตรวจสอบว่าค้นหาเจอ
    expect(foundUser.username).toBe('anotheruser'); // ตรวจสอบค่าที่ได้
  });
});
