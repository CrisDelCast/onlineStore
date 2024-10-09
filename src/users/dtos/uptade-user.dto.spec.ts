// src/users/dto/update-user.dto.spec.ts
import { UpdateUserDto } from './update-user.dto';

describe('UpdateUserDto', () => {
  it('should create an instance of UpdateUserDto with no properties', () => {
    const dto = new UpdateUserDto();

    expect(dto.username).toBeUndefined();
    expect(dto.email).toBeUndefined();
    expect(dto.password).toBeUndefined();
  });

  it('should create an instance of UpdateUserDto with some properties', () => {
    const dto = new UpdateUserDto();
    dto.username = 'updatedUser';
    dto.email = 'updatedUser@example.com';

    expect(dto.username).toEqual('updatedUser');
    expect(dto.email).toEqual('updatedUser@example.com');
    expect(dto.password).toBeUndefined();  // password no se estableció
  });

  it('should allow all properties to be set', () => {
    const dto = new UpdateUserDto();
    dto.username = 'newUser';
    dto.email = 'newUser@example.com';
    dto.password = 'newSecurePassword';

    expect(dto.username).toEqual('newUser');
    expect(dto.email).toEqual('newUser@example.com');
    expect(dto.password).toEqual('newSecurePassword');
  });
});
