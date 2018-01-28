import { IBaseDto } from './iBaseDto';

export class ErrorDto implements IBaseDto {
    public error: string;
    public message: string;
}
