import {
  Entity,
  JoinColumn,
  ManyToOne,
  Column,
  PrimaryColumn,
} from "typeorm";
import { KpiEntity } from "./kpi.entity";
import { ActivityEntity } from "./activity.entity";

@Entity("achievement")
export class AchievementEntity {
  @PrimaryColumn()
  activityId: string;

  @PrimaryColumn()
  kpiId: number;

  @ManyToOne(() => KpiEntity, (kpi) => kpi.achievements, {
    nullable: false,
		onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: "kpiId", referencedColumnName: "kpiId" }])
  kpi: KpiEntity;

  @ManyToOne(() => ActivityEntity, (activity) => activity.achievements, {
    nullable: false,
		onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: "activityId", referencedColumnName: "activityId" }])
  activity: ActivityEntity;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  achieved: number;

}
