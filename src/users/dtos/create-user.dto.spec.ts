// src/users/dto/create-user.dto.spec.ts
import { CreateUserDto } from './create-user.dto';

describe('CreateUserDto', () => {
  it('should create an instance of CreateUserDto', () => {
    const dto = new CreateUserDto();
    dto.username = 'testuser';
    dto.email = 'testuser@example.com';
    dto.password = 'securepassword';

    expect(dto.username).toEqual('testuser');
    expect(dto.email).toEqual('testuser@example.com');
    expect(dto.password).toEqual('securepassword');
  });

  it('should allow all properties to be set', () => {
    const dto = new CreateUserDto();
    dto.username = 'newuser';
    dto.email = 'newuser@example.com';
    dto.password = 'newpassword';

    expect(dto.username).toEqual('newuser');
    expect(dto.email).toEqual('newuser@example.com');
    expect(dto.password).toEqual('newpassword');
  });
});
