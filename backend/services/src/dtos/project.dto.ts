import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsArray, ArrayMinSize, MaxLength, Min, Max} from 'class-validator';
import { ProjectStatus, ProjectType } from "../enums/project.enum";
import { IntImplementor, NatImplementor, Recipient } from "../enums/shared.enum";
import { DocumentDto } from "./document.dto";
import { KpiDto } from "./kpi.dto";

export class ProjectDto {

    programmeId: string;

    @IsNotEmpty()
    @IsEnum(ProjectType, {
        each: true,
        message: 'Invalid International Implementing Entity. Supported following entities:' + Object.values(ProjectType)
    })
    @ApiProperty({
      type: [String],
      enum: Object.values(ProjectType),
    })
    type: ProjectType;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    additionalProjectNumber: string;

    @IsNotEmpty()
    @IsEnum(ProjectStatus, {
        each: true,
        message: 'Invalid International Implementing Entity. Supported following entities:' + Object.values(ProjectStatus)
    })
    @ApiProperty({
      type: [String],
      enum: Object.values(ProjectStatus),
    })
    projectStatus: ProjectStatus;

    @IsNotEmpty()
    @IsNumber()
    @Min(2013)
    @Max(2050)
    @ApiProperty()
    startYear: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(2013)
    @Max(2050)
    @ApiProperty()
    endYear: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    expectedTimeFrame: number;

    @IsArray()
    @ArrayMinSize(1)
    @MaxLength(100, { each: true })
    @IsNotEmpty({ each: true })
    @IsEnum(Recipient, {
        each: true,
        message: 'Invalid Recipient Entity. Supported following entities:' + Object.values(Recipient)
    })
    @ApiProperty({
      type: [String],
      enum: Object.values(Recipient),
    })
    recipientEntities: Recipient[];

    @IsArray()
    @ArrayMinSize(1)
    @MaxLength(100, { each: true })
    @IsNotEmpty({ each: true })
    @IsEnum(IntImplementor, {
        each: true,
        message: 'Invalid International Implementing Entity. Supported following entities:' + Object.values(IntImplementor)
    })
    @ApiProperty({
      type: [String],
      enum: Object.values(IntImplementor),
    })
    internationalImplementingEntities: IntImplementor[];

    @IsOptional()
    @ApiProperty()
    documents: DocumentDto[];

		@IsNumber()
		@ApiProperty()
		achievedGHGReduction: number;
	
		@IsNumber()
		@ApiProperty()
		expectedGHGReduction: number;
  
    @IsOptional()
    @ApiProperty()
    @IsString()
    comments: string;

    @IsOptional()
    @ApiProperty()
    linkedActivities: string[];

		@IsOptional()
    @ApiProperty()
    kpis: KpiDto[];
		
}