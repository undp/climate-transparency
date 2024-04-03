import { DeleteOutlined } from '@ant-design/icons';
import { Form, Input, Row, Col, Card } from 'antd';

interface Props {
  form: any;
  rules: any;
  index: number;
  isEditable: boolean;
  gutterSize: number;
  inputFontSize: string;
  headerNames: string[];
  updateKPI: (id: number, property: any, value: string) => void;
  removeKPI: (kpiId: number) => void;
}

export const KpiGrid: React.FC<Props> = ({
  rules,
  index,
  isEditable,
  gutterSize,
  inputFontSize,
  headerNames,
  updateKPI,
  removeKPI,
}) => {
  return (
    <Row key={index} gutter={gutterSize} style={{ height: '90px' }}>
      <Col span={12}>
        <Row gutter={gutterSize}>
          <Col span={12}>
            <Form.Item
              label={<label style={{ color: '#3A3541', opacity: 0.8 }}>{headerNames[0]}</label>}
              name={`kpi_name_${index}`}
              rules={rules}
            >
              <Input
                style={{ fontSize: inputFontSize, height: '40px' }}
                disabled={!isEditable}
                onChange={(e) => {
                  updateKPI(index, 'name', e.target.value);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<label style={{ color: '#3A3541', opacity: 0.8 }}>{headerNames[1]}</label>}
              name={`kpi_unit_${index}`}
              rules={rules}
            >
              <Input
                style={{ fontSize: inputFontSize, height: '40px' }}
                disabled={!isEditable}
                onChange={(e) => {
                  updateKPI(index, 'unit', e.target.value);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Col>
      <Col span={12}>
        <Row gutter={15}>
          <Col span={11}>
            <Form.Item
              label={<label style={{ color: '#3A3541', opacity: 0.8 }}>{headerNames[2]}</label>}
              name={`kpi_ach_${index}`}
            >
              <Input style={{ fontSize: inputFontSize, height: '40px' }} disabled={true} />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label={<label style={{ color: '#3A3541', opacity: 0.8 }}>{headerNames[3]}</label>}
              name={`kpi_exp_${index}`}
              rules={rules}
            >
              <Input
                type="number"
                style={{ fontSize: inputFontSize, height: '40px' }}
                disabled={!isEditable}
                onChange={(e) => {
                  updateKPI(index, 'expected', e.target.value);
                }}
              />
            </Form.Item>
          </Col>
          {isEditable ? (
            <Col span={2}>
              <Card
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '0px',
                  width: '30px',
                  height: '30px',
                  marginTop: '36px',
                  borderWidth: '1px',
                  borderRadius: '4px',
                  borderColor: '#d9d9d9',
                }}
              >
                <DeleteOutlined
                  style={{ cursor: 'pointer', color: '#3A3541', opacity: 0.8 }}
                  onClick={() => {
                    removeKPI(index);
                  }}
                />
              </Card>
            </Col>
          ) : null}
        </Row>
      </Col>
    </Row>
  );
};