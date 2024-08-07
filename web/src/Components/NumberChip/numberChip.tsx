import './numberChip.scss';
import { Tag } from 'antd';
import { EmissionUnits } from '../../Enums/emission.enum';
import { convertToMillions } from '../../Utils/utilServices';

interface Props {
  value: number;
  valueType?: EmissionUnits;
}

const NumberChip: React.FC<Props> = ({ value, valueType }) => {
  return (
    <div className="number-chip">
      {valueType ? (
        <Tag className={`${valueType}_color`}>{convertToMillions(value)}</Tag>
      ) : (
        <Tag className="default_color">{convertToMillions(value)}</Tag>
      )}
    </div>
  );
};

export default NumberChip;
