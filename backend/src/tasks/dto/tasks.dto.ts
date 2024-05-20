import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 36)
  title: string;
  description: string;

  @IsNotEmpty()
  @IsString()
  boardId: string;

  @IsString()
  label: string;

  @IsString()
  status: string;

  @IsString()
  priority: string;
}
