import { ApiProperty, ApiPropertyOptional, getSchemaPath } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsArray, ArrayMinSize, MaxLength, Min, Max, ValidateIf } from 'class-validator';
import { ProjectStatus } from "../enums/project.enum";
import { IntImplementor, Recipient } from "../enums/shared.enum";
import { DocumentDto } from "./document.dto";
import { KpiDto } from "./kpi.dto";
import { KpiUnits } from "../enums/kpi.enum";

export class ProjectDto {

	@IsString()
	@IsOptional()
	@ApiProperty()
	programmeId: string;

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
	@ApiPropertyOptional()
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
	@Max(2049)
	@ApiProperty()
	startYear: number;

	@IsNotEmpty()
	@IsNumber()
	@Min(2013)
	@Max(2050)
	@ApiProperty()
	endYear: number;

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

	@ValidateIf((c) => c.internationalImplementingEntities)
	@IsArray()
	@ArrayMinSize(1)
	@MaxLength(100, { each: true })
	@IsNotEmpty({ each: true })
	@IsEnum(IntImplementor, {
		each: true,
		message: 'Invalid International Implementing Entity. Supported following entities:' + Object.values(IntImplementor)
	})
	@ApiPropertyOptional({
		type: [String],
		enum: Object.values(IntImplementor),
	})
	internationalImplementingEntities: IntImplementor[];

	@IsOptional()
	@ApiPropertyOptional(
		{
			type: "array",
			example: [{
				title: "document 1",
				data: "base64 document string"
			}],
			items: {
				$ref: getSchemaPath(DocumentDto),
			},
		}
	)
	documents: DocumentDto[];

	@IsOptional()
	@ApiPropertyOptional()
	@IsString()
	comment: string;

	@IsOptional()
	@ApiPropertyOptional()
	linkedActivities: string[];

	@IsOptional()
	@ApiPropertyOptional(
		{
			type: "array",
			example: [{
				name: "KPI 1",
				kpiUnit: KpiUnits.GWp_INSTALLED,
				creatorType: "project",
				expected: 100
			}],
			items: {
				$ref: getSchemaPath(KpiDto),
			},
		}
	)
	kpis: KpiDto[];

}