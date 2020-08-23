import { Inject, Injectable, Logger, RequestTimeoutException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { catchError, timeout } from 'rxjs/operators';
import { throwError, TimeoutError } from 'rxjs';
import {compareSync} from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_CLIENT')
    private readonly client: ClientProxy,
    private readonly jwtService: JwtService,
  ) {
  }

  async validation(username: string, password: string): Promise<any> {
    try {
      const user = await this.client.send({ role: 'user', cmd: 'get' }, { username })
        .pipe(
          timeout(5000),
          catchError(err => {
            if (err instanceof TimeoutError) {
              return throwError(new RequestTimeoutException());
            }
            return throwError(err);
          }))
        .toPromise();

      if(compareSync(password, user?.password)){
        return user
      }

      return null
    } catch (e) {
      Logger.log(e);
      throw e;
    }
  }

  async login(user){
    const payload = {user, sub: user.id}

    return {
      userId: user.id,
      accessToken: this.jwtService.sign(payload)
    }
  }
}
