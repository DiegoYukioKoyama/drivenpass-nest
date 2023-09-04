import { IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
  @IsNotEmpty({ message: 'All fields are required!' })
  @IsString()
  email:string;

  @IsNotEmpty({ message: 'All fields are required!' })
  @IsString()
  password:string;

}