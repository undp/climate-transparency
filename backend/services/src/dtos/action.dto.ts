import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, IsOptional, ValidateNested, IsNumber, Min, Max } from "class-validator";
import { ActionStatus, InstrumentType, NatAnchor } from "../enums/action.enum";
import { KpiDto } from "./kpi.dto";
import { DocumentDto } from "./document.dto";

export class ActionDto {

    actionId: string; 

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    description: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    objective: string;

    @IsNotEmpty()
    @ApiProperty({ enum: InstrumentType })
    @IsEnum(InstrumentType, {
      message: "Invalid instrument type. Supported following instrument types:" + Object.values(InstrumentType),
    })
    instrumentType: InstrumentType;

    @IsNotEmpty()
    @ApiProperty({ enum: ActionStatus })
    @IsEnum(ActionStatus, {
      message: "Invalid status. Supported following statuses:" + Object.values(ActionStatus),
    })
    status: ActionStatus;

    @IsNotEmpty()
    @IsNumber()
    @Min(2013)
    @Max(2050)
    @ApiProperty()
    startYear: number;

    @IsNotEmpty()
    @ApiProperty({ enum: NatAnchor })
    @IsEnum(NatAnchor, {
      message: "Invalid Anchored National Strategy. Supported following strategies:" + Object.values(NatAnchor),
    })
    natAnchor: NatAnchor;

    @IsOptional()
    @ApiProperty()
    documents: DocumentDto[];

    @IsOptional()
    @ApiProperty()
    linkedProgrammes: string[];

    @IsOptional()
    @ValidateNested()
    @ApiProperty()
    kpis: KpiDto[];

  
}