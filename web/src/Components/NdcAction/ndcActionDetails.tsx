import { Button, Col, Form, Input, Row, Select, Upload, UploadProps } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NdcActionTypes, ndcActionTypeList } from '../../Definitions/ndcActionTypes.enum';
import { MitigationTypes, mitigationTypeList } from '../../Definitions/mitigationTypes.enum';
import {
  EnergyGenerationUnits,
  energyGenerationUnitList,
} from '../../Definitions/energyGenerationUnits.enum';
import { ConsumerGroups, consumerGroupList } from '../../Definitions/consumerGroups.enum';
import { LandAreaUnits, landAreaUnitList } from '../../Definitions/landAreaUnits.enum';
import { UploadOutlined } from '@ant-design/icons';

const NdcActionDetails = () => {
  const { t } = useTranslation(['ndcAction']);
  const [ndcActionType, setNdcActionType] = useState();
  const [mitigationType, setmitigationType] = useState();

  const implementingAgencyList = [
    'Ministry of Agriculture, Water and Forestry (MAWF)',
    'Ministry of Defence (MoD)',
    'Ministry of Education, Arts and Culture (MoE)',
    'Ministry of Environment, Forestry and Tourism (MEFT)',
    'Ministry of Finance (MoF)',
    'Ministry of Fisheries and Marine Resources (MFMR)',
    'Ministry of Health and Social Services (MHSS)',
    'Ministry of Higher Education, Training and Innovation (MHETI)',
    'Ministry of Home Affairs, Immigration, Safety and Security (MHAISS)',
    'Ministry of Industrialisation and Trade (MIT)',
    'Ministry of International Relations and Cooperation (MIRCo)',
    'Ministry of Information and Communication Technology (MICT)',
    'Ministry of Justice (MoJ)',
    'Ministry of Labour, Industrial Relations and Employment Creation (MOL)',
    'Ministry of Mines and Energy (MME)',
    'Ministry of Public Enterprises (MPE)',
    'Ministry of Sport, Youth and National Service (MSYNS)',
    'Ministry of Works and Transport (MoW)',
    'Ministry of Urban and Rural Development (MURD)',
  ];

  const nationalPlanObjectives = [
    ' Enhance value addition in key growth opportunities',
    'Strengthen the private sector to create jobs',
    'Consolidate and increase the stock and quality of productive infrastructure',
    'Enhance the productivity and social wellbeing of the population',
    'Strengthen the role of the state in guiding and facilitating development',
  ];

  const nationalPlanCoverageList = [
    'Agro-Industrialization',
    'Mineral-based Industrialization',
    'Petroleum Development',
    'Tourism Development',
    'Water, Climate Change and ENR Management',
    'Private Sector Development',
    'Manufacturing',
    'Digital Transformation ',
    'Integrated Transport Infrastructure and Services',
    'Sustainable Energy Development',
    'Sustainable Urban and Housing Development',
    'Human Capital Development',
    'Community Mobilization and Mindset Change',
    'Innovation, Technology Development and Transfer',
    'Regional Development',
    'Governance and Security',
    'Public Sector Transformation',
    'Development Plan Implementation',
    'Climate Hazard ',
  ];

  const props: UploadProps = {
    //need to add
  };

  const handleNdcActionChange = (selectedNdcType: any) => {
    setNdcActionType(selectedNdcType);
    console.log('selected ndc type', selectedNdcType);
  };

  const handleMitigationTypeChange = (selectedMitigationType: any) => {
    setmitigationType(selectedMitigationType);
    console.log('selected mitigation type', selectedMitigationType);
  };

  return (
    <div>
      <Form name="basic" layout="vertical" requiredMark={true}>
        <Row justify="start" align="middle">
          <Col>
            <Form.Item
              label={t('ndcAction:ndcAction')}
              name="ndcActionType"
              rules={[{ required: true, message: `${t('ndcAction:ndcActionrequiredMsg')}` }]}
            >
              <Select
                size="large"
                onChange={handleNdcActionChange}
                style={{
                  width: '249px',
                  borderRadius: '4px',
                }}
                options={ndcActionTypeList}
              />
            </Form.Item>
          </Col>
          <Col style={{ marginLeft: '38px' }}>
            <Form.Item label={t('ndcAction:methodology')} name="methodology">
              <span
                style={{
                  display: 'inline-block',
                  border: '1px solid #D9D9D9',
                  width: '154px',
                  height: '38px',
                  borderRadius: '4px',
                  padding: '7px 8px',
                  fontSize: '14px',
                  backgroundColor: '#F0F0F0',
                  color: '#8C8C8C',
                }}
              >
                {' '}
                {t('ndcAction:goldStandard')}
              </span>
            </Form.Item>
          </Col>
        </Row>

        {ndcActionType === NdcActionTypes.CrossCutting && (
          <label style={{ color: '#3A3541', fontSize: '14px', lineHeight: '22px' }}>
            {t('ndcAction:mitigation')}
          </label>
        )}

        {(ndcActionType === NdcActionTypes.Mitigation ||
          ndcActionType === NdcActionTypes.CrossCutting) && (
          <Row justify="start" align="middle">
            <Form.Item
              label={t('ndcAction:mitigationType')}
              name="mitigationType"
              rules={[{ required: true, message: `${t('ndcAction:mitigationTypeRequiredMsg')}` }]}
            >
              <Select
                size="large"
                onChange={handleMitigationTypeChange}
                style={{
                  width: '249px',
                  borderRadius: '4px',
                }}
                options={mitigationTypeList}
              ></Select>
            </Form.Item>
          </Row>
        )}

        {(ndcActionType === NdcActionTypes.Mitigation ||
          ndcActionType === NdcActionTypes.CrossCutting) &&
          mitigationType === MitigationTypes.Solar && (
            <>
              <Row justify="start" align="middle">
                <Col>
                  <Form.Item
                    label={t('ndcAction:energyGeneration')}
                    rules={[
                      { required: true, message: `${t('ndcAction:energyGenerationRequiredMsg')}` },
                    ]}
                  >
                    <Input style={{ width: 442 }} />
                  </Form.Item>
                </Col>
                <Col style={{ marginLeft: '38px' }}>
                  <Form.Item
                    label={t('ndcAction:energyGenerationUnit')}
                    rules={[
                      {
                        required: true,
                        message: `${t('ndcAction:energyGenerationUnitRequiredMsg')}`,
                      },
                    ]}
                  >
                    <Select style={{ width: 442 }} options={energyGenerationUnitList} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label={t('ndcAction:consumerGroup')}
                rules={[{ required: true, message: `${t('ndcAction:consumerGroupRequiredMsg')}` }]}
              >
                <Select style={{ width: 442 }} options={consumerGroupList} />
              </Form.Item>
            </>
          )}

        {(ndcActionType === NdcActionTypes.Mitigation ||
          ndcActionType === NdcActionTypes.CrossCutting) &&
          mitigationType === MitigationTypes.Agriculture && (
            <Row justify="start" align="middle">
              <Col>
                <Form.Item label={t('ndcAction:eligibleLandArea')}>
                  <Input style={{ width: 442 }} />
                </Form.Item>
              </Col>
              <Col style={{ marginLeft: '38px' }}>
                <Form.Item label={t('ndcAction:landAreaUnit')}>
                  <Select style={{ width: 442 }} options={landAreaUnitList} />
                </Form.Item>
              </Col>
            </Row>
          )}

        {ndcActionType === NdcActionTypes.CrossCutting && (
          <label style={{ color: '#3A3541', fontSize: '14px', lineHeight: '22px' }}>
            {t('ndcAction:adaptation')}
          </label>
        )}

        {(ndcActionType === NdcActionTypes.Adaptation ||
          ndcActionType === NdcActionTypes.CrossCutting) && (
          <>
            <Row justify="start" align="middle">
              <Form.Item label={t('ndcAction:implementingAgency')}>
                <Select
                  style={{ width: 442 }}
                  options={implementingAgencyList.map((item) => ({ value: item, label: item }))}
                />
              </Form.Item>
            </Row>
            <Row justify="start" align="middle">
              <Col>
                <Form.Item label={t('ndcAction:nationalPlanObjectives')}>
                  <Select
                    style={{ width: 442 }}
                    options={nationalPlanObjectives.map((item) => ({ value: item, label: item }))}
                  />
                </Form.Item>
              </Col>
              <Col style={{ marginLeft: '38px' }}>
                <Form.Item label={t('ndcAction:nationalPlanCoverage')}>
                  <Select
                    style={{ width: 442 }}
                    options={nationalPlanCoverageList.map((item) => ({ value: item, label: item }))}
                  />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}

        {ndcActionType === NdcActionTypes.Enablement && (
          <>
            <Form.Item label={t('ndcAction:title')}>
              <Input style={{ width: 442 }} />
            </Form.Item>
            <Form.Item label={t('ndcAction:report')}>
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </>
        )}

        {(ndcActionType === NdcActionTypes.Mitigation ||
          ndcActionType === NdcActionTypes.CrossCutting) && (
          <Row justify="start" align="middle">
            <Col span={12}>
              <Form.Item
                label={t('ndcAction:userEstimatedCredits')}
                style={{ display: 'inline-block', width: 'calc(100% - 15px)', marginRight: '15px' }}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={t('ndcAction:methodologyEstimatedCredits')}
                style={{ display: 'inline-block', width: '100%' }}
              >
                <Input disabled value={0} />
              </Form.Item>
            </Col>
          </Row>
        )}
      </Form>
    </div>
  );
};

export default NdcActionDetails;
