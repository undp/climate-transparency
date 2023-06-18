import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateIf } from "class-validator";
import { Instrument } from "../enum/instrument.enum";
import { InvestmentType } from "../enum/investment.type";
import { InvestmentLevel } from "../enum/investment.level";
import { InvestmentStream } from "../enum/investment.stream";
import { ESGType } from "../enum/esg.type";

export class InvestmentRequestDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  programmeId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  amount: number;

  @ApiPropertyOptional({ enum: Instrument })
  @IsEnum(Instrument, {
      message: 'Invalid instrument type. Supported following values:' + Object.values(Instrument)
  })
  @IsOptional()
  instrument: Instrument;

  @ApiPropertyOptional()
  @ValidateIf(o => o.instrument === Instrument.LOAN)
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  interestRate?: number;

  @ApiPropertyOptional()
  @ValidateIf(o => o.instrument === Instrument.RESULT_BASED)
  @IsString()
  @IsNotEmpty()
  resultMetric?: string;

  @ApiPropertyOptional()
  @ValidateIf(o => o.instrument === Instrument.RESULT_BASED)
  @IsNumber()
  @IsNotEmpty()
  paymentPerMetric?: number;

  @ApiPropertyOptional({ enum: InvestmentType })
  @IsEnum(InvestmentType, {
      message: 'Invalid type. Supported following values:' + Object.values(InvestmentType)
  })
  @IsOptional()
  type: InvestmentType;

  @ApiPropertyOptional({ enum: InvestmentLevel })
  @IsEnum(InvestmentLevel, {
      message: 'Invalid level. Supported following values:' + Object.values(InvestmentLevel)
  })
  @IsOptional()
  level: InvestmentLevel;

  @ApiPropertyOptional({ enum: InvestmentStream })
  @IsEnum(InvestmentStream, {
      message: 'Invalid stream. Supported following values:' + Object.values(InvestmentStream)
  })
  @IsOptional()
  stream: InvestmentStream;

  @ApiPropertyOptional({ enum: ESGType })
  @IsEnum(ESGType, {
      message: 'Invalid esg type. Supported following values:' + Object.values(ESGType)
  })
  @IsOptional()
  esgClassification: ESGType;

  @ApiPropertyOptional()
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  fromCompanyIds: number[];

  @ApiProperty()
  @IsArray()
  @IsNumber({},{each: true})
  @Min(0, { each: true })
  percentage: number[];

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  toCompanyId: number;

}