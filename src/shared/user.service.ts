import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository, FindOneOptions } from 'typeorm';
import { LoginDTO, RegisterDTO, UpdateUserDTO } from '../auth/auth.dto';
import { Payload } from '../types/payload';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userDTO: RegisterDTO) {
    const { username } = userDTO;
    const user = await this.userRepository.findOne({ username });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = this.userRepository.create(userDTO);
    await this.userRepository.save(createdUser);
    return this.sanitizeUser(createdUser);
  }

  async findAll() {
    const users = await this.userRepository.find({
      select: ['id', 'username', 'seller', 'admin', 'created']
    });
    return users;
  }

  async findByLogin(userDTO: LoginDTO) {
    const { username, password } = userDTO;
    const user = await this.userRepository.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'seller', 'created', 'admin']
    });
    
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async findByPayload(payload: Payload) {
    const { username } = payload;
    return await this.userRepository.findOne({ username });
  }

  sanitizeUser(user: User) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async delete(id: string) {
    const userId = parseInt(id);
    const user = await this.userRepository.findOne({ id: userId });
    
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.delete(userId);
    return { message: 'User deleted successfully' };
  }

  async update(id: number, updateUserDTO: UpdateUserDTO) {
    const user = await this.userRepository.findOne({ id });
    
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (updateUserDTO.password) {
      updateUserDTO.password = await bcrypt.hash(updateUserDTO.password, 12);
    }

    await this.userRepository.update(id, updateUserDTO);
    
    const updatedUser = await this.userRepository.findOne({ id });
    return this.sanitizeUser(updatedUser);
  }
}






