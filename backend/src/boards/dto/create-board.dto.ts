import { IsNotEmpty, Length } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @Length(1, 30)
  readonly title: string;

  @IsNotEmpty()
  @Length(1, 3)
  readonly taskPrefix: string;
}
