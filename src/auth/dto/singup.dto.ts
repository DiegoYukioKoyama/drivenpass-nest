import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class SignUpDto {
  @IsNotEmpty({ message: 'All fields are required!' })
  @IsString()
  email:string;

  @IsStrongPassword()
  @IsNotEmpty({ message: 'All fields are required!' })
  @IsString()
  password:string;

}