import { Inject, Injectable } from '@nestjs/common';
import {
  UserCreateReqDto,
  UserLoginReqDto,
  UserHeaderReqDto,
  UserPasswordReqDto,
} from '../dto';
import { UserRepository } from '../repository/users.repository';
import { TokenService } from '../../utils/token/services';
import { HashService } from '../../utils/hash/hash.service';
import { UserType } from '../../utils/token/types/user.enum';
import {
  NotFoundException,
  authFailedException,
  emailExistsException,
  passwordMismatchException,
} from '../errors';
import { LoggerService } from '../../utils/logger/WinstonLogger';
import { EmailService } from '../../utils/email/email.service';
import { UserEntity } from '../entities';

export interface IUserService {
  createUser(body: UserCreateReqDto): Promise<any>;
  loginUser(body: UserLoginReqDto): Promise<any>;
  profile(body: UserHeaderReqDto): Promise<any>;
  changePassword(
    header: UserHeaderReqDto,
    data: UserPasswordReqDto,
  ): Promise<any>;
}

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,

    private readonly logger: LoggerService,

    private readonly hashService: HashService,

    private readonly tokenService: TokenService,

    private readonly emailService: EmailService,
  ) {}
  static logInfo = 'Service - User:';

  async createUser(data: UserCreateReqDto) {
    this.logger.info(
      `${UserService.logInfo} Create User with email: ${data.email}`,
    );
    data.password = await this.hashService.hash(data.password);
    try {
      const user = await this.userRepository.save(data);
      const token = {
        id: user.id,
        email: user.email,
        userType: UserType.USER,
      };
      this.logger.info(
        `${UserService.logInfo} Created User with email: ${data.email}`,
      );
      this.emailService.sendEmail(user.email, 'Welcome', 'Welcome');
      return {
        user: { ...user },
        token: `Bearer ${await this.tokenService.token(token)}`,
      };
    } catch (error) {
      if (error.code === '23505') {
        this.logger.warn(
          `${UserService.logInfo} Already Exists! User with email: ${data.email}`,
        );
        throw new emailExistsException();
      }
    }
  }

  async loginUser(data: UserLoginReqDto) {
    this.logger.info(
      `${UserService.logInfo} Login User with email: ${data.email}`,
    );
    try {
      const user = await this.userRepository.getByEmail(data.email);
      const isEqual = await this.hashService.compare(
        data.password,
        user.password,
      );
      if (!isEqual) {
        throw new authFailedException();
      }
      const token = {
        id: user.id,
        email: user.email,
        userType: UserType.USER,
      };
      this.logger.info(
        `${UserService.logInfo} LoggedIn User with email: ${data.email}`,
      );
      return {
        user: { ...user },
        token: `Bearer ${await this.tokenService.token(token)}`,
      };
    } catch (error) {
      this.logger.warn(
        `${UserService.logInfo} Incorrect Email or Password for Email: ${data.email}`,
      );
      throw new authFailedException();
    }
  }

  async profile(data: UserHeaderReqDto) {
    this.logger.info(
      `${UserService.logInfo} Find User Profile with id: ${data.id}`,
    );
    try {
      const user = await this.userRepository.getById(data.id);
      this.logger.info(
        `${UserService.logInfo} Found User Profile with id: ${data.id}`,
      );
      return user;
    } catch (error) {
      this.logger.warn(
        `${UserService.logInfo} Not Found! User with id: ${data.id}`,
      );
      throw new NotFoundException();
    }
  }

  async changePassword(header: UserHeaderReqDto, data: UserPasswordReqDto) {
    this.logger.info(
      `${UserService.logInfo} Initiated Change Password request for id: ${header.id}`,
    );
    let user: UserEntity;
    try {
      user = await this.userRepository.getById(header.id);
    } catch (error) {
      this.logger.warn(
        `${UserService.logInfo} Not Found! User with id: ${header.id}`,
      );
      throw new NotFoundException();
    }
    const [isEqual, hash] = await Promise.all([
      this.hashService.compare(data.oldPassword, user.password),
      this.hashService.hash(data.newPassword),
    ]);
    if (!isEqual) {
      this.logger.warn(
        `${UserService.logInfo} change password request faild due to incorrect password for id: ${header.id}`,
      );
      throw new passwordMismatchException();
    }
    user.password = hash;
    this.logger.info(
      `${UserService.logInfo} change password request succeded for id: ${header.id}`,
    );
    return await this.userRepository.updateUser(user);
  }
}
